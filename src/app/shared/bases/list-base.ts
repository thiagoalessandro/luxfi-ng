import { FormBuilder } from '@angular/forms';
import { DialogConfirmService } from '../components/dialog-confirm/dialog-confirm.service';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm.component';
import { AbstractModel } from '../models/abstract-model';
import { ServiceBase } from 'src/app/shared/bases/service-base';
import { ViewChild, Component, EventEmitter, Output, AfterViewInit, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent, MatDialog, MatSnackBar } from '@angular/material';
import { FormBase } from './form-base';
import { Router } from '@angular/router';

export abstract class ListBase<T extends AbstractModel, S extends ServiceBase<T>> extends FormBase<T, S> implements AfterViewInit{

    listData: MatTableDataSource<T>;
    displayedColumns: Array<string>;
    selection: SelectionModel<T> = new SelectionModel<T>(true, []);;
    pageSizeOptions: Array<number>;
    totalElements: number;
    currentPage: number;  
    pageSize: number;    
    loadDataSource: boolean = true;
    serviceParent: S;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(service: S, 
                private dialog: MatDialog,
                private dialogConfirmService: DialogConfirmService,        
                snackBar: MatSnackBar,
                formBuilder: FormBuilder,
                router: Router) { 
        super(snackBar, 
              formBuilder, 
              service, 
              router);
        this.serviceParent = service;
        this.receiverActionConfirm();    
    } 

    public abstract getFieldFilter(): Array<string>;

    public abstract getFieldColumns(): Array<string>;

    private receiverActionConfirm(){
        this.dialogConfirmService.responseAction.subscribe(resp => {
            if(resp != undefined){
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

    public setTranslate(){
        this.paginator._intl.itemsPerPageLabel = 'Itens por página:';
    }

    public setPageSizeOptions(): void{
        this.pageSizeOptions = [5, 10, 30, 70, 100];
    }

    public list(){    
        let filter = Array<string>();
        this.getFieldFilter().forEach(e => {
            filter[e] = this.form.get(e).value;
        });
        this.serviceParent.getlist(filter, this.paginator.pageIndex, this.paginator.pageSize)
        .then(data => {      
            this.setDataSource(data['content'], data['totalElements']);
            this.hideProgressDataSource();
        }).catch((e) => this.handleErrorBaseList(e));
    }   

    public submit(): boolean{
        this.list(); 
        return true; 
    }

    public showProgressDataSource(){
        this.loadDataSource = true;
    }

    public hideProgressDataSource(){
        setTimeout(() => { 
            this.loadDataSource = false;
        }, 400);        
    }

    public onPaginateChange(event: PageEvent){
        this.showProgressDataSource();
        this.list();
    }

    public reciverAction(action: string){
        switch (action) {
            case "LIMPAR":
                this.onLimpar();
            break;
            case "BUSCAR":                           
                this.onBuscar();
            break;
            case "EXCLUIR":                           
                this.onExcluir();
            break;        
            default:    
                this.customAction(action);            
            break;
        }
    }

    public customAction(action: string){
        throw new Error(`To execute the action ${action}, override the 'customAction' method in your ${this.getClassChild()}`);
    }

    public onBuscar(){
        if(this.isFormValid()){
            this.showProgressDataSource();
            this.onSubmit();
        }
    }

    public onLimpar(){
        this.showProgressDataSource();
        this.onReset();
        this.list();
    }

    public onExcluirConfirmed(){
        this.showProgressDataSource(); 
        try {
            this.selection.selected.forEach(item => {
                if(item !== undefined){
                    this.serviceParent.delete(item.id).then(response => {
                        this.list();
                    }).catch((e) => this.handleErrorBaseList(e));
                }else{
                    this.hideProgressDataSource();
                }
            });
        } catch (e) {
            this.handleErrorBaseList(e);
        }        
    }

    public onExcluir(){
        this.dialog.open(DialogConfirmComponent, {
            data: {
                message: 'Deseja realmente excluir esse(s) item(s)?', 
                action: 'onExcluirConfirmed'
            }
            });
    }

    public getClassChild(): string{
        var object = Object.getPrototypeOf(this);
        return object.constructor.name;
    }

    public handleErrorBaseList(e: Error){                 
        super.handleError(e);
        this.hideProgressDataSource();
    }

}