import {Provider} from "#lib/provider/_provider"
import {FileRepository, FileRepositoryInterface} from "@/repositories/_repositories"

export class FileRepositoryProvider extends Provider<FileRepositoryInterface> {
  constructor() {
    super(new FileRepository())
  }
}