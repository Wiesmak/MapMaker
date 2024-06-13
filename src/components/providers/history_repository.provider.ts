/**
 * @file <filename>.ts
 * @description This module imports the Provider class and the HistoryRepository along with its interface.
 * It exports the HistoryRepositoryProvider class which extends the Provider class, providing a specific implementation for the HistoryRepository.
 */

// Import the Provider class from the provider module
import {Provider} from "#lib/provider/_provider"

// Import the HistoryRepository and its interface from the repositories module
import {HistoryRepository, HistoryRepositoryInterface} from "@/repositories/_repositories"

/**
 * @class HistoryRepositoryProvider
 * @description The HistoryRepositoryProvider class extends the Provider class.
 * It provides a specific implementation of the Provider for the HistoryRepository.
 * @extends {Provider<HistoryRepositoryInterface>}
 */
export class HistoryRepositoryProvider extends Provider<HistoryRepositoryInterface> {
  /**
   * @constructor
   * @description The constructor for the HistoryRepositoryProvider class.
   * It initializes a new instance of the HistoryRepository and passes it to the super class constructor.
   */
  constructor() {
    super(new HistoryRepository())
  }
}