import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Portfolio } from '../portfolio';
import { Artwork } from '../artwork';
import { ArtworkService } from '../artwork.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.css']
})
export class ArtworksComponent implements OnInit {

  portfolio: Portfolio = {
    id: 1,
    title: 'Love Portraits'
  }

  artworks: Artwork[];

  getArtworks(): void {
    this.service.getArtworks()
      .subscribe(artworks => this.artworks = artworks)
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ArtworkService
  ) { }

  ngOnInit() {
    //this.getArtworks()
    this.service.getArtworks().subscribe(artworks => this.artworks = artworks)
  }

}
