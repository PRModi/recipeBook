import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecepiesPage } from './recepies';

@NgModule({
  declarations: [
    RecepiesPage,
  ],
  imports: [
    IonicPageModule.forChild(RecepiesPage),
  ],
})
export class RecepiesPageModule {}
