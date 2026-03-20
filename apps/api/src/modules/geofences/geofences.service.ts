import { Injectable } from "@nestjs/common";
import { DataStoreService } from "../../data/data-store.service";

@Injectable()
export class GeofencesService {
  constructor(private readonly dataStore: DataStoreService) {}

  listGeofences() {
    return this.dataStore.listGeofences();
  }
}
