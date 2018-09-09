import { Injectable } from '@angular/core';
import { Page } from './page'
import { PAGES } from './mock-pages'
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from './message.service';

// providedIn is 1 difference
//
//

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }

  getPages() { return of(PAGES); }

  getPage(slug: string) {
    return this.getPages().pipe(
      map(pages => pages.find(page => page.slug === slug))
    );
  }

  getPageListObs(): Observable<Page[]> {
    return of(PAGES)
  }

  getPageObs(slug: string): Observable<Page> {
    // TODO: send the message _after_ fetching the hero
    //this.messageService.add(`ArtworkService: fetched artwork id=${id}`);
    return of(PAGES.find(page => page.slug === slug));
  }
}
