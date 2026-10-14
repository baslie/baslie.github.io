// Drag-to-scroll для превью-скриншота в «окне браузера»:
// тянем мышью вверх-вниз прямо по картинке (колёсико и скроллбар тоже работают).
export function initDragScroll() {
    const containers = document.querySelectorAll<HTMLElement>('[data-drag-scroll]');
    containers.forEach((el) => {
        // курсор-«ручка» только когда есть что прокручивать
        const refreshScrollable = () => {
            el.classList.toggle('is-scrollable', el.scrollHeight > el.clientHeight + 1);
        };
        refreshScrollable();

        if (el.dataset.dragScrollReady === '1') return;
        el.dataset.dragScrollReady = '1';

        let isDown = false;
        let startY = 0;
        let startScroll = 0;
        let moved = false;

        const onPointerDown = (e: PointerEvent) => {
            if (e.button !== 0) return; // только ЛКМ
            if (el.scrollHeight <= el.clientHeight + 1) return; // нечего прокручивать
            isDown = true;
            moved = false;
            startY = e.clientY;
            startScroll = el.scrollTop;
            el.classList.add('is-grabbing');
            el.setPointerCapture(e.pointerId);
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!isDown) return;
            const delta = e.clientY - startY;
            if (Math.abs(delta) > 2) moved = true;
            el.scrollTop = startScroll - delta;
            e.preventDefault();
        };

        const endDrag = (e: PointerEvent) => {
            if (!isDown) return;
            isDown = false;
            el.classList.remove('is-grabbing');
            try {
                el.releasePointerCapture(e.pointerId);
            } catch {}
        };

        el.addEventListener('pointerdown', onPointerDown);
        el.addEventListener('pointermove', onPointerMove);
        el.addEventListener('pointerup', endDrag);
        el.addEventListener('pointercancel', endDrag);
        // не даём «улетать» выделению/перетаскиванию картинки
        el.addEventListener('dragstart', (e) => e.preventDefault());
        // пересчёт прокручиваемости при ресайзе/догрузке картинки
        window.addEventListener('resize', refreshScrollable);
        const img = el.querySelector('img');
        if (img && !img.complete) img.addEventListener('load', refreshScrollable);
    });
}
