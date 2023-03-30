import { Profile } from './../../modules/profile/shared/profile.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-cards',
  templateUrl: './profile-cards.component.html',
  styleUrls: ['./profile-cards.component.css']
})
export class ProfileCardsComponent {

  @Input() profiles: Profile[] = [];

}
