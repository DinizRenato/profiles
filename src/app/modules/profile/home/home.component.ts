import { Component, OnInit } from '@angular/core';

import { Profile } from '../shared/profile.model';
import { ProfileService } from './../shared/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profiles: Profile[] = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getProfiles();
  }

  getProfiles() {
    this.profileService.getProfiles().subscribe(
      profiles => this.profiles = profiles
    )
  }

}
