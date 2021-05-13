import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  criterio:string='';

  private subject$ = new Subject<boolean>();

  constructor() { }

   sendCriterio(criterio: boolean) {
    this.subject$.next(criterio);
  }

  onListenCriterio(): Observable<boolean> {
    return this.subject$.asObservable();
  }

  sendCriterio2(criterio:string) {
    this.criterio=criterio
  }
}
