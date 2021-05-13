import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ModulesModule } from '../modules/modules.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import {AppRoutingModule} from '../app-routing.module'



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    ModulesModule,
    AppRoutingModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
