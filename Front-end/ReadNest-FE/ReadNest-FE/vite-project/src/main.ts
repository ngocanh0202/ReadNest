import "./style.css";
import "./nav.ts";
import "./toggle.theme.ts"
import "./validation.ts"
import "./readerKeyListener.ts"
import "./editor.ts"
import $ from "jquery";
export function testViteLibrary() {
  console.log("Vite library successfully imported!");
}

declare global {
    interface Window {
        reader: {
            clickElement: (element: HTMLElement | null) => void;
            removeDom: (selector: string) => void;
            CopyToclipboard: (text: string) => void;
            scrollToSelector: (selector: string, behavior: ScrollBehavior) => void;
            focusInput: (selector: string) => void
        };
    }
}

window.reader = {
    clickElement: (element: HTMLElement | null) => {
        if (element) {
            element.click();
        }
    },
    removeDom: (selector: string) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => element.remove());
    },
    CopyToclipboard(text: string) {
        navigator.clipboard?.writeText(text).catch(err => console.error("Clipboard error:", err));
    },
    scrollToSelector: (selector: string, behavior: ScrollBehavior = "smooth") => {
        setTimeout(() => {
            const element = document.querySelector(selector);
            if (element) {
                element.scrollIntoView({ behavior, block: "center" });
            } else {
                window.scrollBy({ top: 0, behavior });
            }
        });
    },
    focusInput: (selector: string) => {
        setTimeout(() => {
            const element = document.querySelector(selector) as HTMLInputElement;
            if (element) {
                element.focus();
            }
        });
    }
};



export { $ };