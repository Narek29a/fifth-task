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

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CarouselComponent),
      multi: true
    }
  ]
})
export class CarouselComponent implements ControlValueAccessor, OnInit {

  @Input()
  items: Item[] = [];
  @Input()
  visibleItemsCount: number = inject(VISIBLE_ITEMS_COUNT);
  @Output()
  valueChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  searchValueChanged: EventEmitter<string> = new EventEmitter<string>();
  optionsContainer!: HTMLElement;
  itemsToShow: Item[] = [];


  @ViewChild('inputRef') inputRef!: ElementRef;
  onChange: any = () => {
  };
  onTouch: any = () => {
  }


  ngOnInit(): void {
    this.itemsToShow = this.items;
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

  showSelectBody() {
    if (this.optionsContainer) {
      this.optionsContainer?.parentNode?.removeChild(this.optionsContainer);
    }
    this.optionsContainer = document.createElement('div');
    document.body.appendChild(this.optionsContainer);
    this.optionsContainer.classList.add('options-container');
    this.optionsContainer.setAttribute('id', 'options-container');
    this.optionsContainer.style.display = 'block'
    this.optionsContainer.innerHTML = '';
    this.itemsToShow.forEach((item: Item) => {
      const option = document.createElement('div');
      option.classList.add('option');
      option.textContent = item.name;
      option.addEventListener('click', () => {
        this.value = item;
        this.inputRef.nativeElement.value = item.name;
        this.valueChanged.emit(item.id)
        this.searchValueChanged.emit(item.name);
       // this.optionsContainer.style.display = 'none';
      });
      this.optionsContainer.appendChild(option);
    });
    const inputRect = this.inputRef.nativeElement.getBoundingClientRect();
    this.optionsContainer.style.top = `${inputRect.bottom + 10}px`;
    this.optionsContainer.style.left = `${inputRect.left}px`;
    this.optionsContainer.style.height = `${this.visibleItemsCount * 41}px`;
  }


  search(value: string) {
    this.searchValueChanged.emit(value);
    this.itemsToShow = this.items.filter((item: Item) => item.name.startsWith(value));
    this.showSelectBody();
  }

  @HostListener('document:click', ['$event.target']) onClickOutside(targetElem: HTMLElement) {
    const flyoutEl: HTMLElement | null = document.getElementById("options-container");
    if (flyoutEl && targetElem.id !== 'item-input') {
      flyoutEl.style.display = 'none';
    }
  }
}
