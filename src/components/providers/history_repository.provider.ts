import {Provider} from "#lib/provider/_provider"
import {HistoryRepository, HistoryRepositoryInterface} from "@/repositories/_repositories"

export class HistoryRepositoryProvider extends Provider<HistoryRepositoryInterface> {
  constructor() {
    super(new HistoryRepository())
  }
}