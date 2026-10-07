import { Service } from '@angular/core';

@Service()
export class ProductService {
  // Update: coba implementasi kategori

  kategori = [
    {
      id: 1,
      name: 'Makanan'
    },
    {
      id: 2,
      name: 'Minuman'
    },
    {
      id: 3,
      name: 'Elektronik'
    },
    {
      id: 4,
      name: 'Perabotan'
    },
    {
      id: 5,
      name: 'Alat Tulis'
    },
    {
      id: 6,
      name: 'Obat-obatan'
    }

  ];
  product = [
    // 3 produk makanan
    {
      id: 1,
      name: 'Indomie Mie Goreng',
      description: 'Mie instan goreng Indonesia.',
      stock: 45,
      sellingPrice: 3500,
      purchasePrice: 2800,
      imageUrl: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//93/MTA-2583228/indomie_indomie-goreng-mie-instan--85g--_full02.jpg',
      kategori: 1,
      quantity: 1,
      isDeleted: false,
    },
    {
      id: 2,
      name: 'Roti Aoka Rasa Coklat',
      description: 'Roti lembut isi krim coklat.',
      stock: 20,
      sellingPrice: 3000,
      purchasePrice: 2200,
      imageUrl: 'https://down-id.img.susercontent.com/file/sg-11134201-7qvf1-lghiehxa486se8',
      kategori: 1,
      quantity: 1,
      isDeleted: false,
    },
    // Case STOK KOSONG
    {
      id: 3,
      name: 'Biskuit Roma Kelapa',
      description: 'Biskuit rasa kelapa asli, cocok untuk teman teh.',
      stock: 0,
      sellingPrice: 12000,
      purchasePrice: 10500,
      imageUrl: 'https://id-live-01.slatic.net/p/8293784b0b00699ae5fd4d864fcd5fb8.jpg',
      kategori: 1,
      quantity: 1,
      isDeleted: false,
    },
    // 3 produk minuman
    {
      id: 4,
      name: 'Air Mineral Aqua 600ml',
      description: 'Air mineral dalam kemasan botol sedang.',
      stock: 60,
      sellingPrice: 3500,
      purchasePrice: 2500,
      imageUrl: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2022/9/16/f48cdf3a-697f-4b5e-aee1-02eb4690de0f.jpg.webp',
      kategori: 2,
      quantity: 1,
      isDeleted: false,
    },
    {
      id: 5,
      name: 'Teh Pucuk Harum 350ml',
      description: 'Minuman teh melati manis pelepas haus.',
      stock: 30,
      sellingPrice: 4000,
      purchasePrice: 3200,
      imageUrl: 'https://coreimages.lottemart.co.id/ord/06/1017616000',
      kategori: 2,
      quantity: 1,
      isDeleted: false,
    },
    {
      id: 6,
      name: 'Kopi Kapal Api Mix (Saset)',
      description: 'Kopi hitam bubuk saset instan dengan gula.',
      stock: 100,
      sellingPrice: 1500,
      purchasePrice: 1100,
      imageUrl: 'https://down-id.img.susercontent.com/file/7908689cc3c3e6f71a83261a9f2e6873',
      kategori: 2,
      quantity: 1,
      isDeleted: false,
    },
    // 2 kategori elektronik
    {
      id: 7,
      name: 'Baterai ABC Alkaline AA',
      description: 'Baterai ukuran AA isi 2 pcs, tahan lama.',
      stock: 24,
      sellingPrice: 16000,
      purchasePrice: 13000,
      imageUrl: 'https://media.monotaro.id/mid01/big/Kebutuhan%20Kantor/Baterai%20Kantor/Baterai%20Mangan/Mangan%20Kotak%209V/ABC%20(Battery)%20Alkaline%20Battery%20AA%20(Baterai%20AA)/P102267219-4.jpg',
      kategori: 3,
      quantity: 1,
      isDeleted: false,
    },
    {
      id: 8,
      name: 'Lampu LED Philips 8 Watt',
      description: 'Lampu hemat energi warna putih terang.',
      stock: 12,
      sellingPrice: 35000,
      purchasePrice: 30000,
      imageUrl: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2021/7/27/af150a3f-e073-4d03-a23e-574bda41b922.jpg.webp',
      kategori: 3,
      quantity: 1,
      isDeleted: false,
    },
    // 2 kategori perabotan/rumah tangga
    {
      id: 9,
      name: 'Laci Plastik Mini 3 Susun',
      description: 'Laci laci kecil berbahan plastik, cocok untuk menyimpan pernak-pernik, obat, atau alat tulis. ',
      stock: 6,
      sellingPrice: 45000,
      purchasePrice: 35000,
      imageUrl: 'https://www.agencontainer.co.id/assets/uploads/1748766455_564574625751fb886cfb.jpg',
      kategori: 4,
      quantity: 1,
      isDeleted: false,
    },
    {
      id: 10,
      name: 'Sapu Ijuk Lantai',
      description: 'Sapu ijuk lantai rumah kuat dan awet.',
      stock: 8,
      sellingPrice: 20000,
      purchasePrice: 15000,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTriiir7A61zHUObKAXac6QUKqeLk1hfdyHypvz0HPRO4U1U0HQEmsuH0&s=10',
      kategori: 4,
      quantity: 1,
      isDeleted: false,
    },
    // 2 kategori alat tulis
    {
      id: 11,
      name: 'Buku Tulis Sinar Dunia 38 Lembar',
      description: 'Satu buah buku tulis anak sekolah isi 38 lembar bergaris.',
      stock: 40,
      sellingPrice: 4500,
      purchasePrice: 3500,
      imageUrl: 'https://siplah.blibli.com/data/images/SSFD-0001-00017/5a461ff5-3fe7-4a50-b4d0-3defcccc737d.jpg',
      kategori: 5,
      quantity: 1,
      isDeleted: false,
    },
    {
      id: 12,
      name: 'Pulpen Standard AE7 Hitam',
      description: 'Bolpoin hitam lancar dan tidak mudah macet.',
      stock: 50,
      sellingPrice: 2000,
      purchasePrice: 1200,
      imageUrl: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-2678527/standard_standard-pen-ae7-ballpoint---black--0-5-mm--12-pcs--1-pack-_full03.jpg',
      kategori: 5,
      quantity: 1,
      isDeleted: false,
    },
    // 2 kategori obat
    {
      id: 13,
      name: 'Tolak Angin Cair Saset',
      description: 'Obat herbal cair untuk meredakan masuk angin.',
      stock: 35,
      sellingPrice: 4500,
      purchasePrice: 3800,
      imageUrl: 'https://www.mandjur.co.id/cdn/shop/files/sachet.webp?v=1785923367',
      kategori: 6,
      quantity: 1,
      isDeleted: false,
    },
    {
      id: 14,
      name: 'Obat Sakit Kepala Paramex',
      description: 'Satu strip obat pereda sakit kepala isi 4 tablet.',
      stock: 20,
      sellingPrice: 3000,
      purchasePrice: 2200,
      imageUrl: 'https://www.mandjur.co.id/cdn/shop/files/Paramex-kemasan.webp?v=1785309166',
      kategori: 6,
      quantity: 1,
      isDeleted: false,
    }
  ];


