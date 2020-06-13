import { Component, OnInit } from '@angular/core';
import { ModalServiceComponent } from '../../services/modalService.Component';
import { BluetoothServiceComponent } from '../../services/bluetoothService.Component';
import { ITypeDice } from '../../../interface/ITypeDice'
import { CommonServiceComponent } from '../../services/commonService.Component';


@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
})
export class RandomComponent implements OnInit {
public message:string =""
nameFile = 'typeDices';
public showInputQuantity :boolean =false;
public dicesSelected:ITypeDice[] = [];
public typeDices: ITypeDice[];
public dadiCorretti:boolean=false;
  constructor(
    public modalService: ModalServiceComponent,
    public bluetoothService: BluetoothServiceComponent,
    public commonSerivce: CommonServiceComponent
  ) { }

  ngOnInit() {
    this.commonSerivce.readJson(this.nameFile).then(dices => {
      this.typeDices = dices;
    });
   
  }

 async onSelected(value){

  await value.forEach(element => {
    let x = this.typeDices.find(f => f.value == element);
   
    this.dicesSelected.push(x);
    
  });

  if(this.dicesSelected.length > 0){
    this.showInputQuantity = true;
  }


}
async onChange(value:string,dices){

  this.dicesSelected.find(f => f.value == dices.value).quantity =parseInt(value);



}
cleanSerial(){
  this.message=""
  this.bluetoothService.sendMessageToBluetooth(this.message);
}
onSubmit(dices){
  let sommaTotale=0
 console.log(dices)
 console.log(dices.length)
 
  for(let x=0;x<dices.length;x++){
 
   sommaTotale=dices[x].value*dices[x].quantity +sommaTotale 

    console.log(sommaTotale)
  }
  if(sommaTotale>999)
  {
    this.commonSerivce.showError("La somma dei dadi è troppo grande","Dadi")
  }
  else{
if (dices.length==0){
  this.commonSerivce.showError("Le quantità devono essere riempite", "Dadi")

}else{
    for(let x=0;x<dices.length;x++){
      if(dices[x].quantity==undefined ){
        this.commonSerivce.showError("Le quantità del "+dices[x].name+" deve essere riempita", "Dadi")
      }else{
        this.dadiCorretti=true;
        this.message =dices[x].quantity+","+dices[x].value+";"+this.message

      }
 }
     }
     if(this.dadiCorretti){
     this.bluetoothService.sendMessageToBluetooth(this.message)
     console.log(this.message)
  this.message=""
     }
  }
}
}
