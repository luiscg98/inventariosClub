import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/services/backend.service';
import { AddWorkerComponent } from '../../components/add-worker/add-worker.component';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  token:any;
  workers:any[]=[];
  role:any;

  constructor(private nodejs:BackendService, private modalService:NgbModal) {
    this.checkToken();
  }

  ngOnInit(): void {
    let jwtD:any = jwt_decode(this.token);
    this.role = jwtD['usuario'].role;
    this.nodejs.getAllDevices('trabajador',this.token).subscribe((data:any)=>{
      this.workers = data['trabajadores'];
    });
  }

  device(id:string){
    this.nodejs.getAllDevices(`equipoworker/${id}`,this.token).subscribe((data:any)=>console.log(data));
  }

  open() {
    const modalRef = this.modalService.open(AddWorkerComponent);
  }

  checkToken(){
    this.token = localStorage.getItem('jwt');
  }

}
