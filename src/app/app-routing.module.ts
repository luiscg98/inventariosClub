import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule) },
  { path: 'device', loadChildren: () => import('./device/device.module').then(module => module.DeviceModule) },
  { path: 'worker', loadChildren: () => import('./workers/workers.module').then(module => module.WorkersModule) },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
