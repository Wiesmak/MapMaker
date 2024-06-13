import registerComponents from "@/components/_register.ts"

registerComponents()
// language=HTML
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <mm-auto-repository-provider></mm-auto-repository-provider>
    <mm-keyboard-repository-provider></mm-keyboard-repository-provider>
    <mm-mouse-repository-provider></mm-mouse-repository-provider>
    <mm-history-repository-provider></mm-history-repository-provider>
    <mm-file-repository-provider></mm-file-repository-provider>
    <mm-select-grid sx="40" sy="16"></mm-select-grid>
    <div class="flex flex-col items-center justify-center gap-2">
        <mm-auto-switch>Automat</mm-auto-switch>
        <mm-export-button>Zapisz</mm-export-button>
        <mm-import-button>Wczytaj</mm-import-button>
    </div>
    <mm-grid sx="32" sy="32"></mm-grid>
`