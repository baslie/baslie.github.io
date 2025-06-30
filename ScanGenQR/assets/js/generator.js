/**
 * ScanGenQR Generator Module
 * Функциональность генерации QR-кодов различных типов
 */

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let currentQRType = 'text';
let currentQRCode = null;
let generationHistory = [];

// Константы для валидации
const MAX_HISTORY_ITEMS = 10;
const QR_SIZE_LIMITS = { min: 128, max: 512 };

// ===== ИНИЦИАЛИЗАЦИЯ ГЕНЕРАТОРА =====

/**
 * Инициализация генератора QR-кодов
 */
async function initializeGenerator() {
    try {
        console.log('Инициализация генератора QR-кодов...');
        
        // Ждём загрузки библиотеки QRCode с повторными попытками
        let attempts = 0;
        const maxAttempts = 10;
        
        const waitForQRCode = () => {
            if (typeof QRCode !== 'undefined') {
                console.log('Библиотека QRCode загружена успешно');
                initializeGeneratorUI();
                return;
            }
            
            attempts++;
            if (attempts < maxAttempts) {
                console.log(`Ожидание загрузки QRCode... попытка ${attempts}/${maxAttempts}`);
                setTimeout(waitForQRCode, 200);
            } else {
                console.error('Библиотека QRCode не загружена после', maxAttempts, 'попыток');
                showToast('Ошибка загрузки библиотеки QR-кодов', 'error');
            }
        };
        
        waitForQRCode();
    } catch (error) {
        console.error('Ошибка инициализации генератора:', error);
        showToast('Ошибка инициализации генератора QR-кодов', 'error');
    }
}

/**
 * Инициализация UI генератора
 */
function initializeGeneratorUI() {
    try {
        
        // Инициализация обработчиков событий
        initializeEventHandlers();
        
        // Загрузка истории из localStorage
        loadGenerationHistory();
        
        // Обновление UI
        updateTabStyles();
        updateSizeDisplay();
        
        console.log('Генератор QR-кодов инициализирован успешно');
    } catch (error) {
        console.error('Ошибка инициализации генератора:', error);
        showToast('Ошибка инициализации генератора QR-кодов', 'error');
    }
}

/**
 * Инициализация обработчиков событий
 */
function initializeEventHandlers() {
    // Обработчики переключения табов
    document.querySelectorAll('.qr-tab').forEach(tab => {
        tab.addEventListener('click', handleTabSwitch);
    });
    
    // Обработчик кнопки генерации
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', handleGenerateQR);
    }
    
    // Обработчики изменения размера
    const sizeSlider = document.getElementById('qr-size');
    if (sizeSlider) {
        sizeSlider.addEventListener('input', updateSizeDisplay);
    }
    
    // Обработчики кнопок действий
    const downloadPngBtn = document.getElementById('download-png');
    const downloadSvgBtn = document.getElementById('download-svg');
    const copyBtn = document.getElementById('copy-qr');
    
    if (downloadPngBtn) downloadPngBtn.addEventListener('click', downloadQRAsPNG);
    if (downloadSvgBtn) downloadSvgBtn.addEventListener('click', downloadQRAsSVG);
    if (copyBtn) copyBtn.addEventListener('click', copyQRToClipboard);
    
    // Обработчик очистки истории
    const clearHistoryBtn = document.getElementById('clear-history');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearGenerationHistory);
    }
    
    // Обработчик получения геолокации
    const getLocationBtn = document.getElementById('get-location');
    if (getLocationBtn) {
        getLocationBtn.addEventListener('click', getCurrentLocation);
    }
    
    // Обработчики изменения полей ввода для live preview
    initializeLivePreview();
}

/**
 * Инициализация live preview
 */
