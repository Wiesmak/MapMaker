import {Provider} from "#lib/provider/_provider"
import {MouseRepository, MouseRepositoryInterface} from "@/repositories/_repositories"

export class MouseRepositoryProvider extends Provider<MouseRepositoryInterface> {
  constructor() {
    super(new MouseRepository())
  }
}