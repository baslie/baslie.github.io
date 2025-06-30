/**
 * ScanGenQR Scanner Module
 * Логика для сканирования QR-кодов с использованием камеры и изображений
 */

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let scanner;
let scanHistory = [];

// Константы
const MAX_SCAN_HISTORY_ITEMS = 10;

// ===== ИНИЦИАЛИЗАЦИЯ СКАНЕРА =====

/**
 * Инициализация сканера QR-кодов
 */
async function initializeScanner() {
    try {
        console.log('Инициализация сканера QR-кодов...');

        // Проверка доступности библиотеки QrScanner
        if (typeof QrScanner === 'undefined') {
            throw new Error('Библиотека QrScanner не загружена');
        }

        // Инициализация камеры
        initializeCameraScanner();

        // Инициализация обработчиков событий
        initializeEventHandlers();

        // Загрузка истории из localStorage
        loadScanHistory();

        console.log('Сканер QR-кодов инициализирован успешно');
    } catch (error) {
        console.error('Ошибка инициализации сканера:', error);
        showToast('Ошибка инициализации сканера QR-кодов', 'error');
    }
}

/**
 * Инициализация камеры
 */
function initializeCameraScanner() {
    const videoElem = document.getElementById('qr-video');

    scanner = new QrScanner(videoElem, (result) => {
        console.log('QR Code найден:', result);
        handleScanResult(result);
    }, {
        highlightScanRegion: true,
        highlightCodeOutline: true,
    });

    // Заполнение списка камер
    QrScanner.listCameras().then(cameras => {
        const cameraList = document.getElementById('camera-list');
        cameras.forEach(camera => {
            const option = document.createElement('option');
            option.value = camera.id;
            option.textContent = camera.label;
            cameraList.appendChild(option);
        });
    });
}

/**
 * Инициализация обработчиков событий
 */
function initializeEventHandlers() {
    // Кнопки управления сканированием
    const startScanBtn = document.getElementById('start-scan');
    const stopScanBtn = document.getElementById('stop-scan');
    const toggleFlashBtn = document.getElementById('toggle-flash');

    if (startScanBtn) startScanBtn.addEventListener('click', startScanning);
    if (stopScanBtn) stopScanBtn.addEventListener('click', stopScanning);
    if (toggleFlashBtn) toggleFlashBtn.addEventListener('click', toggleFlash);

    // Список камер
    const cameraList = document.getElementById('camera-list');
    if (cameraList) {
        cameraList.addEventListener('change', () => {
            const selectedId = cameraList.value;
            scanner.setCamera(selectedId);
        });
    }

    // Загрузка изображений
    const fileSelector = document.getElementById('file-selector');
    if (fileSelector) {
        fileSelector.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) scanImageFile(file);
        });
    }

    // Перетаскивание файлов
    const dropZone = document.getElementById('file-drop-zone');
    if (dropZone) {
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file) scanImageFile(file);
        });

        // Открытие диалога выбора файлов при клике
        dropZone.addEventListener('click', () => {
            fileSelector.click();
        });
    }

    // Очистка истории
    const clearHistoryBtn = document.getElementById('clear-scan-history');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearScanHistory);
    }
}

// ===== УПРАВЛЕНИЕ СКАНИРОВАНИЕМ =====

/**
 * Начать сканирование с камеры
 */
function startScanning() {
    scanner.start().then(() => {
        showToast('Сканирование началось', 'success');
    }).catch(error => {
        console.error('Ошибка запуска сканирования:', error);
        showToast('Ошибка запуска сканирования', 'error');
    });
}

/**
 * Остановить сканирование
 */
function stopScanning() {
    scanner.stop();
    showToast('Сканирование остановлено', 'info');
}

/**
 * Переключение вспышки
 */
function toggleFlash() {
    if (!scanner) return;

    scanner.hasFlash().then(hasFlash => {
        if (!hasFlash) {
            showToast('Вспышка не поддерживается на этом устройстве', 'warning');
            return;
        }

        if (scanner.isFlashOn()) {
            scanner.turnFlashOff();
            showToast('Вспышка выключена', 'info');
            document.getElementById('toggle-flash').innerText = 'Включить вспышку';
        } else {
            scanner.turnFlashOn();
            showToast('Вспышка включена', 'info');
            document.getElementById('toggle-flash').innerText = 'Выключить вспышку';
        }
    }).catch(error => {
        console.error('Ошибка управления вспышкой:', error);
        showToast('Ошибка управления вспышкой', 'error');
    });
}

// ===== ОБРАБОТКА ИЗОБРАЖЕНИЙ =====

/**
 * Сканирование изображения из файла
 */
