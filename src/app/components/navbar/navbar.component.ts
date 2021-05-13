import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faBell, faSortDown } from '@fortawesome/free-solid-svg-icons' ;
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faBell=faBell;
  faUser=faUser;
  faSortDesc=faSortDown

  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  loguot(){
    this.data.sendCriterio(false);
    this.data.sendCriterio2('');
    localStorage.removeItem('jwt');
    this.router.navigate(['../../auth']);
  }

}
