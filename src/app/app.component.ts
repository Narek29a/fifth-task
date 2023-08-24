import {Component} from '@angular/core';
import {Item} from "./models/item.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  item: Item | null = null;
  itemFC: FormControl<Item | null> = new FormControl<Item | null>(null);
  formGroup: FormGroup = new FormGroup({
    itemFCM: new FormControl<Item | null>(null)
  })
  selectedItemId!: number;
  searchValue: string = '';
  itemsCount: number = 5;
  constructor() {
  }

  items: Item[] = [
    {name: 'apple', id: 1},
    {name: 'banana', id: 2},
    {name: 'orange', id: 3},
    {name: 'grapes', id: 4},
    {name: 'strawberry', id: 5},
    {name: 'mango', id: 6},
    {name: 'pineapple', id: 7},
    {name: 'watermelon', id: 8},
    {name: 'kiwi', id: 9},
    {name: 'pear', id: 10},
  ];


  valueChanged(id: number) {
    this.selectedItemId = id;
  }

  searchValueChanged(searchValue: string) {
    this.searchValue = searchValue;
  }
}
