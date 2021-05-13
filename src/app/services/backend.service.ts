import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//const URLDEV = 'https://nekonokokoroapi.herokuapp.com/';
//const URLDEV = 'http://172.18.3.246:3000/api/';
const URLDEV = 'http://localhost:3000/api/';
//const URLDEV = 'http://192.168.1.67:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) {}

  auth(termino:string,body:object){
    let url=URLDEV+termino;
    return this.http.post(url,body);
  }

  getAllDevices(termino:string,token:string){
    let url=URLDEV+termino;
    let headers = new HttpHeaders({
      Authorization:token
    });
    return this.http.get(url,{headers});
  }

  addDevice(termino:string,body:Object,token:string){
    let url=URLDEV+termino;
    let headers = new HttpHeaders({
      Authorization:token
    })
    return this.http.post(url,body,{headers});
  }

  put(termino:string,body:Object,token:string){
    let url=URLDEV+termino;
    let headers = new HttpHeaders({
      Authorization:token
    });
    return this.http.put(url,body,{headers})
  }

  getAreas(termino:string,token:string){
    let url=URLDEV+termino;
    let headers = new HttpHeaders({
      Authorization:token
    })
    return this.http.get(url,{headers});
  }

  asignar(termino:string,body:Object,token:string){
    let url=URLDEV+termino;
    let headers = new HttpHeaders({
      Authorization:token
    });
    return this.http.post(url,body,{headers});
  }

}
