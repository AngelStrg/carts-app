import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute= inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation : HousingLocation | undefined;


  formAngular = new FormGroup({
    firstName: new FormGroup(''),
    lastName: new FormGroup(''),
    email: new FormGroup('')
  });


  constructor() { 
    //const getHousingLocationId = Number(this.route.snapshot.params['id']);
    //this.housingLocation = this.housingService.getHousingLocationById(getHousingLocationId)

    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationsById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  
}

  onSubmit() {
    this.housingService.submitApplication(
      this.formAngular.value.firstName ?? '',
      this.formAngular.value.lastName ?? '',
      this.formAngular.value.email ?? ''
    )
  }
}
