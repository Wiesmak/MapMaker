import registerComponents from "@/components/_export.ts"

registerComponents()

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <mm-block></mm-block>
`