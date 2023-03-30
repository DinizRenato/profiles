import { AppModule } from './../../app.module';
import { ProfileCardsComponent } from './profile-cards.component';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { SharedModule } from '../shared.module';
import { PROFILES } from 'src/app/test/db-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CoreModule } from 'src/app/core/core.module';

describe('ProfileCardsComponent', () => {

  let component: ProfileCardsComponent;
  let fixture: ComponentFixture<ProfileCardsComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, AppModule]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ProfileCardsComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the profile list', () => {
    component.profiles = Object.values(PROFILES);

    fixture.detectChanges();

    const cards = el.queryAll(By.css('.card-header'))

    expect(cards).toBeTruthy('Could not find any card');
    expect(cards.length).toBe(5, 'Unexpected number of profiles');

  });

  it('should display the first profile', () => {
    component.profiles = Object.values(PROFILES);
    fixture.detectChanges();

    const profile = component.profiles[0];

    const cardProfileFullName = el.query(By.css('.lead:first-child'));
    expect(cardProfileFullName).toBeTruthy("Could not find profile card");
    expect(cardProfileFullName.nativeElement.textContent).toBe(`${profile.firstName} ${profile.lastName}`)

  });

})
