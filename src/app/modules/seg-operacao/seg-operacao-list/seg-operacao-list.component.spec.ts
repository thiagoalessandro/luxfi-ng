import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegOperacaoListComponent } from './seg-operacao-list.component';

describe('SegOperacaoListComponent', () => {
  let component: SegOperacaoListComponent;
  let fixture: ComponentFixture<SegOperacaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegOperacaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegOperacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
