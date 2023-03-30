import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable } from "rxjs";
import { Profile } from "./profile.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements Resolve<Profile> {

  private profileUrl = 'api/profiles';

  constructor(private http: HttpClient, private router: Router) { }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.profileUrl).pipe(
      catchError(this.handleError)
    )
  }

  getProfile(id: string): Observable<Profile> {
    const url = `${this.profileUrl}/${id}`;
    return this.http.get<Profile>(url).pipe(
      catchError(this.handleError)
    )
  }

  createProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.profileUrl, profile).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Profile | Observable<Profile> | Promise<Profile> {
    return this.getProfile(route.params["id"]).pipe();
  }
}
