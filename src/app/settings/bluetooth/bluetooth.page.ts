import { Component, OnInit,Input } from '@angular/core';
import { NavParams} from '@ionic/angular';
import { BluetoothServiceComponent } from 'src/app/services/bluetoothService.Component';
import { ModalServiceComponent } from 'src/app/services/modalService.Component';
import { Device } from 'src/interface/Device';

@Component({
  selector: 'app-bluetooth',
  templateUrl: 'bluetooth.page.html',
  styleUrls: ['bluetooth.page.scss']
})
export class BluetoothModal implements OnInit {
  public devices: Device[] = [];
  // Data passed in by componentProps
  /* @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string; */

  constructor(
    public modalService: ModalServiceComponent,
    private navParams: NavParams,
    public bluetoothService: BluetoothServiceComponent,
  ) {   
   
  }

   ngOnInit(){
    this.bluetoothService.isEnabled()
    .then(state =>{
    
      if(state){
        this.devices = this.bluetoothService.searchDevices();
      }
    })
   
  }

 ngOnAfterInit(){

 }

  
  
}
