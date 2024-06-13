import {Provider} from "#lib/provider/_provider"
import {AutoRepository, AutoRepositoryInterface} from "@/repositories/_repositories"

/**
 * The AutoRepositoryProvider class is a provider for the AutoRepository.
 * It extends the Provider class and specifies the type of repository it manages.
 */
export class AutoRepositoryProvider extends Provider<AutoRepositoryInterface> {
  /**
   * Constructor for the AutoRepositoryProvider class
   */
  constructor() {
    super(new AutoRepository())
  }
}