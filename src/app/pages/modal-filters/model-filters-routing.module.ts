import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFiltersPage } from './modal-filters-page.component';

const routes: Routes = [
  {
    path: '',
    component: ModalFiltersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelFiltersPageRoutingModule {}
