import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons' ;
import { DataService } from 'src/app/services/data.service';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import jwt_decode from "jwt-decode";
import { PdfMakeWrapper, QR, Table, Txt } from 'pdfmake-wrapper';

PdfMakeWrapper.setFonts(pdfFonts);


import { VerEquipoComponent } from '../../components/ver-equipo/ver-equipo.component';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AgregarComponent } from '../../components/agregar/agregar.component';
import { AsignarComponent } from '../../components/asignar/asignar.component';
import { EditarComponent } from '../../components/editar/editar.component';

@Component({
  selector: 'app-alldevices',
  templateUrl: './alldevices.component.html',
  styleUrls: ['./alldevices.component.css']
})
export class AlldevicesComponent implements OnInit {

  faElipsisV  =  faEllipsisV ;
  token:any=null;
  devices:any=[];
  closeResult:string='';
  pags:number=0;
  pagina:number=0;
  url:string = '';
  role:string='';
  showDevices:any[]=[];

  constructor(private _route: ActivatedRoute,private router: Router, private nodejs: BackendService, private data:DataService, public modalService: NgbModal) { }

  async ngOnInit(): Promise<void> {
    await this.checkToken();
    let jwtD:any = jwt_decode(this.token);
    this.role = jwtD['usuario'].role;
    if(this.role=='ADMIN_ROLE')
    this.url="equipoByArea";
    if(this.role == 'SUPER_ROLE')
    this.url="equipo";
    this.pagina = Number(this._route.snapshot.paramMap.get('num'));
    console.log(this.pagina);
    let pag = 10*this.pagina-10;
    await this.nodejs.getAllDevices(this.url,this.token).subscribe((data:any)=>{
      this.devices=data['equipos'];
      this.pags = Math.ceil(data['cuantos']/10);
      let o = 0;
      for (let index = pag; index < pag+10; index++) {
        if(this.devices[index]!=undefined)
        this.showDevices[o] = this.devices[index];
        o++;
      }
    }, (err:any) => {
      if(err.error.message=="Token no válido"){
        this.logOut();
      }
    });
  }

  async paginacion(pag:number){
    this.showDevices=[];
    console.log("paginación", pag);
    this.pagina=pag;
    pag=10*pag-10;
    let o=0;
    for (let index = pag; index < pag+10; index++){
      if(this.devices[index]!=undefined){
        this.showDevices[o] = this.devices[index];
        o++;
      }
    }
    window.history.pushState(null,'',`#/device/alldevices/pag/${this.pagina}`);
  }

  counter(i: number) {
    return new Array(i);
  }

  async open2(){
    const modalRef = await this.modalService.open(AgregarComponent);
    modalRef.result.then(async (data) => {
      if(data.ok==true){
        await this.ordenar();
        console.log(this.devices);
        this.devices[0]=data.device;
        this.paginacion(1);
      }
    });

  }

  asignar(device:string){
    const modalRef = this.modalService.open(AsignarComponent);
    modalRef.componentInstance.device = device;
    modalRef.result.then(async(data:any)=>{
      if(data==true){
        this.paginacion(this.pagina);
      }
    })
  }

  crearIgual(equipo:Object){
    const modalRef = this.modalService.open(AgregarComponent);
    modalRef.componentInstance.device=equipo;
    modalRef.result.then(data=>{
      if(data==true){
        this.paginacion(1);
      }
    })
  }

  checkToken(){
    this.token=localStorage.getItem('jwt');
  }

  editar(device:Object){
    console.log(device);
    const modalRef = this.modalService.open(EditarComponent);
    modalRef.componentInstance.device=device;
    modalRef.result.then(data=>{
      if(data==true){
        this.paginacion(this.pagina);
      }
    });
  }

  open(device:string) {
    const modalRef = this.modalService.open(VerEquipoComponent);
    modalRef.componentInstance.device = device;
  }

  regresar(device:object){
    let body = {
      device
    }
    this.nodejs.asignar('regreso',body,this.token).subscribe(data=>{
      this.paginacion(this.pagina);
    });
  }

  QR(id:string){
    const pdf = new PdfMakeWrapper();
    pdf.pageSize({
      width: 100,
      height: 'auto'
    });
    pdf.add(new QR(`http://172.18.3.246:8080/#/device/info/${id}`).fit(50).alignment('center').end);
    pdf.add(new Txt('www.clubleon.com.mx').fontSize(2).alignment('center').end);
    pdf.create().open();
  }

  ordenar(){
    let o = 1;
    let comodin = this.devices;
    console.log("entro a esta mamada");
    for (let index = 0; index < comodin.length+1; index++) {
      this.devices[o] = comodin[index];
      o++;
    }
  }

  logOut(){
    this.data.sendCriterio(false);
    localStorage.removeItem('jwt');
    this.router.navigate(['../../auth']);
  }
}
