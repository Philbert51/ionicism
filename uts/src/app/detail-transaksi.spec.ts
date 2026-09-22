import { TestBed } from '@angular/core/testing';
import { DetailTransaksi } from './detail-transaksi';

describe('DetailTransaksi', () => {
  let service: DetailTransaksi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailTransaksi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
