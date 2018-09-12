import { Component, OnInit } from '@angular/core';
import { Artwork } from '../artwork';
import { Portfolio } from '../portfolio';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { ArtworkService }  from '../artwork.service';

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css']
})
export class ArtworkDetailComponent implements OnInit {

  portfolio: Portfolio = {
    id: 1,
    title: 'Stuffffff'
  }

  artwork$: Observable<Artwork>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ArtworkService
  ) { }

  ngOnInit() {
    // NOTE: this can be simpler if there is no navigation between artworks but now there is. see  https://angular.io/guide/router#route-definition-with-a-parameter
    //
    // the fix was to add async as in the template
    this.artwork$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getArtwork(+params.get('id')))
    );

    //
    var modal = document.querySelector('.modal');
    // close modal if clicked outside content area
    document.querySelector('.modal-inner').addEventListener('click', function() {
      modal.classList.toggle('modal-open');
    });
    // prevent modal inner from closing parent when clicked
    document.querySelector('.modal-content').addEventListener('click', function(e) {
    	e.stopPropagation();
    });
  }

  showModal(): void {
    var modal = document.querySelector('.modal');
    modal.classList.toggle('modal-open');
  }
  closeModal(): void {
    var modal = document.querySelector('.modal');
    modal.classList.toggle('modal-open');
  }

  showPrev(id: number): void {
    // better but still hack
    let newId = id - 1
    this.artwork$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getArtwork(newId))
    );
  }
  showNext(id: number): void {
    let newId = id + 1
    this.artwork$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getArtwork(newId))
    );
  }


}
