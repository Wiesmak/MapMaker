import {Provider} from "#lib/provider/_provider"
import {FileRepository, FileRepositoryInterface} from "@/repositories/_repositories"

/**
 * The FileRepositoryProvider class is a provider for the FileRepository.
 * It extends the Provider class and specifies the type of repository it manages.
 */
export class FileRepositoryProvider extends Provider<FileRepositoryInterface> {
  /**
   * Constructor for the FileRepositoryProvider class
   */
  constructor() {
    super(new FileRepository())
  }
}