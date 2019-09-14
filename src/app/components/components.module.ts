import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular'

import { NibrasListComponent } from './nibras-list/nibras-list.component';

@NgModule({
  declarations: [NibrasListComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ]
  
  ,exports: [NibrasListComponent]
})
export class ComponentsModule { }
