import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderPage } from './order.page';

// kelompok tes untuk halaman order
describe('OrderPage', () => {
  let component: OrderPage; // instance halaman yang dites, diisi di beforeeach
  let fixture: ComponentFixture<OrderPage>; // pembungkus tes yang memegang komponen dan elemen htmlnya, diisi di beforeeach

  // jalan sebelum setiap tes supaya setiap tes mulai dengan komponen yang baru
  beforeEach(() => {
    // buat komponen halaman di lingkungan tes
    fixture = TestBed.createComponent(OrderPage);

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
