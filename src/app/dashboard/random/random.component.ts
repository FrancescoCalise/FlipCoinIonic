import { Component, OnInit } from '@angular/core';
import { ModalServiceComponent } from 'src/app/services/modalService.Component';
import { BluetoothServiceComponent } from 'src/app/services/bluetoothService.Component';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
})
export class RandomComponent implements OnInit {
public message:string ="1,6"
  constructor(
    public modalService: ModalServiceComponent,
    public bluetoothService: BluetoothServiceComponent,
  ) { }

  ngOnInit() {

    this.bluetoothService.sendMessageToBluetooth(this.message)
  }

}
