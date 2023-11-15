import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';
import { SearchEngineComponent } from './components/search-engine/search-engine.component';

const routes: Routes = [
  { path: '', component: SearchEngineComponent },
  { path: 'car-list', component: CarListComponent }, // Uncomment this line
  {
    path: 'car-list/:make/:model/:minPrice/:maxPrice',
    component: CarListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //{ useHash: true }
  exports: [RouterModule],
})
export class AppRoutingModule {}
