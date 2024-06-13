import {Provider} from "#lib/provider/_provider"
import {AutoRepository, AutoRepositoryInterface} from "@/repositories/_repositories"

export class AutoRepositoryProvider extends Provider<AutoRepositoryInterface> {
  constructor() {
    super(new AutoRepository())
  }
}