function scanImageFile(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
        const imageData = e.target.result;
        QrScanner.scanImage(imageData, { returnDetailedScanResult: true })
            .then(result => {
                console.log('QR Code найден на изображении:', result);
                handleScanResult(result);
            })
            .catch(error => {
                console.error('Ошибка сканирования изображения:', error);
                showToast('QR-код не найден на изображении', 'warning');
            });
    };

    reader.readAsDataURL(file);
}

// ===== ОБРАБОТКА РЕЗУЛЬТАТОВ СКАНИРОВАНИЯ =====

/**
 * Обработка результата сканирования
 */
function handleScanResult(result) {
    if (!result || !result.data) {
        showToast('QR-код не распознан', 'warning');
        return;
    }

    const resultsContainer = document.getElementById('scan-results');
    if (!resultsContainer) return;

    // Отображение результата
    resultsContainer.innerHTML = `
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Обнаружен QR-код</h3>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">${escapeHtml(result.data)}</p>
            <div class="mt-4 flex space-x-2">
                <button class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition-colors focus:outline-none" onclick="handleScanAction('${escapeHtml(result.data, true)}')">Перейти</button>
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors focus:outline-none" onclick="copyToClipboard('${escapeHtml(result.data, true)}')">Копировать</button>
            </div>
        </div>
    `;

    // Добавление в историю
    addToScanHistory({
        data: result.data,
        timestamp: new Date().toISOString()
    });
}

/**
 * Обработка действия с результатом сканирования
 */
function handleScanAction(data) {
    if (isValidURL(data)) {
        window.open(data, '_blank');
    } else {
        showToast('Данный QR-код не содержит URL', 'info');
    }
}

// ===== ИСТОРИЯ СКАНИРОВАНИЯ =====

/**
 * Добавление записи в историю
 */
function addToScanHistory(entry) {
    // Добавление в начало массива
    scanHistory.unshift(entry);

    // Ограничение размера истории
    if (scanHistory.length > MAX_SCAN_HISTORY_ITEMS) {
        scanHistory = scanHistory.slice(0, MAX_SCAN_HISTORY_ITEMS);
    }

    // Сохранение в localStorage
    saveScanHistory();

    // Обновление UI
    updateScanHistoryDisplay();
}

/**
 * Загрузка истории из localStorage
 */
function loadScanHistory() {
    try {
        scanHistory = loadFromStorage('qr_scan_history', []);
        updateScanHistoryDisplay();
    } catch (error) {
        console.error('Ошибка загрузки истории сканирования:', error);
        scanHistory = [];
    }
}

/**
 * Сохранение истории в localStorage
 */
function saveScanHistory() {
    try {
        saveToStorage('qr_scan_history', scanHistory);
    } catch (error) {
        console.error('Ошибка сохранения истории сканирования:', error);
    }
}

/**
 * Очистка истории сканирования
 */
function clearScanHistory() {
    if (scanHistory.length === 0) {
        showToast('История уже пуста', 'info');
        return;
    }

    if (confirm('Вы уверены, что хотите очистить историю сканирования?')) {
        scanHistory = [];
        saveScanHistory();
        updateScanHistoryDisplay();
        showToast('История сканирования очищена', 'success');
    }
}

/**
 * Обновление отображения истории
 */
function updateScanHistoryDisplay() {
    const historyList = document.getElementById('scan-history-list');
    if (!historyList) return;

    if (scanHistory.length === 0) {
        historyList.innerHTML = `
            <div class="text-center text-gray-500 dark:text-gray-400 py-8">
                <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p>История пуста</p>
                <p class="text-sm mt-1">Результаты сканирования появятся здесь</p>
            </div>
        `;
        return;
    }

    historyList.innerHTML = scanHistory.map(entry => createHistoryItemHTML(entry)).join('');
}

/**
 * Создание HTML для элемента истории
 */
function createHistoryItemHTML(entry) {
    const date = new Date(entry.timestamp);
    const formattedDate = date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return `
        <div class="history-item bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-700 dark:text-gray-300 truncate" title="${escapeHtml(entry.data)}">
                        ${escapeHtml(entry.data)}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        ${formattedDate}
                    </p>
                </div>
                <button class="ml-3 p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none" title="Повторить сканирование" onclick="handleScanAction('${escapeHtml(entry.data, true)}')">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

// ===== УТИЛИТЫ =====

/**
 * Экранирование HTML
 */
function escapeHtml(text, asAttribute = false) {
    const div = document.createElement('div');
    div.textContent = text;
    const escaped = div.innerHTML;
    return asAttribute ? escaped.replace(/"/g, '&quot;') : escaped;
}

// ===== ЭКСПОРТ ДЛЯ ГЛОБАЛЬНОГО ДОСТУПА =====

// Делаем функцию инициализации доступной глобально
window.initializeScanner = initializeScanner;
