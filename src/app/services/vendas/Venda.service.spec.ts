/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VendaService } from './Venda.service';

describe('Service: Venda', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendaService]
    });
  });

  it('should ...', inject([VendaService], (service: VendaService) => {
    expect(service).toBeTruthy();
  }));
});
