import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';

import { City } from 'src/app/shared/models/city.model';
import { CityService } from 'src/app/shared/services/city.service';
import { Profile } from '../shared/profile.model';
import { ProfileService } from '../shared/profile.service';

import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  today: Date = new Date();

  private searchTerms = new Subject<string>();
  cities$: Observable<City[]> | undefined;

  img_photo: string = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';


  firstName = new FormControl('', [Validators.required, Validators.minLength(3)]);
  lastName = new FormControl('', [Validators.required, Validators.minLength(3)]);
  jobTitle = new FormControl('', [Validators.required, Validators.minLength(3)]);
  dob = new FormControl('', [Validators.required]);
  street = new FormControl('', [Validators.required, Validators.minLength(3)]);
  city = new FormControl('', [Validators.required, Validators.minLength(3)]);
  state = new FormControl('', [Validators.required, Validators.minLength(3)]);
  phone = new FormControl('', [Validators.required, Validators.minLength(10),
  Validators.maxLength(10)]);
  profilePhoto = new FormControl('', [Validators.required, Validators.minLength(3)]);

  profileForm: FormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    jobTitle: this.jobTitle,
    dob: this.dob,
    street: this.street,
    city: this.city,
    state: this.state,
    phone: this.phone,
    profilePhoto: this.profilePhoto,
  })

  constructor(
    private profileService: ProfileService,
    private cityService: CityService,
    private router: Router) { }


  ngOnInit(): void {

    this.cities$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.cityService.getCitiesByName(term))
    )
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  stateValue(name: any) {
    this.cityService.getCitiesByName(name).subscribe(
      data => this.profileForm.controls['state'].setValue((data[0].state))
    )
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.profileForm.controls['profilePhoto'].setValue(this.croppedImage);
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  createProfile() {
    let profileCreate: Profile = {
      id: uuid(),
      ...this.profileForm.value
    }
    this.profileService.createProfile(profileCreate).subscribe(
      profile => {
        let url = ['/', profile.id]
        this.router.navigate(url);
      }
    );
  }

}
