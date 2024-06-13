import {Provider} from "#lib/provider/_provider"
import {KeyboardRepository, KeyboardRepositoryInterface} from "@/repositories/_repositories"

export class KeyboardRepositoryProvider extends Provider<KeyboardRepositoryInterface> {
  constructor() {
    super(new KeyboardRepository())
  }
}