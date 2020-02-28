import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Component({
    template: ''
})
export class BluetoothServiceComponent {

  constructor(private bluetoothSerial: BluetoothSerial) { }

  public isEnabled(){
    this.bluetoothSerial.isEnabled().then(enabled => console.log('bluetooth is:' + enabled))
  }
  
}
