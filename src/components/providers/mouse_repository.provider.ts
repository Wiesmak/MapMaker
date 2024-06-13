import {Provider} from "#lib/provider/_provider"
import {MouseRepository, MouseRepositoryInterface} from "@/repositories/_repositories"

/**
 * The MouseRepositoryProvider class is a provider for the MouseRepository.
 * It extends the Provider class and specifies the type of repository it manages.
 */
export class MouseRepositoryProvider extends Provider<MouseRepositoryInterface> {
  /**
   * Constructor for the MouseRepositoryProvider class
   */
  constructor() {
    super(new MouseRepository())
  }
}