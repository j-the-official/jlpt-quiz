import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-feedback-panel',
  standalone: true,
  template: `
    <div class="mt-4 rounded-lg border p-4" [class]="correct() ? 'border-success/50 bg-success/5' : 'border-destructive/50 bg-destructive/5'">
      <div class="flex items-center gap-2 font-semibold" [class]="correct() ? 'text-success' : 'text-destructive'">
        @if (correct()) {
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
          <span>正確！</span>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          <span>不正確</span>
        }
      </div>
      @if (correctAnswer()) {
        <p class="mt-2 text-sm">
          <span class="text-muted-foreground">正確答案：</span>
          <span class="font-medium" lang="ja">{{ correctAnswer() }}</span>
        </p>
      }
      @if (explanation()) {
        <p class="mt-2 text-sm text-muted-foreground">{{ explanation() }}</p>
      }
      <button (click)="next.emit()"
              class="mt-3 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        下一題
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </button>
    </div>
  `,
})
export class FeedbackPanelComponent {
  correct = input.required<boolean>();
  correctAnswer = input<string>('');
  explanation = input<string>('');
  next = output<void>();
}
