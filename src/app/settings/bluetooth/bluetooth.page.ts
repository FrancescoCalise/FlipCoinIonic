import { Component, OnInit, Input } from '@angular/core';
import { NavParams} from '@ionic/angular';
import { BluetoothServiceComponent } from 'src/app/services/bluetoothService.Component';
import { ModalServiceComponent } from 'src/app/services/modalService.Component';
import { IDevice } from 'src/interface/IDevice';

@Component({
  selector: 'app-bluetooth',
  templateUrl: 'bluetooth.page.html',
  styleUrls: ['bluetooth.page.scss']
})
export class BluetoothModal implements OnInit {
  public devices: IDevice[] = [];
  public showDevices: boolean = false;
  public isLoading: boolean = false;
  public isBluetoothEnabled: boolean = false;
  public isBluetoothDisabled: boolean = true;
  public hasFoundDevice: boolean = false;
  
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

  ngOnInit() {
    console.log("ngOnInit");
    this.bluetoothService.isEnabled()
    .then(state => {
      console.log(state);
      if (state) {
        this.isBluetoothEnabled = true;
        this.isBluetoothDisabled =false;
        this.isLoading = true;
        this.bluetoothService.searchDevices()
        .then((res: IDevice[])=>{
          this.devices = res;
          this.showDevices = true;
          this.isLoading = false;
          if(res.length > 0){
            this.hasFoundDevice =true;
          }
        })
      }
    });
  }

  ngOnAfterInit() {
    console.log(this.devices);
  }
}
