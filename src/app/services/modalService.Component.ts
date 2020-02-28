import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BluetoothModal } from '../settings/bluetooth/bluetooth.page';
import { NotImplemented } from '../tabs/notImplemented/notImplemented.page';

@Component({
    template: ''
})
export class ModalServiceComponent {
  stringEmpty:string = "";

  constructor(public modalController: ModalController) { }


  public async openModel(nameComponent:string){
  const modal = await this.modalController.create({
    component: this.stringEmpty,
    componentProps: {
      'firstName': 'Douglas',
      'lastName': 'Adams',
      'middleInitial': 'N'
    }
    
  });
  modal.component = this.setComponent(nameComponent);
  return await modal.present();
  }

  private setComponent(nameComponent:string){
    switch(nameComponent){
      case "BluetoothModal": return BluetoothModal; break;
      default: return NotImplemented;
    }  
  }

  public dismissModel() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  } 
}
