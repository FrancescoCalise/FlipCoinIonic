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
public message:string ="1,6;"
nameFile = 'typeDices';
public showInputQuantity :boolean =false;
public dicesSelected:ITypeDice[] = [];
public typeDices: ITypeDice[];

  constructor(
    public modalService: ModalServiceComponent,
    public bluetoothService: BluetoothServiceComponent,
    public commonSerivce: CommonServiceComponent
  ) { }

  ngOnInit() {
    this.commonSerivce.readJson(this.nameFile).then(dices => {
      this.typeDices = dices;
    });
   this.bluetoothService.sendMessageToBluetooth(this.message)
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
    console.log("troppo grande uagliu")
  }
  else{
    for(let x=0;x<dices.length;x++){
 
     this.message =dices[x].value+","+dices[x].quantity+";"
   
       console.log(sommaTotale)
     }
  
  }

  }
  //che se la moltiplicazione tra quantita e valore del dado  sommati danno + di 999 deve cambiare


}
