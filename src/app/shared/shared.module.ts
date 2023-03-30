import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input/input.component';
import { ProfileCardsComponent } from './profile-cards/profile-cards.component';
import { NgxMaskModule } from 'ngx-mask';
import { PhonePipe } from './pipes/phone.pipe';


@NgModule({
  declarations: [
    InputComponent,
    ProfileCardsComponent,
    PhonePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule.forRoot()
  ],
  exports: [InputComponent, ProfileCardsComponent, PhonePipe]
})
export class SharedModule { }
