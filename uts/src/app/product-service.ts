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
    {
      id: 1,
      name: 'NVIDIA GeForce RTX 3080',
      description: 'Kartu grafis high-end untuk gaming dan rendering.',
      stock: 10,
      sellingPrice: 699.99,
      purchasePrice: 499.99,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs0J8EDGsqxeAME7LxeldTY9ZRKbXOnRdcgyC_YwKRsw&s=10',
      kategori: 3,
      quantity: 1,
    },
    {
      id: 2,
      name: 'AMD Radeon RX 7900 XTX',
      description: 'Kartu grafis high-end untuk gaming dan rendering.',
      stock: 15,
      sellingPrice: 799.99,
      purchasePrice: 599.99,
      imageUrl:
        'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/110/MTA-167369951/br-m036969-00220_vga-asus-amd-radeon-rx-7900-xtx-tuf-gaming-oc-24gb-gddr6_full05-8616462f.jpg',
      kategori: 3,
      quantity: 1,
    },
    {
      id: 3,
      name: 'Intel Core i9-13900K',
      description: 'Prosesor high-end untuk gaming dan produktivitas.',
      stock: 20,
      sellingPrice: 599.99,
      purchasePrice: 399.99,
      imageUrl:
        'https://kkomputer.com/7074/intel-core-i9-13900k-58-ghz-24c32t-lga-1700-rl.jpg',
      kategori: 3,
      quantity: 1,
    },
    {
      id: 4,
      name: 'Makanan Kecil',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
      kategori: 1,
      quantity: 1,
    },
    {
      id: 5,
      name: 'Makanan Kecil 2',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
      kategori: 1,
      quantity: 1,
    },
    {
      id: 6,
      name: 'Makanan Kecil 3',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
      kategori: 1,
      quantity: 1,
    },
    {
      id: 7,
      name: 'Makanan Kecil 4',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
      kategori: 1,
      quantity: 1,
    },
    {
      id: 8,
      name: 'Makanan Kecil 5',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
      kategori: 1,
      quantity: 1,
    },
    {
      id: 9,
      name: 'Makanan Kecil 6',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
      kategori: 1,
      quantity: 1,
    },
    {
      id: 10,
      name: 'Makanan Kecil 7',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
      kategori: 1,
      quantity: 1,
    },
    {
      id: 11,
      name: 'Makanan Kecil 8',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
      kategori: 1,
      quantity: 1,
    },
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
      quantity: 1,
    });
    alert('Data Berhasil Disimpan!');
  }

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
        this.product.splice(i, 1);
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
