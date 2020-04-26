import { Component, OnInit, Input } from '@angular/core';
import { NavParams} from '@ionic/angular';
import { BluetoothServiceComponent } from '../../services/bluetoothService.Component';
import { ModalServiceComponent } from '../../services/modalService.Component'
import { IDevice } from '../../../interface/IDevice';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

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
    private splashScreen: SplashScreen,
    public modalService: ModalServiceComponent,
    private navParams: NavParams,
    public bluetoothService: BluetoothServiceComponent,
  ) {
  }

  ngOnInit() {
    this.splashScreen.show();
    console.log("ngOnInit");
    this.bluetoothService.isEnabled()
    .then(state => {
      if (state) {
        this.isBluetoothEnabled = true;
        this.isBluetoothDisabled = false;
        this.isLoading = true;
        this.bluetoothService.searchDevices()
        .then((res: IDevice[])=>{
          this.devices = res;
          this.showDevices = true;
          this.isLoading = false; 
          this.splashScreen.hide()
          if(res.length > 0){
            this.hasFoundDevice =true;
          }
        })
      }
      else{
        this.splashScreen.hide()
      }
      
    });
  }

  ngOnAfterInit() {
    console.log(this.devices);
  }
}
