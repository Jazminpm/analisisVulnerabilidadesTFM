import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscanerSistemaOperativoComponent } from './escaner-sistema-operativo.component';

describe('EscanerSistemaOperativoComponent', () => {
  let component: EscanerSistemaOperativoComponent;
  let fixture: ComponentFixture<EscanerSistemaOperativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscanerSistemaOperativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscanerSistemaOperativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
