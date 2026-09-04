import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 2499,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 3299,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'
    },
    {
      id: 3,
      name: 'Running Shoes',
      price: 1899,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'
    },
    {
      id: 4,
      name: 'Backpack',
      price: 1299,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'
    },
    {
      id: 5,
      name: 'Sunglasses',
      price: 999,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600'
    },
    {
      id: 6,
      name: 'Coffee Maker',
      price: 2799,
      category: 'Home',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600'
    }
  ];

  cart: any[] = [];
  searchText = '';
  selectedCategory = 'All';

  get filteredProducts() {
    return this.products.filter(product => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase());

      const matchesCategory =
        this.selectedCategory === 'All' ||
        product.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  addToCart(product: any) {
    const existingProduct = this.cart.find(
      item => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cart.push({
        ...product,
        quantity: 1
      });
    }
  }

  increaseQuantity(item: any) {
    item.quantity++;
  }

  decreaseQuantity(item: any) {

    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeFromCart(item);
    }
  }

  removeFromCart(item: any) {
    this.cart = this.cart.filter(
      product => product.id !== item.id
    );
  }

  get cartCount() {
    return this.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  get cartTotal() {
    return this.cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }

  formatPrice(price: number) {
    return '₹' + price.toLocaleString('en-IN');
  }
}