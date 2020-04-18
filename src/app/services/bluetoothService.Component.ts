import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { IDevice } from 'src/interface/IDevice';

@Component({
    template: ''
})
export class BluetoothServiceComponent {

  constructor(private bluetoothSerial: BluetoothSerial) { }

  public isEnabled(): Promise<boolean> {
    let value = false;
    const promise = new Promise<boolean>(resolve => {
      setTimeout(() => {
        resolve(value);
      }, 1000);
    });
    this.bluetoothSerial.isEnabled()
    .then(enabled => {
      if (enabled === 'OK') {
        value = true;
        return promise;
      }
    });
    return promise;
  }

  public searchDevices(): IDevice[] {
    const myDevices: IDevice[] = [];

    this.bluetoothSerial.discoverUnpaired()
    .then((devices: IDevice[]) => {
      devices.forEach((device: IDevice) => {
        if ( device.Address !== undefined && device.Name !== undefined) {
          myDevices.push(device);
        }
      });
    })
    .catch(err => {
      // TODO: gestire l'errore
      console.log(err, 'devices');
    });
    return myDevices;
  }
}
