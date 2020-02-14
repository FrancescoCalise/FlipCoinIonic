import { Component, OnInit, Input } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-bluetooth',
  templateUrl: 'bluetooth.page.html',
  styleUrls: ['bluetooth.page.scss']
})
export class BluetoothModal implements OnInit {

  // Data passed in by componentProps
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  constructor(
    private bluetoothSerial: BluetoothSerial,
    private navParams: NavParams,
    public modalController: ModalController
    ) {
    console.log(navParams.get('firstName'));
  }

  ngOnInit(){
    //this.bluetoothSerial.isEnabled().then(enabled => console.log('bluetooth is:' + enabled))
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  
}
