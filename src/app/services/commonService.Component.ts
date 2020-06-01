import { Component } from '@angular/core';
import { IFunction } from '../../interface/IFunction';
import { ToastrService } from 'ngx-toastr';

@Component({
    template: ''
})
export class CommonServiceComponent {
  constructor(private toastr: ToastrService) { }

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
public showSuccess(message,titolo){
  this.toastr.success(message,titolo)
}
public showError( message,titolo){
  this.toastr.error(message,titolo)
}
public showInfo(message,titolo){
  this.toastr.info(message,titolo)
}
public showWarning(message,titolo){
  this.toastr.warning(message,titolo)
}
}
