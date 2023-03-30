import { AppModule } from './../../../app.module';
import { ProfileService } from './../shared/profile.service';
import { ProfileModule } from './../profile.module';
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { PROFILES } from 'src/app/test/db-data';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe("HomeComponent", () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let profileService: any;

  const profiles = Object.values(PROFILES);

  beforeEach(waitForAsync(() => {

    const profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getProfiles']);

    TestBed.configureTestingModule({
      imports: [ProfileModule, AppModule],
      providers: [{ provide: ProfileService, useValue: profileServiceSpy }]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        profileService = TestBed.get(ProfileService);
      })
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  })

  it("should display all profiles", () => {

    profileService.getProfiles.and.returnValue(of(profiles));

    fixture.detectChanges();

    const cards = el.queryAll(By.css('.card-header'))

    expect(cards).toBeTruthy('Could not find any card');
    expect(cards.length).toBe(5, 'Unexpected number of profiles');

  })

})

