import { Service } from '@angular/core';

// menyimpan pilihan tema, dipakai bersama oleh halaman pengaturan dan komponen utama
@Service()
export class Theme {
    public isDark : boolean = true; // true berarti mode gelap aktif, defaultnya gelap
}