function initializeLivePreview() {
    const inputs = [
        'text-input', 'url-input', 'wifi-ssid', 'wifi-password', 
        'email-to', 'email-subject', 'email-body', 'phone-input',
        'sms-phone', 'sms-message', 'geo-lat', 'geo-lng'
    ];
    
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', debounce(autoGeneratePreview, 500));
        }
    });
    
    // Обработчики для select и checkbox
    const selects = ['wifi-encryption', 'error-correction'];
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.addEventListener('change', autoGeneratePreview);
        }
    });
    
    const checkboxes = ['wifi-hidden'];
    checkboxes.forEach(checkboxId => {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
            checkbox.addEventListener('change', autoGeneratePreview);
        }
    });
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====

/**
 * Обработка переключения табов
 */
function handleTabSwitch(event) {
    const clickedTab = event.target;
    const newType = clickedTab.dataset.type;
    
    if (newType === currentQRType) return;
    
    // Обновление состояния табов
    document.querySelectorAll('.qr-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
    });
    
    clickedTab.classList.add('active');
    clickedTab.setAttribute('aria-selected', 'true');
    
    // Скрытие всех форм
    document.querySelectorAll('.qr-form').forEach(form => {
        form.classList.add('hidden');
        form.classList.remove('active');
    });
    
    // Показ активной формы
    const activeForm = document.getElementById(`form-${newType}`);
    if (activeForm) {
        activeForm.classList.remove('hidden');
        activeForm.classList.add('active');
    }
    
    currentQRType = newType;
    updateTabStyles();
    
    // Очистка превью при смене типа
    clearQRPreview();
}

/**
 * Обработка генерации QR-кода
 */
async function handleGenerateQR() {
    try {
        showGenerationProgress(true);
        
        const qrData = collectQRData();
        if (!qrData) {
            showToast('Заполните все обязательные поля', 'warning');
            return;
        }
        
        const options = collectQROptions();
        await generateQRCode(qrData, options);
        
        // Добавление в историю
        addToHistory({
            type: currentQRType,
            data: qrData,
            timestamp: new Date().toISOString(),
            options: options
        });
        
        showToast('QR-код успешно сгенерирован!', 'success');
    } catch (error) {
        console.error('Ошибка генерации QR-кода:', error);
        showToast('Ошибка генерации QR-кода', 'error');
    } finally {
        showGenerationProgress(false);
    }
}

/**
 * Автоматическая генерация превью
 */
async function autoGeneratePreview() {
    try {
        const qrData = collectQRData();
        if (!qrData || qrData.trim().length === 0) {
            clearQRPreview();
            return;
        }
        
        const options = collectQROptions();
        options.width = Math.min(options.width, 200); // Уменьшенный размер для превью
        
        await generateQRCode(qrData, options, true); // true для режима превью
    } catch (error) {
        // Игнорируем ошибки превью, чтобы не спамить пользователя
        console.warn('Ошибка генерации превью:', error);
    }
}

// ===== СБОР ДАННЫХ =====

/**
 * Сбор данных для QR-кода в зависимости от типа
 */
function collectQRData() {
    switch (currentQRType) {
        case 'text':
            return collectTextData();
        case 'url':
            return collectURLData();
        case 'wifi':
            return collectWiFiData();
        case 'email':
            return collectEmailData();
        case 'phone':
            return collectPhoneData();
        case 'sms':
            return collectSMSData();
        case 'geo':
            return collectGeoData();
        default:
            return null;
    }
}

/**
 * Сбор текстовых данных
 */
function collectTextData() {
    const input = document.getElementById('text-input');
    return input ? input.value.trim() : '';
}

/**
 * Сбор URL данных
 */
function collectURLData() {
    const input = document.getElementById('url-input');
    const url = input ? input.value.trim() : '';
    
    if (url && !isValidURL(url)) {
        throw new Error('Введите корректный URL');
    }
    
    return url;
}

/**
 * Сбор Wi-Fi данных
 */
