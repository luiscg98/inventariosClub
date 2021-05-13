import { Component, OnInit } from '@angular/core';
import {faUser, faListAlt, faTruck} from '@fortawesome/free-solid-svg-icons' ;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  faUser=faUser;
  faListAlt=faListAlt;
  faTruck=faTruck;

  constructor() { }

  ngOnInit(): void {
  }

}
