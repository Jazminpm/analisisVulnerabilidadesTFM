import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscanerPuertosComponent } from './escaner-puertos.component';

describe('EscanerPuertosComponent', () => {
  let component: EscanerPuertosComponent;
  let fixture: ComponentFixture<EscanerPuertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscanerPuertosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscanerPuertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
