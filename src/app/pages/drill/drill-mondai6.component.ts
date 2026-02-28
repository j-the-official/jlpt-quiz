import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuestionType } from '../../models/question-type.enum';
import { Mondai6Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { ProgressService } from '../../services/progress.service';
import { FeedbackPanelComponent } from '../../shared/components/feedback-panel.component';

@Component({
  selector: 'app-drill-mondai6',
  standalone: true,
  imports: [RouterLink, FeedbackPanelComponent],
  template: `
    <div class="mx-auto max-w-2xl px-4 py-8">
      <div class="mb-6 flex items-center justify-between">
        <a routerLink="/" class="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          返回
        </a>
        <span class="text-sm text-muted-foreground">第 {{ currentIndex() + 1 }} / {{ questions().length }} 題</span>
      </div>

      <div class="mb-2 flex items-center gap-2">
        <span class="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">問題 6</span>
        <span class="inline-flex items-center rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">大魔王</span>
        <span class="text-sm text-muted-foreground">排列組合（星號題）</span>
      </div>

      <p class="mb-4 text-sm text-muted-foreground">請選出放在★位置的正確選項</p>

      @if (currentQuestion(); as q) {
        <!-- Sentence template with slots -->
        <div class="mt-4 rounded-xl border bg-card p-6 shadow-sm">
          <div class="flex flex-wrap items-center gap-1 text-lg leading-loose" lang="ja">
            @for (part of sentenceParts(); track $index) {
              @if (part.type === 'text') {
                <span>{{ part.value }}</span>
              } @else {
                <span class="inline-flex min-w-[4rem] items-center justify-center rounded-md border-2 border-dashed px-2 py-1 text-base"
                      [class]="part.isStar
                        ? (submitted() ? 'border-primary bg-primary/10' : 'border-primary bg-primary/5')
                        : 'border-border'"
                      (click)="selectSlot(part.slotIndex!)">
                  @if (slots()[part.slotIndex!] !== null) {
                    <span class="font-medium">{{ q.fragments[slots()[part.slotIndex!]!] }}</span>
                  } @else if (part.isStar) {
                    <span class="text-primary font-bold">★</span>
                  } @else {
                    <span class="text-muted-foreground text-sm">___</span>
                  }
                </span>
              }
            }
          </div>
        </div>

        <!-- Fragment chips -->
        @if (!submitted()) {
          <div class="mt-4">
            <p class="mb-2 text-sm text-muted-foreground">點擊選項放入空格（再點空格可移除）：</p>
            <div class="flex flex-wrap gap-2">
              @for (fragment of q.fragments; track $index) {
                <button
                  class="rounded-lg border px-4 py-2 text-sm font-medium transition-all"
                  [class]="isFragmentPlaced($index) ? 'opacity-30 border-border' : 'border-primary/50 bg-card hover:bg-primary/5 hover:border-primary'"
                  [disabled]="isFragmentPlaced($index)"
                  (click)="placeFragment($index)">
                  <span lang="ja">{{ fragment }}</span>
                </button>
              }
            </div>
          </div>

          <button (click)="submit()" [disabled]="!allSlotsFilled()"
                  class="mt-4 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
            確認答案
          </button>
        }

        @if (submitted()) {
          <app-feedback-panel [correct]="isCorrect()"
                              [correctAnswer]="q.fragments[q.correctStarIndex]"
                              [explanation]="q.explanation ?? ''"
                              (next)="nextQuestion()" />
        }
      } @else {
        <div class="mt-8 rounded-xl border bg-card p-8 text-center">
          <p class="text-lg font-semibold">全部完成！</p>
          <p class="mt-2 text-muted-foreground">你已經練習完所有題目</p>
          <a routerLink="/" class="mt-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">回到首頁</a>
        </div>
      }

      <div class="mt-6 h-1 w-full rounded-full bg-muted">
        <div class="h-1 rounded-full bg-primary transition-all" [style.width.%]="(currentIndex() / questions().length) * 100"></div>
      </div>
    </div>
  `,
})
export class DrillMondai6Component {
  private questionService = inject(QuestionService);
  private progressService = inject(ProgressService);

  questions = signal<Mondai6Question[]>([]);
  currentIndex = signal(0);
  submitted = signal(false);
  slots = signal<(number | null)[]>([null, null, null, null]);
  activeSlot = signal<number | null>(null);

  currentQuestion = computed(() => this.questions()[this.currentIndex()] ?? null);

  sentenceParts = computed(() => {
    const q = this.currentQuestion();
    if (!q) return [];
    const parts: { type: 'text' | 'slot'; value?: string; slotIndex?: number; isStar?: boolean }[] = [];
    const regex = /(_\d_|★)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let slotCounter = 0;

    const template = q.sentenceTemplate;
    while ((match = regex.exec(template)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', value: template.slice(lastIndex, match.index) });
      }
      const isStar = match[0] === '★' || slotCounter === q.starPosition - 1;
      parts.push({ type: 'slot', slotIndex: slotCounter, isStar });
      slotCounter++;
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < template.length) {
      parts.push({ type: 'text', value: template.slice(lastIndex) });
    }
    return parts;
  });

  allSlotsFilled = computed(() => this.slots().every(s => s !== null));

  isCorrect = computed(() => {
    const q = this.currentQuestion();
    if (!q) return false;
    const starSlotIndex = q.starPosition - 1;
    return this.slots()[starSlotIndex] === q.correctStarIndex;
  });

  constructor() {
    this.questionService.getQuestions(QuestionType.MONDAI_6, { shuffle: true }).subscribe(qs => {
      this.questions.set(qs as Mondai6Question[]);
    });
  }

  isFragmentPlaced(fragmentIndex: number): boolean {
    return this.slots().includes(fragmentIndex);
  }

  selectSlot(slotIndex: number): void {
    if (this.submitted()) return;
    const current = this.slots();
    if (current[slotIndex] !== null) {
      const newSlots = [...current];
      newSlots[slotIndex] = null;
      this.slots.set(newSlots);
      this.activeSlot.set(null);
    } else {
      this.activeSlot.set(slotIndex);
    }
  }

  placeFragment(fragmentIndex: number): void {
    if (this.submitted()) return;
    let targetSlot = this.activeSlot();
    if (targetSlot === null) {
      const emptyIndex = this.slots().findIndex(s => s === null);
      if (emptyIndex === -1) return;
      targetSlot = emptyIndex;
    }
    const newSlots = [...this.slots()];
    newSlots[targetSlot] = fragmentIndex;
    this.slots.set(newSlots);
    this.activeSlot.set(null);
  }

  submit(): void {
    if (!this.allSlotsFilled()) return;
    this.submitted.set(true);
    const q = this.currentQuestion();
    if (q) {
      this.progressService.recordAttempt(q.id, QuestionType.MONDAI_6, this.slots()[q.starPosition - 1]!, this.isCorrect());
    }
  }

  nextQuestion(): void {
    this.currentIndex.update(i => i + 1);
    this.slots.set([null, null, null, null]);
    this.activeSlot.set(null);
    this.submitted.set(false);
  }
}
