import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuestionType } from '../../models/question-type.enum';
import { Mondai7Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { ProgressService } from '../../services/progress.service';
import { ChoiceButtonComponent, ChoiceState } from '../../shared/components/choice-button.component';
import { FeedbackPanelComponent } from '../../shared/components/feedback-panel.component';

@Component({
  selector: 'app-drill-mondai7',
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
        <span class="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">問題 7</span>
        <span class="text-sm text-muted-foreground">文章文法（文章の文法）</span>
      </div>

      @if (currentQuestion(); as q) {
        @if (q.passageTitle) {
          <h3 class="mt-4 font-semibold" lang="ja">{{ q.passageTitle }}</h3>
        }

        <!-- Passage -->
        <div class="mt-3 rounded-xl border bg-card p-6 shadow-sm">
          <p class="text-base leading-loose whitespace-pre-line" lang="ja" [innerHTML]="renderedPassage()"></p>
        </div>

        <!-- Blank navigation -->
        <div class="mt-4 flex gap-2">
          @for (blank of q.blanks; track blank.blankNumber) {
            <button class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all"
                    [class]="currentBlankIndex() === $index
                      ? 'bg-primary text-primary-foreground'
                      : blankAnswers()[$index] !== undefined
                        ? (submitted() ? (blankAnswers()[$index] === blank.correctIndex ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive') : 'bg-accent text-accent-foreground')
                        : 'border text-muted-foreground'"
                    (click)="currentBlankIndex.set($index)">
              {{ blank.blankNumber }}
            </button>
          }
        </div>

        <!-- Current blank choices -->
        @if (currentBlank(); as blank) {
          <div class="mt-4 space-y-2">
            <p class="text-sm font-medium text-muted-foreground">空格【{{ blank.blankNumber }}】</p>
            @for (choice of blank.choices; track $index) {
              <app-choice-button
                [label]="($index + 1).toString()"
                [text]="choice"
                [state]="getBlankChoiceState($index)"
                [disabled]="submitted()"
                (selected)="selectBlankAnswer($index)" />
            }
          </div>
        }

        @if (!submitted()) {
          <button (click)="submit()" [disabled]="!allBlanksAnswered()"
                  class="mt-4 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
            提交全部答案
          </button>
        }

        @if (submitted()) {
          <app-feedback-panel
            [correct]="isAllCorrect()"
            [correctAnswer]="correctSummary()"
            [explanation]="currentBlank()?.explanation ?? currentQuestion()!.explanation ?? ''"
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
export class DrillMondai7Component {
  private questionService = inject(QuestionService);
  private progressService = inject(ProgressService);

  questions = signal<Mondai7Question[]>([]);
  currentIndex = signal(0);
  currentBlankIndex = signal(0);
  submitted = signal(false);
  blankAnswers = signal<(number | undefined)[]>([]);

  currentQuestion = computed(() => this.questions()[this.currentIndex()] ?? null);
  currentBlank = computed(() => {
    const q = this.currentQuestion();
    return q ? q.blanks[this.currentBlankIndex()] : null;
  });

  allBlanksAnswered = computed(() => {
    const q = this.currentQuestion();
    if (!q) return false;
    return this.blankAnswers().length === q.blanks.length && this.blankAnswers().every(a => a !== undefined);
  });

  isAllCorrect = computed(() => {
    const q = this.currentQuestion();
    if (!q) return false;
    return q.blanks.every((b, i) => this.blankAnswers()[i] === b.correctIndex);
  });

  correctSummary = computed(() => {
    const q = this.currentQuestion();
    if (!q) return '';
    return q.blanks.map(b => `【${b.blankNumber}】${b.choices[b.correctIndex]}`).join('　');
  });

  renderedPassage = computed(() => {
    const q = this.currentQuestion();
    if (!q) return '';
    return q.passage.replace(/【(\d+)】/g, '<span class="inline-flex items-center rounded bg-primary/10 px-1.5 py-0.5 text-sm font-semibold text-primary">【$1】</span>');
  });

  constructor() {
    this.questionService.getQuestions(QuestionType.MONDAI_7, { shuffle: false }).subscribe(qs => {
      this.questions.set(qs as Mondai7Question[]);
      if (qs.length > 0) {
        const q = qs[0] as Mondai7Question;
        this.blankAnswers.set(new Array(q.blanks.length).fill(undefined));
      }
    });
  }

  getBlankChoiceState(index: number): ChoiceState {
    const blankIdx = this.currentBlankIndex();
    const answer = this.blankAnswers()[blankIdx];
    if (!this.submitted()) return answer === index ? 'selected' : 'default';
    const blank = this.currentBlank();
    if (!blank) return 'default';
    if (index === blank.correctIndex) return 'correct';
    if (index === answer) return 'wrong';
    return 'default';
  }

  selectBlankAnswer(choiceIndex: number): void {
    if (this.submitted()) return;
    const answers = [...this.blankAnswers()];
    answers[this.currentBlankIndex()] = choiceIndex;
    this.blankAnswers.set(answers);

    // Auto-advance to next unanswered blank
    const q = this.currentQuestion();
    if (q) {
      const nextUnanswered = answers.findIndex((a, i) => i > this.currentBlankIndex() && a === undefined);
      if (nextUnanswered !== -1) {
        this.currentBlankIndex.set(nextUnanswered);
      }
    }
  }

  submit(): void {
    if (!this.allBlanksAnswered()) return;
    this.submitted.set(true);
    const q = this.currentQuestion();
    if (q) {
      this.progressService.recordAttempt(q.id, QuestionType.MONDAI_7, -1, this.isAllCorrect());
    }
  }

  nextQuestion(): void {
    this.currentIndex.update(i => i + 1);
    this.currentBlankIndex.set(0);
    this.submitted.set(false);
    const q = this.questions()[this.currentIndex()];
    if (q) {
      const mq = q as Mondai7Question;
      this.blankAnswers.set(new Array(mq.blanks.length).fill(undefined));
    }
  }
}
