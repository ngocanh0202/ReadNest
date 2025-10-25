interface DotNetObjectReference {
    invokeMethodAsync(methodName: string, ...args: any[]): Promise<any>;
}

interface NavScrollState {
    navScrollHandler: (() => void) | null;
    navMouseHandler: ((e: MouseEvent) => void) | null;
    lastScrollY: number;
    ticking: boolean;
    componentRef: DotNetObjectReference | null;
}

declare global {
    interface Window {
        initNavScroll: (dotNetRef: DotNetObjectReference) => void;
        cleanupNavScroll: () => void;
    }
}

const state: NavScrollState = {
    navScrollHandler: null,
    navMouseHandler: null,
    lastScrollY: 0,
    ticking: false,
    componentRef: null
};

window.initNavScroll = (dotNetRef: DotNetObjectReference): void => {
    state.componentRef = dotNetRef;

    state.navScrollHandler = (): void => {
        if (!state.ticking) {
            window.requestAnimationFrame(() => {
                const scrollY: number = window.scrollY;
                const isScrollingUp: boolean = scrollY < state.lastScrollY;
                const isNearTop: boolean = scrollY < 50;

                if (state.componentRef) {
                    state.componentRef.invokeMethodAsync('OnScroll', scrollY, isScrollingUp, isNearTop);
                }

                state.lastScrollY = scrollY;
                state.ticking = false;
            });
            state.ticking = true;
        }
    };

    state.navMouseHandler = (e: MouseEvent): void => {
        if (state.componentRef) {
            state.componentRef.invokeMethodAsync('OnMouseMove', e.clientY);
        }
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
    state.navScrollHandler = null;
    state.navMouseHandler = null;
    state.lastScrollY = 0;
    state.ticking = false;
};