import { Location } from '@angular/common';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { BackendService } from '../../../services/backend.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  alerta:boolean=false;
  alertacredenciales:boolean=false;
  token:any=null;
  info:string='';

  constructor(private nodejs: BackendService, private router:Router, private data:DataService, private _location: Location) {
  }

  async ngOnInit(): Promise<void> {
    await this.checkToken();
    if(this.token != null){
      this.router.navigate(['../../device']);
    }
  }

  auth(email:string,password:string){
    if(email == "" || password == ""){
      this.alerta=false;
      this.alerta=true;
    }
    else{
      let body = {
        email,
        password
      }
      this.nodejs.auth('login',body).subscribe( (data:any) =>{
        this.data.sendCriterio(true);
        localStorage.setItem('jwt',data['token']);
        if(this.data.criterio!='')
        this.router.navigateByUrl(this.data.criterio.split('#')[1]);
        else
        this.router.navigate(['../../device']);
      }, (error:any) => {
        if(error.error.message != undefined){
          this.alerta=false;
          this.alertacredenciales=true;
        }
        else{
          alert("El servidor se ha caído, vuelve a intentarlo más tarde");
        }
      });
    }
  }

  checkToken(){
    this.token=localStorage.getItem('jwt');
  }


}
