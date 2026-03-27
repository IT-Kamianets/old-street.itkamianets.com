import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MENU_DATA } from './menu-data.const';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  public menuItems = signal<MenuItem[]>(MENU_DATA);
}