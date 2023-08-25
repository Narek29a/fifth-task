import {
  Component, ElementRef,
  EventEmitter,
  forwardRef, HostListener, inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import {Item} from "../../models/item.model";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {VISIBLE_ITEMS_COUNT} from "../../tokens";
import {MatFormField} from "@angular/material/form-field";

@Component({
  selector: 'my-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, OnInit {

  @Input()
  items: Item[] = [];
  @Input()
  visibleItemsCount: number = inject(VISIBLE_ITEMS_COUNT);
  @Output()
  valueChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  searchValueChanged: EventEmitter<string> = new EventEmitter<string>();
  itemsToShow: Item[] = [];
  showSelectBody: boolean = false;
  selectBodyViewPort: string = '';


  @ViewChild('inputRef') inputRef!: ElementRef;
  @ViewChild('formFieldRef') formFieldRef!: MatFormField;

  onChange: any = () => {
  };
  onTouch: any = () => {
  }


  ngOnInit(): void {
    this.itemsToShow = this.items;
    this.selectBodyViewPort = `${(this.visibleItemsCount > this.items.length ? this.items.length : this.visibleItemsCount) * 48}px`;
  }

  set value(val: Item) {
    this.onChange(val)
    this.onTouch(val)
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {

  }

  search(value: string) {
    this.searchValueChanged.emit(value);
    this.itemsToShow = this.items.filter((item: Item) => item.name.startsWith(value));
  }


  @HostListener('document:click', ['$event', '$event.target'])
  checkOutsideClick(event: MouseEvent, targetElement: HTMLElement): void {
    let currentElem = targetElement;
    while (currentElem) {
      if (currentElem === this.formFieldRef._elementRef.nativeElement) {
        return;
      }
      currentElem = currentElem.parentElement!;
    }
    this.showSelectBody = false;
  }

  selectItem(item: Item) {
    this.inputRef.nativeElement.value = item.name;
    this.value = item;
    this.valueChanged.emit(item.id)
    this.searchValueChanged.emit(item.name);
    this.showSelectBody = false;
  }
}
