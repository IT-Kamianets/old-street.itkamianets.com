import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MENU_DATA } from './menu-data.const';
import { MenuItem } from '../../interfaces/menu-item.interface';

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  public menuItems = signal<MenuItem[]>(MENU_DATA);
  public expandedCategories = signal<Set<string>>(new Set());
  
  public cart = signal<CartItem[]>([]);
  public isCartModalOpen = signal<boolean>(false);

  public cartCount = computed(() => this.cart().reduce((acc, item) => acc + item.quantity, 0));
  public cartTotal = computed(() => this.cart().reduce((acc, item) => acc + (item.menuItem.price * item.quantity), 0));

  public groupedMenu = computed<MenuCategory[]>(() => {
    const items = this.menuItems();
    const categoriesMap = new Map<string, MenuItem[]>();

    items.forEach(item => {
      if (!categoriesMap.has(item.category)) {
        categoriesMap.set(item.category, []);
      }
      categoriesMap.get(item.category)!.push(item);
    });

    const result: MenuCategory[] = [];
    categoriesMap.forEach((categoryItems, categoryName) => {
      result.push({ name: categoryName, items: categoryItems });
    });

    return result;
  });

  public toggleCategory(categoryName: string): void {
    this.expandedCategories.update(set => {
      const newSet = new Set(set);
      newSet.has(categoryName) ? newSet.delete(categoryName) : newSet.add(categoryName);
      return newSet;
    });
  }


  public getItemQuantity(item: MenuItem): number {
    const cartItem = this.cart().find(c => c.menuItem.name === item.name);
    return cartItem ? cartItem.quantity : 0;
  }

  public addToCart(item: MenuItem): void {
    this.cart.update(currentCart => {
      const existing = currentCart.find(c => c.menuItem.name === item.name);
      if (existing) {
        return currentCart.map(c => c.menuItem.name === item.name ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...currentCart, { menuItem: item, quantity: 1 }];
    });
  }

  public removeFromCart(item: MenuItem): void {
    this.cart.update(currentCart => {
      const existing = currentCart.find(c => c.menuItem.name === item.name);
      if (existing && existing.quantity > 1) {
        return currentCart.map(c => c.menuItem.name === item.name ? { ...c, quantity: c.quantity - 1 } : c);
      }
      return currentCart.filter(c => c.menuItem.name !== item.name);
    });
  }
  
  public clearCart(): void {
    this.cart.set([]);
    this.isCartModalOpen.set(false);
  }
}