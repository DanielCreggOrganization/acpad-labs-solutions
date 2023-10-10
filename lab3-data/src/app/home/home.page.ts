import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Define items property
  items: { key: string, value: string }[] = [];
  numItems: number = 0;
  key = '';
  value = '';
  getItemKey = '';
  itemValue = '';
  removeItemKey = '';

  constructor(private storage: Storage) {
    this.initStorage(); // Call initStorage method on construction
  }

  async initStorage() {
    await this.storage.create(); // Create storage instance
    await this.loadItems(); // Load items from storage
  }

  async setItem() {
    await this.storage.set(this.key, this.value); // Set item in storage
    this.key = ''; // Clear key property
    this.value = ''; // Clear value property
    await this.loadItems(); // Load items from storage
  }

  async getItem() {
    const value = await this.storage.get(this.getItemKey); // Get item from storage
    console.log(value); // Log item value to console
    this.itemValue = value; // Set item value to itemValue property
  }

  async removeItem() {
    await this.storage.remove(this.removeItemKey); // Remove item from storage
    await this.loadItems(); // Load items from storage
  }

  async removeListItem(item: { key: string, value: string }) {
    await this.storage.remove(item.key); // Remove item from storage
    await this.loadItems(); // Load items from storage
  }

  async clearItems() {
    await this.storage.clear(); // Clear all items from storage
    await this.loadItems(); // Load items from storage
  }

  async loadItems() {
    // Create a temporary array to store items
    const itemsTempStorage: { key: string, value: string }[] = [];
    // Add item to items array
    await this.storage.forEach((value, key) => {
      // Push key and value to temporary storage
      itemsTempStorage.push({ key: key, value: value });
    });
    // Save items property to items array so that it can be displayed in the view
    this.items = itemsTempStorage;
    // Update numItems property
    this.numItems = await this.storage.length();
  }
}