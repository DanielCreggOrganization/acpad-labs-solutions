import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  // get item
  public async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  // remove item
  public remove(key: string) {
    this._storage?.remove(key);
  }

  // clear storage
  public clear() {
    this._storage?.clear();
  }

  // get all items
  public async showStorage(): Promise<{ key: string, value: any }[]> {
    const items: { key: string, value: any }[] = [];
    await this._storage?.forEach((value, key) => {
      items.push({ key: key, value: value });
    });
    return items;
  }

  // get total items
  public async length(): Promise<number> {
    const length = await this._storage?.length();
    return length || 0;
  }
}