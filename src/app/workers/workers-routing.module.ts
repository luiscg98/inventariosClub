import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TokenGuard } from '../guards/token.guard';
import { DeviceByWorkerComponent } from './pages/device-by-worker/device-by-worker.component';
import { WorkersComponent } from './pages/workers/workers.component';

const routes: Routes = [
  {
    path: '',
    children: [
        { path: 'workers', canActivate:[TokenGuard] ,component: WorkersComponent},
        { path: '', redirectTo: 'workers', pathMatch: 'full' },
        { path: 'workers/:id', component:DeviceByWorkerComponent},
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersRoutingModule { }
