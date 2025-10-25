interface DotNetHelper {
    invokeMethodAsync: (methodName: string, ...args: any[]) => Promise<any>;
}

declare global {
    interface Window {
        addReaderKeyListener: (dotnetHelper: DotNetHelper) => void;
        removeReaderKeyListener: () => void;
    }
}

let keydownHandler: ((e: KeyboardEvent) => void) | null = null;
let isHandling = false;

window.addReaderKeyListener = function (dotnetHelper: DotNetHelper) {
    if (keydownHandler) {
        window.removeEventListener("keydown", keydownHandler);
    }

    keydownHandler = async (e: KeyboardEvent) => {
        if (isHandling) return;

        if (e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLTextAreaElement) {
            return;
        }

        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            isHandling = true;

            try {
                if (e.key === "ArrowLeft") {
                    await dotnetHelper.invokeMethodAsync("OnArrowLeft");
                } else if (e.key === "ArrowRight") {
                    await dotnetHelper.invokeMethodAsync("OnArrowRight");
                }
            } catch (error) {
                console.error("Error handling arrow key:", error);
            } finally {
                setTimeout(() => {
                    isHandling = false;
                }, 300);
            }
        }
    };

    window.addEventListener("keydown", keydownHandler);
};

window.removeReaderKeyListener = function () {
    if (keydownHandler) {
        window.removeEventListener("keydown", keydownHandler);
        keydownHandler = null;
    }
    isHandling = false;
};