function collectWiFiData() {
    const ssid = document.getElementById('wifi-ssid')?.value.trim();
    const password = document.getElementById('wifi-password')?.value;
    const encryption = document.getElementById('wifi-encryption')?.value || 'WPA';
    const hidden = document.getElementById('wifi-hidden')?.checked || false;
    
    if (!ssid) {
        throw new Error('Укажите название Wi-Fi сети');
    }
    
    // Если выбрано "Без пароля", игнорируем пароль
    const finalPassword = encryption === 'nopass' ? '' : password;
    const finalEncryption = encryption === 'nopass' ? 'nopass' : encryption;
    
    return `WIFI:T:${finalEncryption};S:${escapeSpecialChars(ssid)};P:${escapeSpecialChars(finalPassword || '')};H:${hidden ? 'true' : 'false'};;`;
}

/**
 * Сбор Email данных
 */
function collectEmailData() {
    const email = document.getElementById('email-to')?.value.trim();
    const subject = document.getElementById('email-subject')?.value.trim();
    const body = document.getElementById('email-body')?.value.trim();
    
    if (!email) {
        throw new Error('Укажите email адрес');
    }
    
    if (!isValidEmail(email)) {
        throw new Error('Введите корректный email адрес');
    }
    
    let mailto = `mailto:${email}`;
    const params = [];
    
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    
    if (params.length > 0) {
        mailto += '?' + params.join('&');
    }
    
    return mailto;
}

/**
 * Сбор телефонных данных
 */
function collectPhoneData() {
    const phone = document.getElementById('phone-input')?.value.trim();
    
    if (!phone) {
        throw new Error('Укажите номер телефона');
    }
    
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    if (!isValidPhone(cleanPhone)) {
        throw new Error('Введите корректный номер телефона');
    }
    
    return `tel:${cleanPhone}`;
}

/**
 * Сбор SMS данных
 */
function collectSMSData() {
    const phone = document.getElementById('sms-phone')?.value.trim();
    const message = document.getElementById('sms-message')?.value.trim();
    
    if (!phone) {
        throw new Error('Укажите номер телефона для SMS');
    }
    
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    if (!isValidPhone(cleanPhone)) {
        throw new Error('Введите корректный номер телефона');
    }
    
    let sms = `sms:${cleanPhone}`;
    if (message) {
        sms += `?body=${encodeURIComponent(message)}`;
    }
    
    return sms;
}

/**
 * Сбор геолокационных данных
 */
function collectGeoData() {
    const lat = document.getElementById('geo-lat')?.value.trim();
    const lng = document.getElementById('geo-lng')?.value.trim();
    
    if (!lat || !lng) {
        throw new Error('Укажите координаты (широту и долготу)');
    }
    
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    
    if (isNaN(latitude) || isNaN(longitude)) {
        throw new Error('Координаты должны быть числами');
    }
    
    if (latitude < -90 || latitude > 90) {
        throw new Error('Широта должна быть от -90 до 90');
    }
    
    if (longitude < -180 || longitude > 180) {
        throw new Error('Долгота должна быть от -180 до 180');
    }
    
    return `geo:${latitude},${longitude}`;
}

/**
 * Сбор настроек QR-кода
 */
function collectQROptions() {
    const size = parseInt(document.getElementById('qr-size')?.value) || 256;
    const errorCorrectionLevel = document.getElementById('error-correction')?.value || 'M';
    const colorDark = document.getElementById('color-dark')?.value || '#000000';
    const colorLight = document.getElementById('color-light')?.value || '#FFFFFF';
    
    return {
        width: size,
        height: size,
        errorCorrectionLevel: errorCorrectionLevel,
        color: {
            dark: colorDark,
            light: colorLight
        },
        margin: 1
    };
}

// ===== ГЕНЕРАЦИЯ QR-КОДА =====

/**
 * Генерация QR-кода
 */
