import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BluetoothModal } from './bluetooth/bluetooth.page';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {

  constructor(public modalController: ModalController) {}

  ngOnInit(){
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: BluetoothModal,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  public test(){
    console.log('test')
  }

}
