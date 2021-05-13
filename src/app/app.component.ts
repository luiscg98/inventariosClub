import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './services/data.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontendclub';
  token$: Subscription = new Subscription;
  token:any;
  estilo:Object={};

  constructor(private data:DataService) {
    this.token$ = this.data.onListenCriterio().subscribe(async(data) => {
      this.token = data;
      await this.revisarEstilo();
      if(data==true){
        $('body').css("background-image","none");
        $('#contenido').css("background-color","green");
      }
      else{
        $('body').css("background-image","url('../assets/fondoEsmeralda.png')");
      }
    });
   }

   async ngOnInit(){
     this.token = await this.verificarToken();
     if(this.token==null){
       this.data.sendCriterio(false);
     }
     else{
       this.data.sendCriterio(true);
     }
   }

   verificarToken(){
     let send = localStorage.getItem('jwt');
     return send;
   }
   revisarEstilo(){
     if(this.token==false){
       this.estilo = {'width':'100%', 'height':'100vh'};
     }
     else{
      this.estilo = {'background-color':'rgb(236,236,236)', 'overflow-y':'scroll'};
     }
   }

   ngOnDestroy(): void {
     this.token$.unsubscribe();
   }
}
