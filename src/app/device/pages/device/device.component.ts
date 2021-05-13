import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  equipo:any=null;
  token:any=null;

  constructor(private _route: ActivatedRoute, private data: BackendService) {
    this.checkToken();
  }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    this.data.getAllDevices(`equipoById/${id}`,this.token).subscribe((data:any)=>this.equipo=data['equipo']);
  }

  checkToken(){
    this.token=localStorage.getItem('jwt');
  }

}
