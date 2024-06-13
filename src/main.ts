import registerComponents from "@/components/_register.ts"

registerComponents()
// language=HTML
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <mm-auto-repository-provider></mm-auto-repository-provider>
    <mm-keyboard-repository-provider></mm-keyboard-repository-provider>
    <mm-select-grid sx="40" sy="16"></mm-select-grid>
    <mm-auto-switch>Automat</mm-auto-switch>
    <mm-grid sx="32" sy="32"></mm-grid>
`