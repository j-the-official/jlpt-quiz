import { Component, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { inject } from '@angular/core';

@Component({
  selector: 'app-underline-text',
  standalone: true,
  template: `<span [innerHTML]="rendered()" class="text-lg leading-relaxed" lang="ja"></span>`,
})
export class UnderlineTextComponent {
  text = input.required<string>();
  private sanitizer = inject(DomSanitizer);

  rendered(): SafeHtml {
    const html = this.text().replace(
      /__([^_]+)__/g,
      '<span class="border-b-2 border-primary pb-0.5 font-semibold">$1</span>',
    );
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
