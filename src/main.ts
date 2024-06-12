import registerComponents from "@/components/_register.ts"

registerComponents()
// language=HTML
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <mm-grid>
  </mm-grid>
`