import { BreadCrumb } from '../models/binding/breadcrumb';
import { RequestErrorException } from '../exceptions/request-error-exception';
import { MatSnackBar } from '@angular/material';
import { NotifyMessageComponent } from '../components/notify-message/notify-message.component';

export abstract class CommomBase{
       
    private snackBar: MatSnackBar;

    breadCrumb: BreadCrumb = new BreadCrumb();

    constructor(snackBar: MatSnackBar){
        this.snackBar = snackBar;
    }

    private openSnackBar(text: string) {
        this.snackBar.openFromComponent(NotifyMessageComponent, {
            data: {
                  message: text, 
                  type: 'error'
                }
        });
    }

    handleError(e: Error){                 
        if(e instanceof RequestErrorException){
            this.openSnackBar(e.message)
            console.log('Erro do tipo RequestErrorException: '+e);
        }else{
            if(e instanceof Error){
                this.openSnackBar(e.message)
                console.log('Erro do tipo Error: '+e);
            }
        }
    }

    public receiverBreadcrumb(breadCrumb: BreadCrumb){
        this.breadCrumb = breadCrumb;
    }

}