export default interface Selectable {
  selected: boolean
  select(): void
  deselect(): void
  toggle(): void
}