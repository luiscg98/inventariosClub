import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-ver-equipo',
  templateUrl: './ver-equipo.component.html',
  styleUrls: ['./ver-equipo.component.css']
})
export class VerEquipoComponent implements OnInit {

  @Input() device:any;
  token:any;
  info:any;

  constructor(public activeModal:NgbActiveModal, private nodejs:BackendService) { }

  async ngOnInit(): Promise<void> {
    await this.verificaToken();
    await this.nodejs.getAllDevices(`equipoById/${this.device}`,this.token).subscribe((data:any)=>{
      this.info=data['equipo'];
    });
  }

  verificaToken(){
    this.token = localStorage.getItem('jwt');
  }


}
