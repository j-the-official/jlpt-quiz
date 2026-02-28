import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuestionType } from '../../models/question-type.enum';
import { Mondai5Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { ProgressService } from '../../services/progress.service';
import { ChoiceButtonComponent, ChoiceState } from '../../shared/components/choice-button.component';
import { FeedbackPanelComponent } from '../../shared/components/feedback-panel.component';

@Component({
  selector: 'app-drill-mondai5',
  standalone: true,
  imports: [RouterLink, ChoiceButtonComponent, FeedbackPanelComponent],
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
        <span class="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">問題 5</span>
        <span class="text-sm text-muted-foreground">句子文法（文の文法1）</span>
      </div>

      <p class="mb-4 text-sm text-muted-foreground">請選出最適合填入空格的文法選項</p>

      @if (currentQuestion(); as q) {
        <div class="mt-4 rounded-xl border bg-card p-6 shadow-sm">
          <p class="text-lg leading-relaxed" lang="ja">{{ q.sentence }}</p>
        </div>

        <div class="mt-4 space-y-2">
          @for (choice of q.choices; track $index) {
            <app-choice-button
              [label]="($index + 1).toString()"
              [text]="choice"
              [state]="getChoiceState($index)"
              [disabled]="submitted()"
              (selected)="selectChoice($index)" />
          }
        </div>

        @if (!submitted()) {
          <button (click)="submit()" [disabled]="selectedIndex() === -1"
                  class="mt-4 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
            確認答案
          </button>
        }

        @if (submitted()) {
          <app-feedback-panel [correct]="isCorrect()" [correctAnswer]="q.choices[q.correctIndex]"
                              [explanation]="q.explanation ?? ''" (next)="nextQuestion()" />
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
export class DrillMondai5Component {
  private questionService = inject(QuestionService);
  private progressService = inject(ProgressService);

  questions = signal<Mondai5Question[]>([]);
  currentIndex = signal(0);
  selectedIndex = signal(-1);
  submitted = signal(false);

  currentQuestion = computed(() => this.questions()[this.currentIndex()] ?? null);
  isCorrect = computed(() => {
    const q = this.currentQuestion();
    return q ? this.selectedIndex() === q.correctIndex : false;
  });

  constructor() {
    this.questionService.getQuestions(QuestionType.MONDAI_5, { shuffle: true }).subscribe(qs => {
      this.questions.set(qs as Mondai5Question[]);
    });
  }

  getChoiceState(index: number): ChoiceState {
    if (!this.submitted()) return this.selectedIndex() === index ? 'selected' : 'default';
    const q = this.currentQuestion();
    if (!q) return 'default';
    if (index === q.correctIndex) return 'correct';
    if (index === this.selectedIndex()) return 'wrong';
    return 'default';
  }

  selectChoice(index: number): void { if (!this.submitted()) this.selectedIndex.set(index); }

  submit(): void {
    if (this.selectedIndex() === -1) return;
    this.submitted.set(true);
    const q = this.currentQuestion();
    if (q) this.progressService.recordAttempt(q.id, QuestionType.MONDAI_5, this.selectedIndex(), this.isCorrect());
  }

  nextQuestion(): void {
    this.currentIndex.update(i => i + 1);
    this.selectedIndex.set(-1);
    this.submitted.set(false);
  }
}
