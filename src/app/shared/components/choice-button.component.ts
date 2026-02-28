import { Component, input, output } from '@angular/core';
import { cn } from '../../lib/utils';

export type ChoiceState = 'default' | 'selected' | 'correct' | 'wrong' | 'revealed';

@Component({
  selector: 'app-choice-button',
  standalone: true,
  template: `
    <button
      [class]="buttonClass()"
      [disabled]="disabled()"
      (click)="selected.emit()">
      <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold"
            [class]="labelClass()">
        {{ label() }}
      </span>
      <span class="text-left leading-relaxed" lang="ja">{{ text() }}</span>
    </button>
  `,
})
export class ChoiceButtonComponent {
  label = input.required<string>();
  text = input.required<string>();
  state = input<ChoiceState>('default');
  disabled = input<boolean>(false);
  selected = output<void>();

  buttonClass(): string {
    const base = 'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all';
    switch (this.state()) {
      case 'selected':
        return cn(base, 'border-primary bg-primary/5 ring-1 ring-primary');
      case 'correct':
        return cn(base, 'border-success bg-success/10');
      case 'wrong':
        return cn(base, 'border-destructive bg-destructive/10');
      case 'revealed':
        return cn(base, 'border-success/50 bg-success/5 opacity-70');
      default:
        return cn(base, 'border-border hover:border-primary/50 hover:bg-accent');
    }
  }

  labelClass(): string {
    switch (this.state()) {
      case 'selected':
        return 'border-primary bg-primary text-primary-foreground';
      case 'correct':
        return 'border-success bg-success text-success-foreground';
      case 'wrong':
        return 'border-destructive bg-destructive text-white';
      case 'revealed':
        return 'border-success/50 text-success';
      default:
        return 'border-border text-muted-foreground';
    }
  }
}
