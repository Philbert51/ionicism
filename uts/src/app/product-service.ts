import { Service } from '@angular/core';

@Service()
export class ProductService {
    product = [{
        id: 1,
        name: 'NVIDIA GeForce RTX 3080',
        description: 'Kartu grafis high-end untuk gaming dan rendering.',
        stock: 10,
        sellingPrice: 699.99,
        purchasePrice: 499.99,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs0J8EDGsqxeAME7LxeldTY9ZRKbXOnRdcgyC_YwKRsw&s=10',
        quantity: 1
    },
    {
        id: 2,
        name: 'AMD Radeon RX 7900 XTX',
        description: 'Kartu grafis high-end untuk gaming dan rendering.',
        stock: 15,
        sellingPrice: 799.99,
        purchasePrice: 599.99,
        imageUrl: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/110/MTA-167369951/br-m036969-00220_vga-asus-amd-radeon-rx-7900-xtx-tuf-gaming-oc-24gb-gddr6_full05-8616462f.jpg',
        quantity: 1
    }, {
        id: 3,
        name: 'Intel Core i9-13900K',
        description: 'Prosesor high-end untuk gaming dan produktivitas.',
        stock: 20,
        sellingPrice: 599.99,
        purchasePrice: 399.99,
        imageUrl: 'https://kkomputer.com/7074/intel-core-i9-13900k-58-ghz-24c32t-lga-1700-rl.jpg',
        quantity: 1
    }
    ]

    addProduct(p_name: string, p_description: string, p_stock: number, p_sellingPrice: number, p_purchasePrice: number, p_imageUrl: string) {
        this.product.push({
            id: this.product.length + 1,
            name: p_name,
            description: p_description,
            stock: p_stock,
            sellingPrice: p_sellingPrice,
            purchasePrice: p_purchasePrice,
            imageUrl: p_imageUrl,
            quantity: 1
        });
    }

    // Andrea add method get product berdasarkan id
    getProductById(id:number){
        for (let i in this.product){
            if (this.product[i].id == id){
                return this.product[i];
            }
        }
        return null;
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
}
