import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="flex min-h-screen flex-col">
      <app-header />
      <main class="flex-1">
        <router-outlet />
      </main>
      <footer class="border-t py-4 text-center text-sm text-muted-foreground">
        JLPT N1 特訓 — 加油，合格就在眼前！
      </footer>
    </div>
  `,
})
export class ShellComponent {}
