import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { IDevice } from '../../interface/IDevice';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { CommonServiceComponent } from './commonService.Component';




@Component({
    template: ''
})
export class  BluetoothServiceComponent {

  constructor(private bluetoothSerial: BluetoothSerial,private commonService:CommonServiceComponent,private splashScreen: SplashScreen) { }
isEnabledBool=false;
isConnectedBool=false;

  public  async isEnabled(): Promise<boolean> {
   this.isEnabledBool=false;
    const promise = new Promise<boolean>(resolve => {
      setTimeout(()=>{
      resolve(this.isEnabledBool)
      })
    });
    await Promise.resolve(this.bluetoothSerial.isEnabled()
      .then(enabled => {
        if (this.convertResponseBluetooth(enabled)) {
        this.isEnabledBool=true;         
        }
      }) 
      .catch(err => {
        // TODO: gestire l'errore
        console.log(err, 'notenabled');
        this.commonService.showError("Bluetooth spento","Bluetooth")
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
    this.splashScreen.show();
    let response=false;
    this.bluetoothSerial.connect(macAddress)
    .subscribe((res) => {
    if(this.convertResponseBluetooth(res))
      response=true;
      console.log("isConnected",response)
      this.commonService.showSuccess("Connessione abilitata","Connessione")
    },(err) => {
      console.log(err,"errore")
      this.commonService.showError("Connessione non riuscita","Connessione")

    }) 
    this.splashScreen.hide();
    return response;  
  }
public async isConnected():Promise<boolean>{
 this.isConnectedBool=false;
    const promise = new Promise<boolean>(resolve => {
      setTimeout(()=>{
resolve(this.isConnectedBool)
      })
    
    });
    await Promise.resolve(this.bluetoothSerial.isConnected()
      .then(enabled => {
        if (this.convertResponseBluetooth(enabled)) {
          this.isConnectedBool = true;
          this.commonService.showSuccess("Dispositivo Paired","Bluetooth")

        }
      }) 
      .catch(err => {
        // TODO: gestire l'errore
        this.commonService.showError("Dispositivo non Paired","Bluetooth")
      })
    )
    return promise;
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
     this.commonService.showSuccess("Disconessione Riuscita","Disconnessione")

     console.log("Disconnect",response)
    })
    return response
  }

public async sendMessageToBluetooth(msg:string)
{
  console.log(this.isEnabled())
  console.log(this.isConnected()); 
  if (this.isEnabledBool && this.isConnectedBool){
  this.bluetoothSerial.write(msg)
  .then((res)=>{
    this.commonService.showSuccess("Messaggio inviato","Bluetooth")
    console.log(res)
   })
   .catch(err=>{
    console.log(err,"errorsetting")
    this.commonService.showError("Messaggio non inviato","Bluetooth")

   })
  }
}
  private convertResponseBluetooth(response: string): boolean{
    if(response === 'OK'|| response ==='ok')
      return true;
      return false;
  }
}
