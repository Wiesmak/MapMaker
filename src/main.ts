/**
 * @file main.ts
 * @description This is the main entry point of the application. It registers all the components and sets up the initial HTML structure of the application.
 * @module main
 */

import registerComponents from "@/components/_register.ts"

// Register all the components
registerComponents()

// Set up the initial HTML structure of the application
// language=HTML
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <mm-auto-repository-provider></mm-auto-repository-provider>
    <mm-keyboard-repository-provider></mm-keyboard-repository-provider>
    <mm-mouse-repository-provider></mm-mouse-repository-provider>
    <mm-history-repository-provider></mm-history-repository-provider>
    <mm-file-repository-provider></mm-file-repository-provider>
    <mm-select-grid sx="40" sy="16"></mm-select-grid>
    <div class="flex flex-col items-center justify-center gap-2">
        <mm-export-button>Zapisz</mm-export-button>
        <mm-import-button>Wczytaj</mm-import-button>
        <mm-auto-switch class="mt-8">Automat</mm-auto-switch>
    </div>
    <mm-grid sx="32" sy="32"></mm-grid>
`