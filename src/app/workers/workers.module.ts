import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersComponent } from './pages/workers/workers.component';
import { AddWorkerComponent } from './components/add-worker/add-worker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModulesModule } from '../modules/modules.module';
import { DeviceByWorkerComponent } from './pages/device-by-worker/device-by-worker.component';

@NgModule({
  declarations: [WorkersComponent, AddWorkerComponent, DeviceByWorkerComponent],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    ModulesModule
  ]
})
export class WorkersModule { }
