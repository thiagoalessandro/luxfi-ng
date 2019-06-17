import { DialogConfirmService } from './dialog-confirm.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  private message: string;
  private action: string;

  constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>,
              public dialogConfirmService: DialogConfirmService,
              @Inject(MAT_DIALOG_DATA) private data: string[]) {}

  ngOnInit() {
    this.message = this.data['message'];
    this.action = this.data['action'];
  }

  onConfirm(){
    this.dialogRef.close();
    this.dialogConfirmService.registerAction(this.action);
  }

}
