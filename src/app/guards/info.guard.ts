import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class InfoGuard implements CanActivate {
  constructor(private router:Router, private data:DataService,private _route: ActivatedRoute){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("entro a info");
      if(localStorage.getItem('jwt')==undefined){
        let url = window.location;
        console.log(url);
        this.data.sendCriterio2(url.href);
        return this.router.navigateByUrl('auth/login').then(() => false);
      }
    return true;
  }

}
