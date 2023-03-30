import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PROFILES } from 'src/app/test/db-data';

describe('ProfileService', () => {

  let profileService: ProfileService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProfileService
      ]
    });

    profileService = TestBed.get(ProfileService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  it('should fetch all profiles', () => {

    profileService.getProfiles().subscribe(
      profiles => {
        expect(profiles).toBeTruthy('No profiles returned');
        expect(profiles.length).toBe(5, "incorrect number of profiles");
      }
    );

    const req = httpTestingController.expectOne('api/profiles');

    expect(req.request.method).toEqual("GET");

    req.flush(Object.values(PROFILES));

  });

  it('should fetch one profile by id', () => {

    let id = 'f869a7ca-90a2-47f0-a607-aecf122ec4ba';

    profileService.getProfile(id).subscribe(
      profile => {
        expect(profile).toBeTruthy('No profile returned');
        expect(profile.id).toBe(id);
      }
    );

    const req = httpTestingController.expectOne(`api/profiles/${id}`);

    expect(req.request.method).toEqual("GET");

    req.flush(Object.values(PROFILES)[0]);

  });


});
