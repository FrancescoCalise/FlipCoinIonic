import { Component } from '@angular/core';
import { IFunction } from 'src/interface/IFunction';

@Component({
    template: ''
})
export class CommonServiceComponent {
  constructor() { }

  public readJson(nameFile: string): Promise<IFunction[]>  {
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
