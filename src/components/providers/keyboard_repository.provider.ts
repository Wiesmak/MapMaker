import {Provider} from "#lib/provider/_provider"
import {KeyboardRepository, KeyboardRepositoryInterface} from "@/repositories/_repositories"

/**
 * The KeyboardRepositoryProvider class is a provider for the KeyboardRepository.
 * It extends the Provider class and specifies the type of repository it manages.
 */
export class KeyboardRepositoryProvider extends Provider<KeyboardRepositoryInterface> {
  /**
   * Constructor for the KeyboardRepositoryProvider class
   */
  constructor() {
    super(new KeyboardRepository())
  }
}