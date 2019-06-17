import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SegUsuarioModel} from '../../shared/models/seg-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<SegUsuarioModel>;
  public currentUser: Observable<SegUsuarioModel>;

  constructor() {
    
  }

}
