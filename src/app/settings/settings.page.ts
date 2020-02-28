import { Component, OnInit } from '@angular/core';
import { CommonServiceComponent } from '../services/commonService.Component';
import { ISetting } from 'src/interface/ISetting';
import { ModalServiceComponent } from '../services/modalService.Component';
import { IFunction } from 'src/interface/IFunction';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {
  nameFile:string ='settings';
  public settings: IFunction[];

  constructor(
    public modalService: ModalServiceComponent,
    public commonSerivce: CommonServiceComponent
  ){}

  ngOnInit(){
    this.commonSerivce.readJson(this.nameFile).then(settings => {
      this.settings = settings
    });
  }

}
