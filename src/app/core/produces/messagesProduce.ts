import {BehaviorSubject} from 'rxjs';

export class MessagesProduce {
  public static message = new BehaviorSubject<string>(undefined);

  constructor() {}

  public static publish(message: string) {
    MessagesProduce.message.next(message);
  }

}