async function generateQRCode(data, options, isPreview = false) {
    try {
        const canvas = document.createElement('canvas');
        await QRCode.toCanvas(canvas, data, options);
        
        // Сохранение текущего QR-кода
        if (!isPreview) {
            currentQRCode = {
                canvas: canvas,
                data: data,
                options: options
            };
        }
        
        // Обновление превью
        updateQRPreview(canvas, isPreview);
        
        // Обновление информации о QR-коде
        if (!isPreview) {
            updateQRInfo(data, options);
            showQRActions(true);
        }
        
        return canvas;
    } catch (error) {
        console.error('Ошибка генерации QR-кода:', error);
        throw new Error('Не удалось сгенерировать QR-код: ' + error.message);
    }
}

/**
 * Обновление превью QR-кода
 */
function updateQRPreview(canvas, isPreview = false) {
    const previewContainer = document.getElementById('qr-preview');
    if (!previewContainer) return;
    
    // Очистка контейнера
    previewContainer.innerHTML = '';
    
    // Добавление canvas
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';
    canvas.style.borderRadius = '8px';
    
    if (isPreview) {
        canvas.style.opacity = '0.8';
        canvas.title = 'Предварительный просмотр';
    }
    
    previewContainer.appendChild(canvas);
}

/**
 * Очистка превью QR-кода
 */
function clearQRPreview() {
    const previewContainer = document.getElementById('qr-preview');
    if (!previewContainer) return;
    
    previewContainer.innerHTML = `
        <div class="text-center text-gray-500 dark:text-gray-400">
            <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 16h4.01M12 8h.01M12 16h.01m-7 0h.01M8 12h.01M8 8h.01M8 16h.01"></path>
            </svg>
            <p>QR-код появится здесь</p>
            <p class="text-sm mt-1">Заполните форму и нажмите "Сгенерировать"</p>
        </div>
    `;
    
    showQRActions(false);
    hideQRInfo();
}

/**
 * Обновление информации о QR-коде
 */
function updateQRInfo(data, options) {
    const typeNames = {
        text: 'Текст',
        url: 'URL',
        wifi: 'Wi-Fi',
        email: 'Email',
        phone: 'Телефон',
        sms: 'SMS',
        geo: 'Геолокация'
    };
    
    const correctionNames = {
        L: 'Низкий (~7%)',
        M: 'Средний (~15%)',
        Q: 'Высокий (~25%)',
        H: 'Максимальный (~30%)'
    };
    
    // Обновление элементов информации
    const infoType = document.getElementById('info-type');
    const infoSize = document.getElementById('info-size');
    const infoCorrection = document.getElementById('info-correction');
    const infoLength = document.getElementById('info-length');
    
    if (infoType) infoType.textContent = typeNames[currentQRType] || currentQRType;
    if (infoSize) infoSize.textContent = `${options.width}x${options.height}px`;
    if (infoCorrection) infoCorrection.textContent = correctionNames[options.errorCorrectionLevel] || options.errorCorrectionLevel;
    if (infoLength) infoLength.textContent = data.length.toString();
    
    // Показ блока информации
    const qrInfo = document.getElementById('qr-info');
    if (qrInfo) {
        qrInfo.classList.remove('hidden');
        qrInfo.classList.add('animate-fade-in');
    }
}

/**
 * Скрытие информации о QR-коде
 */
function hideQRInfo() {
    const qrInfo = document.getElementById('qr-info');
    if (qrInfo) {
        qrInfo.classList.add('hidden');
    }
}

/**
 * Показ/скрытие кнопок действий
 */
function showQRActions(show) {
    const qrActions = document.getElementById('qr-actions');
    if (qrActions) {
        if (show) {
            qrActions.classList.remove('hidden');
            qrActions.classList.add('animate-fade-in');
        } else {
            qrActions.classList.add('hidden');
        }
    }
}

// ===== ЭКСПОРТ QR-КОДА =====

/**
 * Скачивание QR-кода в формате PNG
 */
