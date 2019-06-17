import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmService {

  public responseAction = new BehaviorSubject<string>(undefined);

  constructor() {}

  registerAction(action: string){ 
    this.responseAction.next(action);
  }

}
