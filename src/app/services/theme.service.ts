import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal<boolean>(this.loadTheme());

  toggle(): void {
    this.isDark.update(v => !v);
    document.documentElement.classList.toggle('dark', this.isDark());
    localStorage.setItem('jlpt-n1-theme', this.isDark() ? 'dark' : 'light');
  }

  init(): void {
    document.documentElement.classList.toggle('dark', this.isDark());
  }

  private loadTheme(): boolean {
    const saved = localStorage.getItem('jlpt-n1-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