async function downloadQRAsPNG() {
    if (!currentQRCode) {
        showToast('Сначала сгенерируйте QR-код', 'warning');
        return;
    }
    
    try {
        const link = document.createElement('a');
        link.download = generateFileName('png');
        link.href = currentQRCode.canvas.toDataURL('image/png');
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('QR-код скачан в формате PNG', 'success');
    } catch (error) {
        console.error('Ошибка скачивания PNG:', error);
        showToast('Ошибка скачивания PNG файла', 'error');
    }
}

/**
 * Скачивание QR-кода в формате SVG
 */
async function downloadQRAsSVG() {
    if (!currentQRCode) {
        showToast('Сначала сгенерируйте QR-код', 'warning');
        return;
    }
    
    try {
        const svgString = await QRCode.toString(currentQRCode.data, {
            type: 'svg',
            width: currentQRCode.options.width,
            color: currentQRCode.options.color,
            errorCorrectionLevel: currentQRCode.options.errorCorrectionLevel,
            margin: currentQRCode.options.margin
        });
        
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.download = generateFileName('svg');
        link.href = url;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        showToast('QR-код скачан в формате SVG', 'success');
    } catch (error) {
        console.error('Ошибка скачивания SVG:', error);
        showToast('Ошибка скачивания SVG файла', 'error');
    }
}

/**
 * Копирование QR-кода в буфер обмена
 */
async function copyQRToClipboard() {
    if (!currentQRCode) {
        showToast('Сначала сгенерируйте QR-код', 'warning');
        return;
    }
    
    try {
        // Попытка копирования как изображение
        if (navigator.clipboard && ClipboardItem) {
            const canvas = currentQRCode.canvas;
            canvas.toBlob(async (blob) => {
                try {
                    const item = new ClipboardItem({ 'image/png': blob });
                    await navigator.clipboard.write([item]);
                    showToast('QR-код скопирован в буфер обмена', 'success');
                } catch (error) {
                    // Fallback к копированию данных
                    await copyDataToClipboard();
                }
            });
        } else {
            // Fallback к копированию данных
            await copyDataToClipboard();
        }
    } catch (error) {
        console.error('Ошибка копирования:', error);
        showToast('Ошибка копирования в буфер обмена', 'error');
    }
}

/**
 * Копирование данных QR-кода в буфер обмена (fallback)
 */
async function copyDataToClipboard() {
    if (!currentQRCode) return;
    
    const success = await copyToClipboard(currentQRCode.data);
    if (success) {
        showToast('Данные QR-кода скопированы в буфер обмена', 'success');
    } else {
        showToast('Ошибка копирования данных', 'error');
    }
}

// ===== ИСТОРИЯ ГЕНЕРАЦИИ =====

/**
 * Добавление записи в историю
 */
function addToHistory(entry) {
    // Добавление в начало массива
    generationHistory.unshift(entry);
    
    // Ограничение размера истории
    if (generationHistory.length > MAX_HISTORY_ITEMS) {
        generationHistory = generationHistory.slice(0, MAX_HISTORY_ITEMS);
    }
    
    // Сохранение в localStorage
    saveGenerationHistory();
    
    // Обновление UI
    updateHistoryDisplay();
}

/**
 * Загрузка истории из localStorage
 */
function loadGenerationHistory() {
    try {
        generationHistory = loadFromStorage('qr_generation_history', []);
        updateHistoryDisplay();
    } catch (error) {
        console.error('Ошибка загрузки истории:', error);
        generationHistory = [];
    }
}

/**
 * Сохранение истории в localStorage
 */
function saveGenerationHistory() {
    try {
        saveToStorage('qr_generation_history', generationHistory);
    } catch (error) {
        console.error('Ошибка сохранения истории:', error);
    }
}

/**
 * Очистка истории генерации
 */
function clearGenerationHistory() {
    if (generationHistory.length === 0) {
        showToast('История уже пуста', 'info');
        return;
    }
    
    if (confirm('Вы уверены, что хотите очистить историю генерации?')) {
        generationHistory = [];
        saveGenerationHistory();
        updateHistoryDisplay();
        showToast('История генерации очищена', 'success');
    }
}

