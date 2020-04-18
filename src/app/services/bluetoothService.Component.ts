import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Device } from 'src/interface/Device';

@Component({
    template: ''
})
export class BluetoothServiceComponent {

  constructor(private bluetoothSerial: BluetoothSerial) { }

  public isEnabled(): Promise<boolean> {
    var value = false;
    var promise = new Promise<boolean>(resolve =>{
      setTimeout(()=>{
        resolve(value);
      }, 1000);
    })
    this.bluetoothSerial.isEnabled()
    .then(enabled => {
    
      if(enabled == "OK"){
     
        value = true;
        return promise;
      }
    })
    return promise;
  }

  public searchDevices(): Device[] {

    var myDevices: Device[] = [];

    this.bluetoothSerial.discoverUnpaired()
    .then((devices) => {
      devices.forEach(function(device) {
        if(device.address != undefined && device.name != undefined)
        {
          myDevices.push(device);
        }
      }) 
    })
    .catch(err =>{
      //TODO : gestire l'errore
      console.log(err,"devices");
    })

    return myDevices;
  }
  
}