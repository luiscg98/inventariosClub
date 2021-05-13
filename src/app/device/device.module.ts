import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';

import { AgregarComponent } from './components/agregar/agregar.component';
import { AlldevicesComponent } from './pages/alldevices/alldevices.component';
import { VerEquipoComponent } from './components/ver-equipo/ver-equipo.component';
import { AsignarComponent } from './components/asignar/asignar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModulesModule } from '../modules/modules.module';
import { EditarComponent } from './components/editar/editar.component';
import { DeviceComponent } from './pages/device/device.component';


@NgModule({
  declarations: [AgregarComponent, AlldevicesComponent, VerEquipoComponent, AsignarComponent, EditarComponent, DeviceComponent],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    ModulesModule
  ],
})
export class DeviceModule { }
