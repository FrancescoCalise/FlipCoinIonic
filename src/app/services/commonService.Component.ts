import { Component } from '@angular/core';
import { IFunction } from '../../interface/IFunction';

@Component({
    template: ''
})
export class CommonServiceComponent {
  constructor() { }

  public readJson(nameFile: string): Promise<any>  {
    const promise = fetch('./assets/files/' + nameFile + '.json')
    .then(res => {
        return res
          .json();
      })
      .catch(err => {
        // TODO: Verify if works
        return err.json();
      });
    return promise;
  }
}
