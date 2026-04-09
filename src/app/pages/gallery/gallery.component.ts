import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from 'wacom';
import { LanguageService } from '../../feature/language/language.service';

interface GalleryPhoto {
  url: string;
  alt: string;
  title?: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  public readonly languageService = inject(LanguageService);
  public currentLang = this.languageService.language;
  
  public photos = signal<GalleryPhoto[]>([
    {
      url: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAwerJqvqWHGHigjSWI3Pdtxdv_EeaT8uR8h53RWfGKQ53fylkHpWw0ZHKiAZa66QveBaKwxWfhs3auZIbxruNw8-AebbdPU96YU-M9ksTzekEf6gyFm9_dLyqHp3T0Evn4-0E-Vg7=s0',
      alt: 'Old Street restaurant interior main hall',
      title: 'Головний зал'
    },
	{
      url: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAwer7s0ouTQzKuphxoGYWykLWsjlCXe_R0rzr9cMAvI7UiXKYXp6zBPNMuxdIYoG27P5DNuR18ZC3TNB4mK1emUhcxlJ_-0V2YSN8IjJXUQiOe5KRc-QrgfvD962McyBHfhRsRh_K=s0',
      alt: 'Old Street restaurant interior main hall',
      title: 'Головний зал'
    },
    {
      url: 'https://lh3.googleusercontent.com/p/AF1QipNKfU8jwk_FDq14MAy4qojBDOFvbPw9mvmv3VBM=s0',
      alt: 'Barman making a cocktail',
      title: 'Магія бармена'
    },
    {
      url: 'https://lh3.googleusercontent.com/p/AF1QipOoj4VVL__-_HCU8QJBK19SANABpikDxh1T1n0G=s0',
      alt: 'Delicious food serving details',
      title: 'Подача страв'
    },
    {
      url: 'https://lh3.googleusercontent.com/p/AF1QipOPSuOmAEe2T_t4q97N6b8qTawN9KbScNiXTHdV=s677-k-no',
      alt: 'Cozy corner at Old Street',
      title: 'Затишний куточок'
    },
    {
      url: 'https://lh3.googleusercontent.com/p/AF1QipNqvc8TuT0njBzVfhclyEG-yYowZnH2p9ikAWLs=s677-k-no',
      alt: 'Bar counter with drinks',
      title: 'Наш бар'
    },
    {
      url: 'https://lh3.googleusercontent.com/p/AF1QipNgdn_B6ALOsHPd__xcxrRj2KAcS6O_iRi1sHkv=s0',
      alt: 'Serving',
      title: 'Обслуговування'
    },
    {
      url: 'https://lh3.googleusercontent.com/p/AF1QipPNeurqvZt6EkoyuPqqNgJBzeZX0rKkV6Fzo4Ya=s0',
      alt: 'Old Street restaurant entrance',
      title: 'Вхід'
    },
    {
      url: 'https://lh3.googleusercontent.com/p/AF1QipOwDLccJ3r0bQKH1gqVsDyQ68O87SOaLqOe8siJ=s677-k-no',
      alt: 'Interior',
      title: 'Головний зал'
    }
  ]);
}