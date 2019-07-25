import {SideNavComponent} from './core/side-nav/side-nav.component';
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {NotifyMessageComponent} from './shared/components/notify-message/notify-message.component';
import {MessagesProduce} from './core/produces/messagesProduce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  @ViewChild(SideNavComponent)
  sideNavComponent: SideNavComponent;

  ngOnInit(): void {
  }

  constructor(private snackBar: MatSnackBar) {
    MessagesProduce.message.subscribe(message => this.openSnackBar(message));
  }

  private openSnackBar(text: string) {
    if (text !== undefined) {
      this.snackBar.openFromComponent(NotifyMessageComponent, {
        data: {
          message: text,
          type: 'error'
        }
      });
    }
  }
}
