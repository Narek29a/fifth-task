import {NgModule} from "@angular/core";
import {SelectComponent} from "./components/select/select.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {VISIBLE_ITEMS_COUNT} from "./tokens";
import {Constants} from "./constants";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import {ScrollingModule} from "@angular/cdk/scrolling";

@NgModule({
  declarations: [SelectComponent],
  exports: [SelectComponent, FormsModule, ReactiveFormsModule],
  imports: [
    MatInputModule,
    MatListModule,
    CommonModule,
    ScrollingModule
  ],
  providers: [
    {
      provide: VISIBLE_ITEMS_COUNT, useValue: Constants.DEFAULT_ITEMS_COUNT
    }
  ]
})
export class SharedModule {

}
