import { Component } from '@angular/core';
import { ISetting } from 'src/interface/ISetting';

@Component({
    template: ''
})
export class CommonServiceComponent {
  constructor() { }

  public readJson(nameFile: string): Promise<ISetting[]>  {
    let promise = fetch('./assets/files/'+ nameFile + '.json')
    .then(res => {
        return res
          .json();
      })
      .catch(err => {
        //TODO: Verify if works
        return err.json();
      });
    return promise;
  }

    
}
