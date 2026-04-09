import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService, TranslatePipe, TranslateService } from 'wacom';
import { LanguageOption } from '../../feature/language/language.interface';
import { LanguageService } from '../../feature/language/language.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterLink, TranslatePipe],
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
    private readonly _translateService = inject(TranslateService);
    private readonly _themeService = inject(ThemeService);
    private readonly _languageService = inject(LanguageService);

    public currentLang = this._languageService.language;

    public readonly mode = computed(() => this._themeService.mode() ?? 'light');
    public readonly languageMenuOpen = signal(false);
    public readonly languages = this._languageService.languages;
    
    public readonly currentLanguage = computed(() =>
        this._languageService.getLanguage(this._languageService.language()),
    );
    
    public readonly toggleIcon = computed(() =>
        this.mode() === 'dark' ? 'light_mode' : 'dark_mode',
    );
    
    public readonly toggleLabel = computed(() =>
        this.mode() === 'dark'
            ? this._translateService.translate('Switch to light mode')()
            : this._translateService.translate('Switch to dark mode')(),
    );
    
    public readonly languageMenuLabel = computed(() =>
        this._translateService.translate('Open language menu')(),
    );
    
    public readonly languageCycleLabel = computed(
        () =>
            `${this._translateService.translate('Switch language to')()} ${this.getNextLanguage().label}`,
    );

    constructor() {
        this._themeService.init();
    }

    public toggleMode(): void {
        const nextMode = this.mode() === 'dark' ? 'light' : 'dark';
        this._themeService.setMode(nextMode);
    }

    public nextLanguage(): void {
        void this._languageService.nextLanguage();
        this.languageMenuOpen.set(false);
    }

    public toggleLanguageMenu(): void {
        this.languageMenuOpen.update((open) => !open);
    }

    public setLanguage(language: LanguageOption): void {
        void this._languageService.setLanguage(language.code);
        this.languageMenuOpen.set(false);
    }

    public getNextLanguage(): LanguageOption {
        const languages = this.languages();
        const currentCode = this.currentLanguage().code;
        const currentIndex = languages.findIndex((language) => language.code === currentCode);

        return languages[(currentIndex + 1) % languages.length] ?? languages[0]!;
    }
}