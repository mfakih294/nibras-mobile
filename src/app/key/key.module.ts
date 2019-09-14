import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { KeyPage } from './key.page';
import { ComponentsModule } from '../components/components.module';
import { NibrasListComponent } from '../components/nibras-list/nibras-list.component';

const routes: Routes = [
  {
    path: '',
    component: KeyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    
    RouterModule.forChild(routes)
  ],
  declarations: [KeyPage]
})
export class KeyPageModule {}