/**
 * Обновление отображения истории
 */
function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    if (!historyList) return;
    
    if (generationHistory.length === 0) {
        historyList.innerHTML = `
            <div class="text-center text-gray-500 dark:text-gray-400 py-8">
                <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p>История пуста</p>
                <p class="text-sm mt-1">Сгенерированные QR-коды появятся здесь</p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = generationHistory.map((entry, index) => 
        createHistoryItemHTML(entry, index)
    ).join('');
    
    // Добавление обработчиков для кнопок повторной генерации
    historyList.querySelectorAll('.regenerate-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => regenerateFromHistory(index));
    });
}

/**
 * Создание HTML для элемента истории
 */
function createHistoryItemHTML(entry, index) {
    const typeNames = {
        text: 'Текст',
        url: 'URL',
        wifi: 'Wi-Fi',
        email: 'Email',
        phone: 'Телефон',
        sms: 'SMS',
        geo: 'Геолокация'
    };
    
    const date = new Date(entry.timestamp);
    const formattedDate = date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const previewData = entry.data.length > 50 ? 
        entry.data.substring(0, 50) + '...' : 
        entry.data;
    
    return `
        <div class="history-item bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center mb-2">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 mr-2">
                            ${typeNames[entry.type] || entry.type}
                        </span>
                        <span class="text-xs text-gray-500 dark:text-gray-400">
                            ${formattedDate}
                        </span>
                    </div>
                    <p class="text-sm text-gray-700 dark:text-gray-300 truncate" title="${escapeHtml(entry.data)}">
                        ${escapeHtml(previewData)}
                    </p>
                </div>
                <button class="regenerate-btn ml-3 p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none" 
                        title="Повторить генерацию">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

/**
 * Повторная генерация из истории
 */
async function regenerateFromHistory(index) {
    if (index < 0 || index >= generationHistory.length) return;
    
    const entry = generationHistory[index];
    
    try {
        // Восстановление данных формы
        await restoreFormData(entry);
        
        // Генерация QR-кода
        await generateQRCode(entry.data, entry.options);
        
        // Обновление информации
        updateQRInfo(entry.data, entry.options);
        showQRActions(true);
        
        showToast('QR-код восстановлен из истории', 'success');
    } catch (error) {
        console.error('Ошибка восстановления из истории:', error);
        showToast('Ошибка восстановления QR-кода', 'error');
    }
}

/**
 * Восстановление данных формы из истории
 */
async function restoreFormData(entry) {
    // Переключение на соответствующий тип
    if (entry.type !== currentQRType) {
        const tab = document.querySelector(`[data-type="${entry.type}"]`);
        if (tab) {
            tab.click();
        }
    }
    
    // Восстановление настроек QR-кода
    const sizeSlider = document.getElementById('qr-size');
    const errorCorrection = document.getElementById('error-correction');
    const colorDark = document.getElementById('color-dark');
    const colorLight = document.getElementById('color-light');
    
    if (sizeSlider && entry.options.width) {
        sizeSlider.value = entry.options.width;
        updateSizeDisplay();
    }
    if (errorCorrection && entry.options.errorCorrectionLevel) {
        errorCorrection.value = entry.options.errorCorrectionLevel;
    }
    if (colorDark && entry.options.color?.dark) {
        colorDark.value = entry.options.color.dark;
    }
    if (colorLight && entry.options.color?.light) {
        colorLight.value = entry.options.color.light;
    }
    
    // Восстановление данных в зависимости от типа
    await restoreTypeSpecificData(entry.type, entry.data);
}

/**
 * Восстановление данных для конкретного типа QR-кода
 */
async function restoreTypeSpecificData(type, data) {
    switch (type) {
        case 'text':
            const textInput = document.getElementById('text-input');
            if (textInput) textInput.value = data;
            break;
            
        case 'url':
            const urlInput = document.getElementById('url-input');
            if (urlInput) urlInput.value = data;
            break;
            
        // Для других типов можно добавить более сложную логику восстановления
        // Пока что просто устанавливаем основное поле
        default:
            console.warn(`Восстановление данных для типа ${type} не реализовано`);
            break;
    }
}

// ===== ГЕОЛОКАЦИЯ =====

/**
 * Получение текущего местоположения
 */
async function getCurrentLocation() {
    if (!navigator.geolocation) {
        showToast('Геолокация не поддерживается вашим браузером', 'error');
        return;
    }
    
    const getLocationBtn = document.getElementById('get-location');
    if (getLocationBtn) {
        getLocationBtn.disabled = true;
        getLocationBtn.innerHTML = '⏳ Получение координат...';
    }
    
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            });
        });
        
        const latitude = position.coords.latitude.toFixed(6);
        const longitude = position.coords.longitude.toFixed(6);
        
        const latInput = document.getElementById('geo-lat');
        const lngInput = document.getElementById('geo-lng');
        
        if (latInput) latInput.value = latitude;
        if (lngInput) lngInput.value = longitude;
        
        showToast('Координаты получены успешно', 'success');
        
        // Автоматическая генерация превью
        setTimeout(autoGeneratePreview, 100);
    } catch (error) {
        console.error('Ошибка получения геолокации:', error);
        
        let errorMessage = 'Ошибка получения местоположения';
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'Доступ к геолокации запрещен';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'Местоположение недоступно';
                break;
            case error.TIMEOUT:
                errorMessage = 'Время ожидания истекло';
                break;
        }
        
        showToast(errorMessage, 'error');
    } finally {
        if (getLocationBtn) {
            getLocationBtn.disabled = false;
            getLocationBtn.innerHTML = '📍 Получить текущее местоположение';
        }
    }
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

