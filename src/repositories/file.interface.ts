export interface FileRepositoryInterface {
  saveToFile(data: object): void
  loadFromFile(file: String): object
  bindLoad(callback: (data: object) => void): void
}