import Quill from 'quill';

declare global {
    interface Window {
        editor: {
            init: (selector: string, dotNetRef: any) => void;
            getContent: (selector: string) => string;
            setContent: (selector: string, content: string) => void;
            setContentText: (selector: string, content: string) => void;
            replacePlaceholderWithImage: (selector: string, imageUrl: string, imageId: string, dotNetRef: any) => void;
            showUploadError: (selector: string, message: string, dotNetRef: any) => void;
            destroy: (selector: string) => void;
        };
    }
}

interface EditorMap {
    [selector: string]: Quill;
}

const editors: EditorMap = {};
const MAX_FILE_SIZE = 10 * 1024 * 1024; 

window.editor = {
    init: (selector: string, dotNetRef: any) => {
        const element = document.querySelector(selector);
        if (!element) {
            console.error(`❌ Element not found: ${selector}`);
            return;
        }

        const quill = new Quill(element as HTMLElement, {
            theme: 'snow',
            modules: {
                toolbar: {
                    container: [
                        ['bold', 'italic', 'underline'],
                        ['image', 'clean']
                    ],
                    handlers: {
                        image: function (this: any) {
                            const fileInput = document.createElement('input');
                            fileInput.type = 'file';
                            fileInput.accept = 'image/*';
                            fileInput.click();

                            fileInput.onchange = async () => {
                                const file = fileInput.files?.[0];
                                if (!file) return;

                                if (file.size > MAX_FILE_SIZE) {
                                    alert(`⚠️ Image exceeds the 5MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
                                    return;
                                }

                                const range = this.quill.getSelection(true);
                                const placeholderText = "*** Uploading Image ***";
                                this.quill.insertText(range.index, `\n${placeholderText}\n`);

                                const arrayBuffer = await file.arrayBuffer();
                                const uint8Array = new Uint8Array(arrayBuffer);

                                dotNetRef.invokeMethodAsync("OnEditorUploadImage", file.type, uint8Array);
                            };
                        }
                    }
                }
            }
        });

        quill.root.setAttribute('spellcheck', 'false');
        editors[selector] = quill;


        quill.root.addEventListener('paste', async (e: ClipboardEvent) => {
            if (!e.clipboardData) return;
            const items = e.clipboardData.items;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.type.startsWith("image/")) {
                    e.preventDefault();
                    const file = item.getAsFile();
                    if (!file) return;
                    if (file.size > MAX_FILE_SIZE) {
                        alert(`⚠️ Image exceeds the 5MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
                        return;
                    }
                    const range = quill.getSelection(true);
                    const placeholderText = "*** Uploading Image ***";

                    quill.insertText(range.index, `\n${placeholderText}\n`);

                    setTimeout(() => {
                        const editor = quill.root;
                        const images = editor.querySelectorAll('img');
                        images.forEach(img => {
                            img.remove();
                        });
                    }, 100);

                    const arrayBuffer = await file.arrayBuffer();
                    const uint8Array = new Uint8Array(arrayBuffer);
                    dotNetRef.invokeMethodAsync("OnEditorUploadImage", file.type, uint8Array);
                }
            }
        });

        quill.on('text-change', () => {
            const content = quill.root.innerHTML;
            dotNetRef.invokeMethodAsync("OnEditorContentChanged", content);
        });
    },

    getContent: (selector: string): string => {
        const quill = editors[selector];
        return quill ? quill.root.innerHTML : "";
    },

    setContent: (selector: string, content: string): void => {
        const quill = editors[selector];
        if (!quill) return;
        if (!content) {
            quill.root.innerHTML = '';
            return;
        }

        quill.root.innerHTML = content;
    },

    setContentText: (selector: string, content: string): void => {
        const quill = editors[selector];
        if (!quill) return;

        if (!content) {
            quill.root.innerHTML = '';
            return;
        }
        
        let processedContent = content
            .replace(/\\n/g, '\n')
            .replace(/\\r\\n/g, '\n')
            .replace(/\\r/g, '\n');
        
        const lines = processedContent.split('\n');
        const htmlContent = lines
            .map(line => {
                const trimmedLine = line.trim();
                if (!trimmedLine) {
                    return '<p><br></p>';
                }
                return `<p>${trimmedLine}</p>`;
            })
            .join('');
        
        quill.root.innerHTML = htmlContent;
    },

    replacePlaceholderWithImage: (selector: string, imageUrl: string, imageId: string, dotNetRef: any): void => {
        const quill = editors[selector];
        if (!quill) return;
        const delta = quill.getContents();
        const ops = delta.ops || [];
        const newOps: any[] = [];

        for (let op of ops) {
            if (op.insert && typeof op.insert === 'string') {
                const parts = op.insert.split('*** Uploading Image ***');
                for (let i = 0; i < parts.length; i++) {
                    if (parts[i].length > 0) newOps.push({ insert: parts[i] });
                    if (i < parts.length - 1) {
                        newOps.push({
                            insert: { image: imageUrl },
                            attributes: {
                                alt: imageId
                            }
                        });
                    }
                }
            } else {
                newOps.push(op);
            }
        }

        quill.setContents({ ops: newOps } as any, 'silent');
        const content = quill.root.innerHTML;
        dotNetRef.invokeMethodAsync("OnEditorContentChanged", content);
    },

    showUploadError: (selector: string, message: string, dotNetRef: any): void => {
        const quill = editors[selector];
        if (!quill) return;

        const delta = quill.getContents();
        const ops = delta.ops || [];
        const newOps: any[] = [];

        for (let op of ops) {
            if (op.insert && typeof op.insert === 'string') {
                const parts = op.insert.split('*** Uploading Image ***');
                for (let i = 0; i < parts.length; i++) {
                    if (parts[i].length > 0) newOps.push({ insert: parts[i] });
                    if (i < parts.length - 1) {
                        newOps.push({ insert: message });
                    }
                }
            } else {
                newOps.push(op);
            }
        }

        quill.setContents({ ops: newOps } as any, 'silent');
        const content = quill.root.innerHTML;
        dotNetRef.invokeMethodAsync("OnEditorContentChanged", content);
    },

    destroy: (selector: string): void => {
        const quill = editors[selector];
        if (quill) {
            quill.off('text-change');
            delete editors[selector];
        }
    },
};

export { };