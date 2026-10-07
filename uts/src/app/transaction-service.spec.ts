import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction-service';

// kelompok tes untuk transactionservice
describe('TransactionService', () => {
  let service: TransactionService; // instance service yang dites, diisi di beforeeach

  // jalan sebelum setiap tes supaya setiap tes mulai dengan service yang baru
  beforeEach(() => {
    // siapkan modul tes kosong, service ini tidak butuh deklarasi tambahan
    TestBed.configureTestingModule({});

    // minta instance service dari injector milik testbed
    service = TestBed.inject(TransactionService);
  });

  // tes bawaan, lulus kalau service berhasil dibuat
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
