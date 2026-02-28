import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QUESTION_TYPES, QuestionTypeInfo } from '../../models/question-type.enum';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="mx-auto max-w-5xl px-4 py-8">
      <div class="mb-8 text-center">
        <h1 class="font-heading text-3xl font-bold">JLPT N1 言語知識特訓</h1>
        <p class="mt-2 text-muted-foreground">文字・語彙・文法 — 按題型針對性練習</p>
      </div>

      <!-- 文字・語彙 -->
      <section class="mb-8">
        <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold">
          <span class="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">文字・語彙</span>
          問題 1〜4
        </h2>
        <div class="grid gap-4 sm:grid-cols-2">
          @for (qt of vocabTypes; track qt.type) {
            <ng-container *ngTemplateOutlet="cardTpl; context: { $implicit: qt }" />
          }
        </div>
      </section>

      <!-- 文法 -->
      <section>
        <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold">
          <span class="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">文法</span>
          問題 5〜7
        </h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (qt of grammarTypes; track qt.type) {
            <ng-container *ngTemplateOutlet="cardTpl; context: { $implicit: qt }" />
          }
        </div>
      </section>
    </div>

    <ng-template #cardTpl let-qt>
      <div class="rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
        <div class="mb-3 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-2xl font-bold text-primary">{{ qt.number }}</span>
            <div>
              <p class="font-semibold">{{ qt.nameZh }}</p>
              <p class="text-xs text-muted-foreground" lang="ja">{{ qt.nameJa }}</p>
            </div>
          </div>
          @if (qt.difficulty === 'boss') {
            <span class="inline-flex items-center rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
              大魔王
            </span>
          }
        </div>
        <p class="mb-4 text-sm text-muted-foreground">{{ qt.descriptionZh }}</p>

        @if (getProgress(qt).totalAttempted > 0) {
          <div class="mb-4">
            <div class="flex justify-between text-xs text-muted-foreground">
              <span>已練習 {{ getProgress(qt).totalAttempted }} 題</span>
              <span>正確率 {{ (getAccuracy(qt) * 100).toFixed(0) }}%</span>
            </div>
            <div class="mt-1 h-1.5 w-full rounded-full bg-muted">
              <div class="h-1.5 rounded-full transition-all"
                   [class]="getAccuracy(qt) >= 0.7 ? 'bg-success' : getAccuracy(qt) >= 0.4 ? 'bg-chart-5' : 'bg-destructive'"
                   [style.width.%]="getAccuracy(qt) * 100"></div>
            </div>
          </div>
        }

        <div class="flex gap-2">
          <a [routerLink]="'/drill/mondai' + qt.number"
             class="inline-flex flex-1 items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            開始練習
          </a>
          <a [routerLink]="'/tips/mondai' + qt.number"
             class="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
            技巧
          </a>
        </div>
      </div>
    </ng-template>
  `,
})
export class HomeComponent {
  private progress = inject(ProgressService);

  vocabTypes = QUESTION_TYPES.filter(t => t.section === 'vocabulary');
  grammarTypes = QUESTION_TYPES.filter(t => t.section === 'grammar');

  getProgress(qt: QuestionTypeInfo) {
    return this.progress.getTypeProgress(qt.type);
  }

  getAccuracy(qt: QuestionTypeInfo) {
    return this.progress.getTypeAccuracy(qt.type);
  }
}
