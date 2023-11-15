import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this line

import { CardComponent } from './components/price-slider/price-slider.component';

import { MatSliderModule, MatSliderThumb } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field'; // Add this line
import { MatInputModule } from '@angular/material/input'; // Add this line
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CardCarouselComponent } from './components/carousel-card/carousel-card.component';


import { MatSlider } from '@angular/material/slider';
import { MatSliderRangeThumb } from '@angular/material/slider';

import { CarListComponent } from './components/car-list/car-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ModelSearchComponent } from './components/model-search/model-search.component';
import { MakeSearchComponent } from './components/make-search/make-search.component';
import { SearchEngineComponent } from './components/search-engine/search-engine.component';
import { DropdownSearchComponent } from './components/dropdown-search/dropdown-search.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardCarouselComponent,
    CarListComponent,
    MakeSearchComponent,
    ModelSearchComponent,
    SearchEngineComponent,
    DropdownSearchComponent,
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
