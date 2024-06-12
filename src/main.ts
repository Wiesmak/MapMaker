import registerComponents from "@/components/_register.ts"

registerComponents()
// language=HTML
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <mm-select-grid sx="20" sy="15"></mm-select-grid>
    <mm-grid sx="32" sy="32"></mm-grid>
`