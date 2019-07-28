import {FormBuilder} from '@angular/forms';
import {DialogConfirmService} from '../components/dialog-confirm/dialog-confirm.service';
import {DialogConfirmComponent} from '../components/dialog-confirm/dialog-confirm.component';
import {AbstractModel} from '../models/abstract-model';
import {ElementRef, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ServiceApiBase} from './service-api-base';
import {FormApiBase} from './form-api-base';
import {MessagesProduce} from '../../core/produces/messagesProduce';

declare var $: any;

export abstract class ListBase<T extends AbstractModel, S extends ServiceApiBase<T>> extends FormApiBase<T, S> {

  listData: MatTableDataSource<T>;
  displayedColumns: Array<string>;
  selection: SelectionModel<T> = new SelectionModel<T>(true, []);

  pageSizeOptions: Array<number>;
  totalElements: number;
  currentPage: number;
  pageSize: number;
  loadDataSource: boolean = true;
  serviceParent: S;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('dataTable', {read: ElementRef}) table: ElementRef;

  dataTable: any;
  dtOptions: any;


  constructor(service: S,
              private dialog: MatDialog,
              private dialogConfirmService: DialogConfirmService,
              formBuilder: FormBuilder,
              router: Router,
              location: Location,
              route: ActivatedRoute) {
    super(formBuilder,
      service,
      router,
      location,
      route);
    this.serviceParent = service;
    this.receiverActionConfirm();
  }

  public afterOnInit(): void {
    this.dtOptions = {
      ajax: {
        url: 'http://localhost:8080/intelector/api/oper',
        headers: {
          'Authorization': 'Bearer b9a52e70-6105-4a13-9af9-6e90bc94a96e'
        },
        type: 'GET',
        data: {
          'page': 0,
          'count': '5',
          'nome': 'null'
        }
      },
      columns: [
        {
          title: 'Nome',
          data: 'nome'
        },
        {
          title: 'Sigla',
          data: 'sigla'
        }
      ],
      dom: 'Bfrtip',
      buttons: [
       'csv', 'excel', 'pdf'
      ]
    };
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);
  }

  public abstract getFieldFilter(): Array<string>;

  public abstract getFieldColumns(): Array<string>;

  private receiverActionConfirm() {
    this.dialogConfirmService.responseAction.subscribe(resp => {
      if (resp !== undefined) {
        this[resp]();
      }
    });
  }

  public initTableDataSource(): void {
    this.displayedColumns = this.getFieldColumns();
    this.setTranslate();
    this.setPageSizeOptions();
  }

  ngAfterViewInit(): void {
    this.list();
  }

  public setDataSource(listData: Array<T>, totalElements: number) {
    this.listData = new MatTableDataSource(listData);
    this.selection = new SelectionModel<T>(true, []);
    this.listData.sort = this.sort;
    this.totalElements = totalElements;
    this.currentPage = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
  }

  public applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();

    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listData.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.listData.data.forEach(row => this.selection.select(row));
  }

  public setTranslate() {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página:';
  }

  public setPageSizeOptions(): void {
    this.pageSizeOptions = [5, 10, 30, 70, 100];
  }

  public list() {
    const filter: Array<string> = new Array<string>();
    this.getFieldFilter().forEach(e => {
      filter[e] = this.getForm().get(e).value;
    });
    this.serviceParent.getlist(filter, this.paginator.pageIndex, this.paginator.pageSize)
      .subscribe(
        responseData => {
          this.setDataSource(responseData['content'], responseData['totalElements']);
          this.hideProgressDataSource();
        },
        error => this.handleErrorBaseList(error)
      );
  }

  public submit(): boolean {
    this.list();
    return true;
  }

  public showProgressDataSource() {
    this.loadDataSource = true;
  }

  public hideProgressDataSource() {
    setTimeout(() => {
      this.loadDataSource = false;
    }, 400);
  }

  public onPaginateChange(event: PageEvent) {
    this.showProgressDataSource();
    this.list();
  }

  public reciverAction(action: string) {
    switch (action) {
      case 'LIMPAR':
        this.onLimpar();
        break;
      case 'EXCLUIR':
        this.onExcluir();
        break;
      default:
        this.customAction(action);
        break;
    }
  }

  public customAction(action: string) {
    throw new Error(`To execute the action ${action}, override the 'customAction' method in your ${this.getClassChild()}`);
  }

  public onBuscar() {
    if (this.isFormValid()) {
      this.showProgressDataSource();
      this.onSubmit();
    }
  }

  public onLimpar() {
    this.showProgressDataSource();
    this.onReset();
    this.list();
  }

  public onExcluirConfirmed() {
    this.showProgressDataSource();
    try {
      this.selection.selected.forEach(item => {
        if (item !== undefined) {
          this.serviceParent.delete(item.id)
            .subscribe(
              response => {
                MessagesProduce.publish('Operação realizada com sucesso!');
                this.list();
              },
              error => this.handleErrorBaseList(error)
            );
        } else {
          this.hideProgressDataSource();
        }
      });
    } catch (e) {
      this.handleErrorBaseList(e);
    }
  }

  public onExcluir() {
    this.dialog.open(DialogConfirmComponent, {
      data: {
        message: 'Deseja realmente excluir esse(s) item(s)?',
        action: 'onExcluirConfirmed'
      }
    });
  }

  public getClassChild(): string {
    const object = Object.getPrototypeOf(this);
    return object.constructor.name;
  }

  public handleErrorBaseList(e: Error) {
    this.hideProgressDataSource();
  }

}
