import { NgModule } from '@angular/core';
import { BluetoothServiceComponent } from './bluetoothService.Component';
import { ModalServiceComponent } from './modalService.Component';
import { CommonServiceComponent } from './commonService.Component';
import { BluetoothModal } from '../settings/bluetooth/bluetooth.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        BluetoothServiceComponent,
        CommonServiceComponent,
        BluetoothModal,
        ModalServiceComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    providers:[
        BluetoothServiceComponent,
        CommonServiceComponent,
        ModalServiceComponent
    ],
    exports: [
        BluetoothServiceComponent,
        CommonServiceComponent,
        ModalServiceComponent

    ],
    entryComponents:[
        BluetoothModal
    ]
})
  
export class ServicesModule {}