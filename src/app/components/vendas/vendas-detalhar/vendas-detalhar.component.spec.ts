/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VendasDetalharComponent } from './vendas-detalhar.component';

describe('VendasDetalharComponent', () => {
  let component: VendasDetalharComponent;
  let fixture: ComponentFixture<VendasDetalharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendasDetalharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendasDetalharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
