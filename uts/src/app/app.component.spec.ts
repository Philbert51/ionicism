import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

// kelompok tes untuk komponen utama aplikasi
describe('AppComponent', () => {

  // jalan sebelum setiap tes, async karena compilecomponents mengembalikan promise yang harus ditunggu
  beforeEach(async () => {
    // siapkan modul tes dengan komponen utama, lalu kompilasi templatenya
    await TestBed.configureTestingModule({
      // komponen utama didaftarkan ke modul tes
      declarations: [AppComponent],

      // custom elements schema membuat angular mengabaikan elemen asing seperti tag ionic, jadi tidak ada error elemen tidak dikenal
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  // tes bawaan, lulus kalau komponen utama berhasil dibuat
  it('should create the app', () => {
    // buat komponen utama lalu ambil instance kelasnya
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
