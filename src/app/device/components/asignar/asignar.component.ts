import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/services/backend.service';
import { Img, PdfMakeWrapper, QR, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

PdfMakeWrapper.setFonts(pdfFonts);


@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css']
})
export class AsignarComponent implements OnInit {

  @Input() device:any;
  alerta:boolean=false;
  token:any=null;
  defaultBindingsListAreas:any = [
  ];
  defaultBindingsListWorkers:any = [
  ];
  defaultBindingsListUbication:any = [
  ];
  forma:FormGroup= new FormGroup({});

  worker:any;


  constructor(public activeModal: NgbActiveModal, private nodejs:BackendService, private formBuilder: FormBuilder) {
    this.crearFormulario();
   }

  async ngOnInit(): Promise<void> {
    this.verificarToken();
    await this.nodejs.getAreas('area',this.token).subscribe((data:any) =>{
      this.defaultBindingsListAreas=data['areas'];
    });
    await this.nodejs.getAreas('ubication',this.token).subscribe((data:any) => {
      this.defaultBindingsListUbication=data['ubications'];
    })
  }

  crearFormulario(){
    this.forma=this.formBuilder.group({
      area:['', [Validators.required, Validators.minLength(5)]],
      worker:['', [Validators.required, Validators.minLength(3)]],
      ubication:['', [Validators.required, Validators.minLength(3)]],
      descripcion:[''],
    });
  }

  onChange(){
    this.forma.controls['worker'].setValue(null);
    this.forma.controls['ubication'].setValue(null);
    this.buscarTrabajadores();
  }

  verificarToken(){
    this.token=localStorage.getItem('jwt');
  }

  buscarTrabajadores(){
    this.nodejs.getAreas(`trabajadorByArea/${this.forma.controls['area'].value}`, this.token).subscribe((data:any) => {
      this.defaultBindingsListWorkers=data['trabajadores'];
    });
  }

