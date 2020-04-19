import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { IDevice } from 'src/interface/IDevice';



@Component({
    template: ''
})
export class  BluetoothServiceComponent {

  constructor(private bluetoothSerial: BluetoothSerial) { }

  public  async isEnabled(): Promise<boolean> {
    let value = false;
    const promise = new Promise<boolean>(resolve => {
      setTimeout(()=>{
resolve(value)
      })
    
    });
    await Promise.resolve(this.bluetoothSerial.isEnabled()
      .then(enabled => {
        if (this.convertResponseBluetooth(enabled)) {
          value = true;
        }
      }) 
      .catch(err => {
        // TODO: gestire l'errore
        console.log(err, 'notenabled');
      })
    )
    return promise;
  }

  public async searchDevices(): Promise<IDevice[]> {
    const myDevices: IDevice[] = [];
    const promise = new Promise<IDevice[]>(resolve => {
      resolve(myDevices);
    });

    await Promise.resolve(
      this.bluetoothSerial.discoverUnpaired()
      .then((devices: IDevice[]) => {
        devices.forEach((device: IDevice) => {
          if ( device.address !== undefined && device.name !== undefined) {
            myDevices.push(device);
          }
        });
      })
      .catch(err => {
        // TODO: gestire l'errore
        console.log(err, 'devices');
      })
    )
    return promise;
  }

 
  public connectToDevice(macAddress : string): boolean{
    let response=false;
    this.bluetoothSerial.connect(macAddress)
    .subscribe((res) => {
    if(this.convertResponseBluetooth(res))
      response=true;
      console.log("isConnected",response)
    },(err) => {
      console.log(err,"errore")
    }) 
    return response;  
  }

  public showBluetoothSettings(){
    this.bluetoothSerial.showBluetoothSettings()
    .then((settings)=>{
      console.log(settings,"settingBluetooth")
    })
    .catch(err=>
      console.log(err,"errorsetting"))
  }

  public disconnectBluetooth():boolean{
    let response=false;
    this.bluetoothSerial.disconnect()
    .then((res)=>{
     if(this.convertResponseBluetooth(res))
     response=true
     console.log("Disconnect",response)
    })
    return response
  }
public sendMessageToBluetooth(msg:string)
{
  this.bluetoothSerial.write(msg)
  .then((res)=>{
    console.log(res)
   })
  
}
  private convertResponseBluetooth(response: string): boolean{
    if(response === 'OK'|| response ==='ok')
      return true;
      return false;
  }
}