/**
 * Обновление отображения размера
 */
function updateSizeDisplay() {
    const sizeSlider = document.getElementById('qr-size');
    const sizeValue = document.getElementById('size-value');
    
    if (sizeSlider && sizeValue) {
        sizeValue.textContent = sizeSlider.value;
    }
}

/**
 * Обновление стилей табов
 */
function updateTabStyles() {
    document.querySelectorAll('.qr-tab').forEach(tab => {
        if (tab.classList.contains('active')) {
            tab.classList.add('bg-green-600', 'text-white');
            tab.classList.remove('bg-gray-100', 'text-gray-700', 'dark:bg-gray-700', 'dark:text-gray-300');
        } else {
            tab.classList.remove('bg-green-600', 'text-white');
            tab.classList.add('bg-gray-100', 'text-gray-700', 'dark:bg-gray-700', 'dark:text-gray-300');
        }
    });
}

/**
 * Показ/скрытие индикатора генерации
 */
function showGenerationProgress(show) {
    const generateBtn = document.getElementById('generate-btn');
    if (!generateBtn) return;
    
    if (show) {
        generateBtn.disabled = true;
        generateBtn.innerHTML = `
            <div class="flex items-center justify-center">
                <div class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Генерация...
            </div>
        `;
    } else {
        generateBtn.disabled = false;
        generateBtn.innerHTML = 'Сгенерировать QR-код';
    }
}

/**
 * Генерация имени файла
 */
function generateFileName(extension) {
    const date = new Date();
    const timestamp = date.toISOString().slice(0, 19).replace(/[:-]/g, '');
    const typePrefix = currentQRType.toUpperCase();
    
    return `QR_${typePrefix}_${timestamp}.${extension}`;
}

/**
 * Экранирование специальных символов для Wi-Fi QR
 */
function escapeSpecialChars(str) {
    return str.replace(/([\\;,":.])/g, '\\$1');
}

/**
 * Debounce функция для ограничения частоты вызовов
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== ЭКСПОРТ ДЛЯ ГЛОБАЛЬНОГО ДОСТУПА =====

// Делаем функцию инициализации доступной глобально
window.initializeGenerator = initializeGenerator;
