import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {

  forma:FormGroup = new FormGroup({});

  defaultBindingsListVendors:any;

  token:any=null;
  alerta:boolean=false;
  modo:number=0;

  constructor(private nodejs: BackendService, public activeModal: NgbActiveModal, private formBuilder:FormBuilder, private modalService:NgbModal) {
    this.crearFormulario();
  }

  async ngOnInit(): Promise<void> {
    await this.checkToken();
    await this.nodejs.getAllDevices('area',this.token).subscribe((data:any)=>console.log(data['areas']));
  }

  crearFormulario(){
    this.forma=this.formBuilder.group({
      nombre:['', [Validators.required, Validators.minLength(10)]],
      telefono:[0],
      correo:[''],
      area:['',[Validators.required, Validators.minLength(2)]],
      ocupacion:['', [Validators.required, Validators.minLength(2)]]
    });
  }

  async addWorker(){
    console.log("entra");
    console.log(this.forma);
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach( control => {
        control.markAsTouched();
      })
    }

    await this.nodejs.addDevice('trabajador',this.forma.value, this.token).subscribe(data=>{
    }, err => {
      console.log(err.error);
      if(err.error['message']!=undefined){
        console.log(err.error['message']);
        alert("No eres administrador");
      }
      else
      alert("Error en el servidor");
    });

    this.activeModal.close(true);
  }


  checkToken(){
    this.token=localStorage.getItem('jwt');
  }

}
