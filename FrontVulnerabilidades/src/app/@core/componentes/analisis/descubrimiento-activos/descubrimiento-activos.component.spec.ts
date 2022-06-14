import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescubrimientoActivosComponent } from './descubrimiento-activos.component';

describe('DescubrimientoActivosComponent', () => {
  let component: DescubrimientoActivosComponent;
  let fixture: ComponentFixture<DescubrimientoActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescubrimientoActivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescubrimientoActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
