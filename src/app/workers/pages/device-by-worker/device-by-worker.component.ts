import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-device-by-worker',
  templateUrl: './device-by-worker.component.html',
  styleUrls: ['./device-by-worker.component.css']
})
export class DeviceByWorkerComponent implements OnInit {
  token:any=null;
  equipos:any=null;

  constructor(private _route: ActivatedRoute, private data: BackendService) {
    this.checkToken();
  }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    console.log(id);
    this.data.getAllDevices(`equipoWorker/${id}`,this.token).subscribe((data:any)=>this.equipos=data['equipo']);
  }

  checkToken(){
    this.token = localStorage.getItem('jwt');
  }

}
