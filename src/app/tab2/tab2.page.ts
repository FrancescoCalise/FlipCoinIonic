import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private bluetoothSerial: BluetoothSerial) {}

  ngOnInit(){
    //this.bluetoothSerial.isEnabled().then(enabled => console.log('bluetooth is:' + enabled))
  }

}
