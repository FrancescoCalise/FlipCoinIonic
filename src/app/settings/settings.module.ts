import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsPage } from './settings.page';
import { BluetoothModal } from './bluetooth/bluetooth.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { 
        path: '', component: SettingsPage 
      }
    ])
  ],
  declarations: [
    SettingsPage,
    BluetoothModal
  ],
  entryComponents:[
    BluetoothModal
  ]
})
export class SettingsPageModule {}
