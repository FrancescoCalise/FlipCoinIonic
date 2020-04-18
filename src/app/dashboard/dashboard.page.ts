import { Component, OnInit } from '@angular/core';
import { ModalServiceComponent } from '../services/modalService.Component';
import { CommonServiceComponent } from '../services/commonService.Component';
import { IFunction } from 'src/interface/IFunction';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  nameFile = 'functions';
  public functions: IFunction[];

  constructor(
    public modalService: ModalServiceComponent,
    public commonSerivce: CommonServiceComponent
  ) {

  }
  ngOnInit() {
    this.commonSerivce.readJson(this.nameFile).then(funs => {
      this.functions = funs;
    });
  }

}
