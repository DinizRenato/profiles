import { catchError } from 'rxjs/operators';
import { Profile } from './../shared/profile.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  profile?: Profile;

  constructor(public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        console.log(data)
        this.profile = data['profile'] as Profile;
      }
    )
  }

}
