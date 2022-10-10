import { Component, OnInit } from '@angular/core';

import { Item } from '../item';
import { ItemService } from '../item.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  Items: Item[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems()
    .subscribe(Items => this.Items = Items);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.itemService.addItem({ name } as Item)
      .subscribe(Item => {
        this.Items.push(Item);
      });
  }

  delete(Item: Item): void {
    this.Items = this.Items.filter(h => h !== Item);
    this.itemService.deleteItem(Item.id).subscribe();
  }
}