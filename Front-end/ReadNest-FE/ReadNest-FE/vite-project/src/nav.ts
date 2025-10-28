interface DotNetObjectReference {
    invokeMethodAsync(methodName: string, ...args: any[]): Promise<any>;
}

interface NavScrollState {
    lastScrollY: number;
    ticking: boolean;
    componentRef: DotNetObjectReference | null;
    navScrollHandler: (() => void) | null;
    navMouseHandler: ((e: MouseEvent) => void) | null;
}

declare global {
    interface Window {
        initNavScroll: (dotNetRef: DotNetObjectReference) => void;
        cleanupNavScroll: () => void;
    }
}

const state: NavScrollState = {
    lastScrollY: 0,
    ticking: false,
    componentRef: null,
    navScrollHandler: null,
    navMouseHandler: null
};

window.initNavScroll = (dotNetRef: DotNetObjectReference): void => {
    state.componentRef = dotNetRef;

    const handleScroll = (): void => {
        const currentY = window.scrollY;
        const isScrollingUp = currentY < state.lastScrollY;
        const isNearTop = currentY < 50;

        if (state.componentRef) {
            state.componentRef.invokeMethodAsync('OnScroll', currentY, isScrollingUp, isNearTop);
        }

        state.lastScrollY = currentY;
        state.ticking = false;
    };

    state.navScrollHandler = (): void => {
        if (!state.ticking) {
            window.requestAnimationFrame(handleScroll);
            state.ticking = true;
        }
    };

    state.navMouseHandler = (e: MouseEvent): void => {
        state.componentRef?.invokeMethodAsync('OnMouseMove', e.clientY);
    };

    window.addEventListener('scroll', state.navScrollHandler, { passive: true });
    window.addEventListener('mousemove', state.navMouseHandler, { passive: true });
    state.lastScrollY = window.scrollY;
};

window.cleanupNavScroll = (): void => {
    if (state.navScrollHandler) {
        window.removeEventListener('scroll', state.navScrollHandler);
    }
    if (state.navMouseHandler) {
        window.removeEventListener('mousemove', state.navMouseHandler);
    }
    state.componentRef = null;
    state.lastScrollY = 0;
    state.ticking = false;
};
