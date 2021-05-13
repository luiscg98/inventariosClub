import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlldevicesComponent } from './pages/alldevices/alldevices.component';
import { TokenGuard } from '../guards/token.guard';
import { DeviceComponent } from './pages/device/device.component';
import { InfoGuard } from '../guards/info.guard';

const routes: Routes = [
  {
    path: '',
    children: [
        { path: 'alldevices/pag/:num', canActivate:[TokenGuard] ,component: AlldevicesComponent},
        { path: 'info/:id', canActivate:[InfoGuard] ,component: DeviceComponent},
        { path: '', redirectTo: 'alldevices/pag/1', pathMatch: 'full' },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
