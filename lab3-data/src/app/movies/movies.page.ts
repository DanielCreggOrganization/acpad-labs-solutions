import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  // Define items property
  items: { key: string, value: string }[] = [];
  numItems: number = 0;
  key = '';
  value = '';
  getItemKey = '';
  itemValue = '';
  removeItemKey = '';
  
  constructor(private storageService: StorageService) { }

  // save item to storage
  async setItem() {
    await this.storageService.set(this.key, this.value);
    this.key = ''; // Clear key property
    this.value = ''; // Clear value property
    await this.showCurrentStorage(); // Load items from storage
  }

  async getItem() {
    const value = await this.storageService.get(this.getItemKey); // Get item from storage
    this.itemValue = value; // Set item value to itemValue property
  }

  async removeItem() {
    await this.storageService.remove(this.removeItemKey); // Remove item from storage
    await this.showCurrentStorage(); // Load items from storage
  }

  async removeListItem(item: { key: string, value: string }) {
    await this.storageService.remove(item.key); // Remove item from storage
    await this.showCurrentStorage(); // Load items from storage
  }

  async clearItems() {
    await this.storageService.clear(); // Clear all items from storage
    await this.showCurrentStorage(); // Load items from storage
  }

  async showCurrentStorage() {
    // Save items property to items array so that it can be displayed in the view
    this.items = await this.storageService.showStorage();
    // Save number of items to numItems property so that it can be displayed in the view
    this.numItems = await this.storageService.length();
  }

  ngOnInit() {

  }

}
