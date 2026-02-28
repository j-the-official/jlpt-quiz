import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { QUESTION_TYPES } from '../../models/question-type.enum';

@Component({
  selector: 'app-stats-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="mx-auto max-w-3xl px-4 py-8">
      <h1 class="text-xl font-bold">統計分析</h1>

      <!-- Overall -->
      <div class="mt-6 rounded-xl border bg-card p-6 shadow-sm text-center">
        <p class="text-sm text-muted-foreground">總體正確率</p>
        <p class="mt-1 text-4xl font-bold" [class]="overallColor()">
          {{ (stats().accuracy * 100).toFixed(1) }}%
        </p>
        <p class="mt-1 text-sm text-muted-foreground">
          共作答 {{ stats().total }} 題，答對 {{ stats().correct }} 題
        </p>
      </div>

      <!-- Per type -->
      <div class="mt-6 space-y-3">
        @for (qt of questionTypes; track qt.type) {
          <div class="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
              {{ qt.number }}
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <p class="font-medium">{{ qt.nameZh }}</p>
                <span class="text-sm font-semibold" [class]="getAccuracyColor(qt.type)">
                  {{ (getAccuracy(qt.type) * 100).toFixed(0) }}%
                </span>
              </div>
              <div class="mt-1 flex items-center gap-2">
                <div class="h-1.5 flex-1 rounded-full bg-muted">
                  <div class="h-1.5 rounded-full transition-all"
                       [class]="getAccuracy(qt.type) >= 0.7 ? 'bg-success' : getAccuracy(qt.type) >= 0.4 ? 'bg-chart-5' : 'bg-destructive'"
                       [style.width.%]="getAccuracy(qt.type) * 100"></div>
                </div>
                <span class="text-xs text-muted-foreground">{{ getAttempted(qt.type) }} 題</span>
              </div>
            </div>
          </div>
        }
      </div>

      @if (stats().total === 0) {
        <div class="mt-8 text-center">
          <p class="text-muted-foreground">還沒有作答紀錄</p>
          <a routerLink="/" class="mt-2 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            開始練習
          </a>
        </div>
      }
    </div>
  `,
})
export class StatsDashboardComponent {
  private progressService = inject(ProgressService);
  questionTypes = QUESTION_TYPES;
  stats = this.progressService.overallStats;

  overallColor = computed(() => {
    const a = this.stats().accuracy;
    return a >= 0.7 ? 'text-success' : a >= 0.4 ? 'text-chart-5' : 'text-destructive';
  });

  getAccuracy(type: string): number {
    return this.progressService.getTypeAccuracy(type as any);
  }

  getAttempted(type: string): number {
    return this.progressService.getTypeProgress(type as any).totalAttempted;
  }

  getAccuracyColor(type: string): string {
    const a = this.getAccuracy(type);
    return a >= 0.7 ? 'text-success' : a >= 0.4 ? 'text-chart-5' : 'text-destructive';
  }
}