  getLastProductId(): number {
    if (this.product.length === 0) {
      return 0; // Jika tidak ada produk, kembalikan 0 sebagai ID terakhir
    }
    return this.product[this.product.length - 1].id;
  }

  addProduct(
    p_name: string,
    p_description: string,
    p_stock: number,
    p_sellingPrice: number,
    p_purchasePrice: number,
    p_imageUrl: string,
    p_kategori: number
  ) {
    this.product.push({
      id: this.getLastProductId() + 1,
      name: p_name,
      description: p_description,
      stock: p_stock,
      sellingPrice: p_sellingPrice,
      purchasePrice: p_purchasePrice,
      imageUrl: p_imageUrl,
      kategori: p_kategori,
      isDeleted: false,
      quantity: 1,
    });
    alert('Data Berhasil Disimpan!');
  }

  getNotDeletedProductCount(): number {
    let count = 0;
    for (let i = 0; i < this.product.length; i++) {
      if (this.product[i].isDeleted === false) {
        count++;
      }
    }
    return count;
  }

  // getNotDeletedProductList(): any[] {
  //   let notDeletedProducts: any[] = [];
  //   for (let i = 0; i < this.product.length; i++) {
  //     if (this.product[i].isDeleted === false) {
  //       notDeletedProducts.push(this.product[i]);
  //     }
  //   }
  //   return notDeletedProducts;
  // }

  // Andrea add method get product berdasarkan id
  getProductById(id: number) {
    for (let i in this.product) {
      if (this.product[i].id == id) {
        return this.product[i];
      }
    }
    return null;
  }

  updateProduct(
    id: number,
    p_name: string,
    p_description: string,
    p_stock: number,
    p_sellingPrice: number,
    p_purchasePrice: number,
    p_imageUrl: string,
    p_kategori: number
  ) {
    for (let i = 0; i < this.product.length; i++) {
      if (this.product[i].id == id) {
        this.product[i].name = p_name;
        this.product[i].description = p_description;
        this.product[i].stock = p_stock;
        this.product[i].sellingPrice = p_sellingPrice;
        this.product[i].purchasePrice = p_purchasePrice;
        this.product[i].imageUrl = p_imageUrl;
        this.product[i].kategori = p_kategori;
        break;
      }
    }
    alert('Data Berhasil Diperbarui!');
  }

  searchProduct(searchQuery: string): any[] {
    let tempProducts: any[] = [];
    const regexCari = new RegExp(searchQuery, 'i');
    for (let product of this.product) {
      if (regexCari.test(product.name)) {
        tempProducts.push(product);
      }
    }
    return tempProducts;
  }

  deleteProduct(id: number) {
    for (let i = 0; i < this.product.length; i++) {
      if (this.product[i].id == id) {
        this.product[i].isDeleted = true;
        break;
      }
    }
    alert('Data Berhasil Dihapus!');
  }

  getCategoryNameById(id: number): string {
    for (let i = 0; i < this.kategori.length; i++) {
      if (this.kategori[i].id == id) {
        return this.kategori[i].name;
      }
    }
    return '';
  }
}
