import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-notify-message',
  templateUrl: './notify-message.component.html',
  styleUrls: ['./notify-message.component.scss']
})
export class NotifyMessageComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<NotifyMessageComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  private messages: string[];
  private messageClass: string;

  ngOnInit() {
    this.messages = this.data['message'].split(';');
    this.messageClass = this.data['type'];
  }

  onClose(){
    this.snackBarRef.dismiss();
  }

}
