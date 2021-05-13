import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/services/backend.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  @Input() device:any;
  forma:FormGroup = new FormGroup({});

  defaultBindingsListVendors:any;

  token:any=null;
  alerta:boolean=false;
  modo:number=0;

  constructor(private nodejs: BackendService, private router:Router, private data: DataService, public activeModal: NgbActiveModal, private formBuilder:FormBuilder ) {
    this.crearFormulario();
  }

  async ngOnInit(): Promise<void> {
    await this.checkToken();
    await this.nodejs.getAllDevices('vendor',this.token).subscribe((data:any)=>this.defaultBindingsListVendors=data['provedores'])
    if(this.device != undefined){
      this.modo=1;
      this.forma.controls['nombre'].setValue(this.device.nombre);
      this.forma.controls['nombre'].disable();
      this.forma.controls['modelo'].setValue(this.device.modelo);
      this.forma.controls['modelo'].disable();
      this.forma.controls['marca'].setValue(this.device.marca);
      this.forma.controls['marca'].disable();
    }
  }

  get nombreNoValido(){
    return this.forma.controls['nombre'].invalid && this.forma.controls['nombre'].touched
  }

  get marcaNoValido(){
    return this.forma.controls['marca'].invalid && this.forma.controls['marca'].touched
  }

  get modeloNoValido(){
    return this.forma.controls['modelo'].invalid && this.forma.controls['modelo'].touched
  }

  crearFormulario(){
    this.forma=this.formBuilder.group({
      nombre:['', [Validators.required, Validators.minLength(2)]],
      marca:['', [Validators.required, Validators.minLength(2)]],
      modelo:['', [Validators.required, Validators.minLength(2)]],
      vendor:[''],
      serie:[''],
      descripcion:[''],
      numArticulos:['']
    });
  }

  mayus(e:any) {
    e.value = e.value.toUpperCase();
  }

  async addDevice(){
    if(this.modo==1){
      this.forma.controls['nombre'].enable();
      this.forma.controls['marca'].enable();
      this.forma.controls['modelo'].enable();
    }
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach( control => {
        control.markAsTouched();
      })
    }
    if(this.forma.controls['serie'].value===""){
      this.forma.controls['serie'].setValue("S/N");
    }
    if(this.forma.controls['descripcion'].value===""){
      this.forma.controls['descripcion'].setValue("S/D");
    }
    if(this.forma.controls['numArticulos'].value===""){
      this.forma.controls['numArticulos'].setValue(1);
    }
    if(this.forma.controls['vendor'].value===""){
      this.forma.controls['vendor'].setValue("SIN PROVEDOR");
    }

    await this.nodejs.addDevice('equipo',this.forma.value, this.token).subscribe((data:any)=>{
      this.activeModal.close({ok:true,device:data['device']});
    }, err => {
      this.activeModal.close({ok:false,device:null});
      console.log(err.error);
      if(err.error['message']!=undefined){
        console.log(err.error['message']);
        alert("No eres administrador");
      }
      else
      alert("Error en el servidor");
    });
  }

  checkToken(){
    this.token=localStorage.getItem('jwt');
  }

}
