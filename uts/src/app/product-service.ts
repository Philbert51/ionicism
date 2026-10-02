import { Service } from '@angular/core';

@Service()
export class ProductService {
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
    },
    {
      id: 4,
      name: 'Makanan Kecil',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
    },
    {
      id: 5,
      name: 'Makanan Kecil',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
    },
    {
      id: 6,
      name: 'Makanan Kecil',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
    },
    {
      id: 7,
      name: 'Makanan Kecil',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
    },
    {
      id: 8,
      name: 'Makanan Kecil',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
    },
    {
      id: 9,
      name: 'Makanan Kecil',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
    },
    {
      id: 10,
      name: 'Makanan Kecil',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
    },
    {
      id: 11,
      name: 'Makanan Kecil',
      description: 'Makanan kecil untuk camilan.',
      stock: 50,
      sellingPrice: 2.99,
      purchasePrice: 1.99,
      imageUrl: '',
    },
  ];

  addProduct(
    p_name: string,
    p_description: string,
    p_stock: number,
    p_sellingPrice: number,
    p_purchasePrice: number,
    p_imageUrl: string,
  ) {
    this.product.push({
      id: this.product.length + 1,
      name: p_name,
      description: p_description,
      stock: p_stock,
      sellingPrice: p_sellingPrice,
      purchasePrice: p_purchasePrice,
      imageUrl: p_imageUrl,
    });
    alert('Data Berhasil Disimpan!');
  }

  getProductById(id: number) {
    for (let i = 0; i < this.product.length; i++) {
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
  ) {
    for (let i = 0; i < this.product.length; i++) {
      if (this.product[i].id == id) {
        this.product[i].name = p_name;
        this.product[i].description = p_description;
        this.product[i].stock = p_stock;
        this.product[i].sellingPrice = p_sellingPrice;
        this.product[i].purchasePrice = p_purchasePrice;
        this.product[i].imageUrl = p_imageUrl;
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

  deleteProduct(id: number){
    for (let i = 0; i < this.product.length; i++) {
      if (this.product[i].id == id) {
        this.product.splice(i, 1);
        break;
      }
    }
    alert('Data Berhasil Dihapus!');
  }
}
