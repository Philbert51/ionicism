import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailProductPage } from './detail-product.page';

// kelompok tes untuk halaman detail produk
describe('DetailProductPage', () => {
  let component: DetailProductPage; // instance halaman yang dites, diisi di beforeeach
  let fixture: ComponentFixture<DetailProductPage>; // pembungkus tes yang memegang komponen dan elemen htmlnya, diisi di beforeeach

  // jalan sebelum setiap tes supaya setiap tes mulai dengan komponen yang baru
  beforeEach(() => {
    // buat komponen halaman di lingkungan tes
    fixture = TestBed.createComponent(DetailProductPage);

    // ambil instance kelas halaman dari fixture
    component = fixture.componentInstance;

    // jalankan deteksi perubahan sekali supaya ngoninit dan template ikut diproses
    fixture.detectChanges();
  });

  // tes bawaan, lulus kalau komponen berhasil dibuat
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
