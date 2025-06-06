import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  housingLocationList : HousingLocation [] = [];

  housingService:HousingService= inject(HousingService);

  filteredLocationList : HousingLocation [] = [];
  
  constructor() { 
    //this.housingLocationList = this.housingService.getallHousingLocations();
    //this.filteredLocationList = this.housingLocationList;

    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  fliterResults(text: string) {
    if(!text){
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) => 
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()))

  }

}
