import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <a routerLink="/" class="flex items-center gap-2 font-heading text-lg font-bold">
          <span class="text-xl">🎌</span>
          <span>N1 特訓</span>
        </a>

        <nav class="flex items-center gap-1">
          <a routerLink="/stats"
             routerLinkActive="bg-accent text-accent-foreground"
             class="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            統計
          </a>
          <a routerLink="/review"
             routerLinkActive="bg-accent text-accent-foreground"
             class="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            錯題
          </a>
          <button (click)="theme.toggle()"
                  class="ml-2 rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground">
            @if (theme.isDark()) {
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            }
          </button>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  theme = inject(ThemeService);
}
