import {NgModule} from "@angular/core";
import {CarouselComponent} from "./components/carousel/carousel.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {VISIBLE_ITEMS_COUNT} from "./tokens";
import {Constants} from "./constants";

@NgModule({
  declarations: [CarouselComponent],
  exports: [CarouselComponent, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: VISIBLE_ITEMS_COUNT, useValue: Constants.DEFAULT_ITEMS_COUNT
    }
  ]
})
export class SharedModule {

}
