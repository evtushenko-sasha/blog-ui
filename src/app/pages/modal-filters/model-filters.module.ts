import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModelFiltersPageRoutingModule } from './model-filters-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModelFiltersPageRoutingModule
  ],
  declarations: []
})
export class ModelFiltersPageModule {}
