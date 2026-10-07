import { TestBed } from '@angular/core/testing';
import { Theme } from './theme';

// kelompok tes untuk theme
describe('Theme', () => {
  let service: Theme; // instance service yang dites, diisi di beforeeach

  // jalan sebelum setiap tes supaya setiap tes mulai dengan service yang baru
  beforeEach(() => {
    // siapkan modul tes kosong, service ini tidak butuh deklarasi tambahan
    TestBed.configureTestingModule({});

    // minta instance service dari injector milik testbed
    service = TestBed.inject(Theme);
  });

  // tes bawaan, lulus kalau service berhasil dibuat
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
