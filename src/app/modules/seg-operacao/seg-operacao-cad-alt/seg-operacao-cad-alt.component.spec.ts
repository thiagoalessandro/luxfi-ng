import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SegOperacaoCadAltComponent } from './seg-operacao-cad-alt.component';


describe('SegOperacaoComponent', () => {
  let component: SegOperacaoCadAltComponent;
  let fixture: ComponentFixture<SegOperacaoCadAltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegOperacaoCadAltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegOperacaoCadAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
