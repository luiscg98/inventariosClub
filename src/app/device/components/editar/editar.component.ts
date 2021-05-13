import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  @Input() device:any;
  forma:FormGroup = new FormGroup({});

  defaultBindingsListVendors:any;

  token:any=null;
  alerta:boolean=false;
  modo:number=0;

  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal, private nodejs:BackendService) {
    this.checkToken();
  }

  ngOnInit(): void {
    console.log(this.device);
    this.crearFormulario();
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
      nombre:[this.device.nombre, [Validators.required, Validators.minLength(2)]],
      marca:[this.device.marca, [Validators.required, Validators.minLength(2)]],
      modelo:[this.device.modelo, [Validators.required, Validators.minLength(2)]],
      vendor:[this.device.vendor],
      serie:[this.device.serie],
      descripcion:[this.device.descripcion],
      numArticulos:[this.device.numArticulos]
    });
  }

  async editDevice(){
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

    await this.nodejs.put(`equipo/${this.device._id}`,this.forma.value, this.token).subscribe(data=>{
      this.activeModal.close(true);
    }, err => {
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
    this.token = localStorage.getItem('jwt');
  }

}