  async asignar(){
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach( control => {
        control.markAsTouched();
      });
    }
    let body={
      device:this.device._id,
      encargado:this.forma.controls['worker'].value,
      departamento:this.forma.controls['area'].value,
      ubicacion:this.forma.controls['ubication'].value
    }
    console.log(body);
    let workerName:string='';
    let areaName:string='';
    this.nodejs.asignar('prestamo',body,this.token).subscribe(async(data:any)=>{
      workerName = this.checkWorker();
      areaName = this.checkArea();
      const pdf = new PdfMakeWrapper();
      let d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2)
          month = '0' + month;
      if (day.length < 2)
          day = '0' + day;

      let fecha = [day, month, year].join('-');
      pdf.add(new Txt(`León, Guanajuato a ${fecha}`).margin([0,0,0,10]).fontSize(9).end);
      pdf.add(new Txt('ATN. GERARDO HIPOLITO CABRERA ACOSTA').bold().fontSize(10).alignment('left').end);
      pdf.add(new Txt('REPRESENTANTE LEGAL').bold().fontSize(10).alignment('left').end);
      pdf.add(new Txt('FUERZA DEPORTIVA DEL CLUB LEON S.A DE C.V').bold().fontSize(10).alignment('left').end);
      pdf.add(new Txt('P   R   E   S   E   N   T   E.').bold().fontSize(10).alignment('left').margin([0,0,0,20]).end);
      pdf.add(new Txt([`Por medio de la presente el suscrito a `,new Txt(`${workerName}`).bold().end,` como asignado al área de `, new Txt(`${areaName} `).bold().end, `en este acto reciba a mi entera conformidad única y exclusivamente para el desempeño de mis funciones, el equipo:`]).margin([0,0,0,15]).fontSize(9).alignment('justify').end);
      pdf.add(new Table([
        [ new Txt('DISPOSITIVO').bold().end, new Txt('MARCA').bold().end, new Txt('MODELO').bold().end, new Txt('SERIE').bold().end, new Txt('ACCESORIOS').bold().end],
        [ this.device.nombre, this.device.marca, this.device.modelo, this.device.serie,this.forma.controls['descripcion'].value]
      ]).widths([ 100, 65, 75,110,120 ]).fontSize(9.5).margin([0,0,0,20]).end);
      pdf.add(new Txt([", así mismo en este acto me constituyo en ", new Txt("DEPOSITARIO ").bold().end, "del equipo que con esta fecha se me entrega, asumiendo las obligaciones contenidas en los artículos 2506, 2512, y demás relativos y aplicables del Código Civil para el Estado de Hidalgo, renunciado desde este momento a percibir de la Institución contraprestación alguna por virtud del DEPOSITO que con esta fecha se me confía, ya que el equipo que se me entrega, lo he de utilizar en el desempeño de mis funciones, sin que lo anterior quede eximido de indemnizar a la Institución si por descuido o negligencia el equipo materia del depósito, se pierde o deteriora, además en este acto acepto que el incumplimiento de los términos contenidos en el presente documento, puede acarrear responsabilidades civiles y penales, como las contenidas en el artículo 211 del Código Penal vigente."]).margin([0,0,0,15]).fontSize(9).alignment('justify').end);
      pdf.add(new Txt("Así mismo me obligo de manera expresa a cumplir con las siguientes obligaciones, contenidas en el Reglamento para Asignación de Equipos de Fuerza Deportiva del Club León:").margin([0,0,0,15]).fontSize(9).alignment('justify').end);
      pdf.add(new Txt(["Los ", new Txt("DEPOSITARIOS ").bold().end, "de los Activos de Cómputo asignados y distribuidos son responsables principales por la legalidad del software que ellos instalen en los mismos o que ya venga pre instalado, queda expresamente prohibido que los usuarios-depositarios de los equipos de cómputo propiedad de la empresa, instalen en los mismos cualquier software no licenciado o que sea ajeno a las funciones para las cuales se entregó el equipo."]).margin([0,0,0,15]).alignment('justify').fontSize(9).end);
      pdf.add(new Txt(["Los ", new Txt("DEPOSITARIOS ").bold().end, "utilizarán los programas de software sólo en virtud de los acuerdos de licencia y no instalarán copias no autorizadas de software comercial."]).fontSize(9).margin([0,0,0,15]).alignment('justify').end);
      pdf.add(new Txt(["Los ", new Txt("DEPOSITARIOS ").bold().end, "no descargarán, ni cargarán programas de software no autorizados a través de Internet."]).alignment('justify').fontSize(9).margin([0,0,0,15]).end);
      pdf.add(new Txt(["Los ", new Txt("DEPOSITARIOS ").bold().end, "que se enteren de cualquier uso inadecuado que se haga de los programas de software o la documentación vinculada a estos, deberán notificar al jefe inmediato o director del área en el que trabajan o al área legal."]).fontSize(9).alignment('justify').margin([0,0,0,15]).end);
      pdf.add(new Txt(["Según las leyes vigentes de derechos de autor, las personas involucradas en la reproducción ilegal de software pueden estar sujetas a sanciones civiles y penales, incluidas multas y prisión. ", new Txt("FUERZA DEPORTIVA DEL CLUB LEON,").bold().end, " no permite, favorece, o tolera, la duplicación ilegal de software. Los", new Txt(" DEPOSITARIOS").bold().end, " que realicen, adquieran o utilicen copias no autorizadas de software estarán sujetos a sanciones disciplinarias internas de acuerdo a las circunstancias. Dichas sanciones pueden incluir suspensiones o inclusive la rescisión del contrato de trabajo, sin responsabilidad para la Institución. Además estarán sujetos al cumplimiento de", new Txt(" LA POLITICA DE INTEGRIDAD DE LA EMPRESA.").bold().end]).alignment('justify').fontSize(9).margin([0,0,0,15]).end);
      pdf.add(new Txt(["Cualquier duda respecto a si cualquier empleado puede copiar o utilizar un determinado programa informático, debe consultarse con el jefe inmediato o director de área y en su defecto, con el área correspondiente."]).alignment('justify').fontSize(9).margin([0,0,0,130]).end)
      pdf.add(new Txt("_____________________________________________").alignment("center").bold().end);
      pdf.add(new Txt(`${workerName}`).fontSize(10).bold().alignment("center").end)
      pdf.create().download(`Hoja_responsiva_${this.device.nombre}_${workerName}`);
    }, err => {
      console.log(err);
      alert("Hubo un error al momento de generar dicha petición");
    });
    this.activeModal.close(true);
  }

  checkWorker(){
    for(let i=0; i < this.defaultBindingsListWorkers.length; i++){
      if(this.defaultBindingsListWorkers[i]._id==this.forma.controls['worker'].value){
        return this.defaultBindingsListWorkers[i].nombre;
      }
    }
  }

  checkArea(){
    for(let i=0; i < this.defaultBindingsListAreas.length; i++){
      if(this.defaultBindingsListAreas[i]._id==this.forma.controls['area'].value){
        return this.defaultBindingsListAreas[i].nombre;
      }
    }
  }

}
