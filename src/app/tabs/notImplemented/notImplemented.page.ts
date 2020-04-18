import { Component } from '@angular/core';
import { BluetoothServiceComponent } from 'src/app/services/bluetoothService.Component';
import { ModalServiceComponent } from 'src/app/services/modalService.Component';

@Component({
  selector: 'app-notImplemented',
  templateUrl: 'notImplemented.page.html',
  styleUrls: ['notImplemented.page.scss']
})
export class NotImplemented {

  constructor(
    public modalService: ModalServiceComponent,
    public bluetoothSerivce: BluetoothServiceComponent,
  ) {
  }
}
