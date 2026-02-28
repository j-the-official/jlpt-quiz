import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { QUESTION_TYPES, QuestionType } from '../../models/question-type.enum';

@Component({
  selector: 'app-wrong-answers',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="mx-auto max-w-3xl px-4 py-8">
      <h1 class="text-xl font-bold">錯題複習</h1>
      <p class="mt-1 text-sm text-muted-foreground">做錯的題目會列在這裡，方便你重複練習</p>

      @if (wrongGroups().length === 0) {
        <div class="mt-8 rounded-xl border bg-card p-8 text-center">
          <p class="text-lg font-semibold">沒有錯題！</p>
          <p class="mt-2 text-muted-foreground">太棒了，繼續保持</p>
          <a routerLink="/" class="mt-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            回到首頁
          </a>
        </div>
      } @else {
        <div class="mt-6 space-y-4">
          @for (group of wrongGroups(); track group.type) {
            <div class="rounded-xl border bg-card p-5 shadow-sm">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    問題 {{ group.number }}
                  </span>
                  <span class="font-medium">{{ group.nameZh }}</span>
                </div>
                <span class="text-sm font-semibold text-destructive">{{ group.wrongCount }} 題</span>
              </div>
              <div class="mt-3">
                <a [routerLink]="'/drill/mondai' + group.number"
                   class="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  重新練習
                </a>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class WrongAnswersComponent {
  private progressService = inject(ProgressService);

  wrongGroups = computed(() => {
    const progress = this.progressService.progressByType();
    return QUESTION_TYPES
      .map(qt => ({
        type: qt.type,
        number: qt.number,
        nameZh: qt.nameZh,
        wrongCount: (progress[qt.type]?.wrongQuestionIds ?? []).length,
      }))
      .filter(g => g.wrongCount > 0);
  });
}
