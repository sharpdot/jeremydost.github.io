import { Injectable } from '@angular/core';
import { Artwork } from './artwork'
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ARTWORKS } from './mock-artworks'


@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  constructor(private http: HttpClient,
      private messageService: MessageService) { }

  private serviceUrl = 'assets/data/artworks.json';  // URL to web api

  /** GET data from the server */
  getArtworks(): Observable<Artwork[]> {
    // TODO: send the message _after_ fetching the heroes
    //this.messageService.add('ArtworkService: fetched artworks');
    return this.http.get<Artwork[]>(this.serviceUrl)
  }

  getArtwork(id: number): Observable<Artwork> {
    // TODO: send the message _after_ fetching the hero
    //this.messageService.add(`ArtworkService: fetched artwork id=${id}`);
    return this.getArtworks().pipe(
      map(artwork => artwork.find(artwork => artwork.id === id))
    );
  }

  getNextArtwork(id: number): Observable<Artwork> {
    // TODO: send the message _after_ fetching the hero
    //this.messageService.add(`ArtworkService: fetched artwork id=${id}`);
    let nextId = id + 1
    console.log('get next artwork...');
    return this.getArtworks().pipe(
      map(artwork => artwork.find(artwork => artwork.id === nextId))
    );
/*
    let idx = ARTWORKS.findIndex(artwork => artwork.id === id)
    idx ++
    if (idx > ARTWORKS.length - 1){
      idx = 0
    }
    return of(ARTWORKS[idx]);
*/
  }

  getPrevArtwork(id: number): Observable<Artwork> {
    // TODO: send the message _after_ fetching the hero
    //this.messageService.add(`ArtworkService: fetched artwork id=${id}`);
    let prevId = id - 1
    return this.getArtworks().pipe(
      map(artwork => artwork.find(artwork => artwork.id === prevId))
    );
    /*
    let idx = ARTWORKS.findIndex(artwork => artwork.id === id)
    idx --
    if (idx < 0){
      idx = ARTWORKS.length - 1
    }
    return of(ARTWORKS[idx]);
    */
  }

}
