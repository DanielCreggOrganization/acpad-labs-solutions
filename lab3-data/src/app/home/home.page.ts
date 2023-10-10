import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: { key: string, value: string }[] = [];
  key = ''; // initialize key property
  value = ''; // initialize value property
  getItemKey = ''; // initialize getItemKey property
  itemValue = ''; // initialize itemValue property
  removeItemKey = ''; // initialize removeItemKey property

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  async setItem() {
    await this.storage.set(this.key, this.value);
    const index = this.items.findIndex(item => item.key === this.key);
    if (index !== -1) {
      this.items[index].value = this.value;
    } else {
      this.items.push({ key: this.key, value: this.value });
    }
    this.key = '';
    this.value = '';
  }

  async getItem() {
    const value = await this.storage.get(this.getItemKey);
    console.log(value);
    this.itemValue = value;
  }

  async removeItem() {
    await this.storage.remove(this.removeItemKey);
    this.items = this.items.filter(item => item.key !== this.removeItemKey);
  }

  async removeListItem(item: { key: string, value: string }) {
    await this.storage.remove(item.key);
    this.items = this.items.filter(i => i !== item);
  }
}