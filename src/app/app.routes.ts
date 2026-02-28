import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/shell.component').then(m => m.ShellComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'JLPT N1 特訓',
      },
      {
        path: 'drill/mondai1',
        loadComponent: () => import('./pages/drill/drill-mondai1.component').then(m => m.DrillMondai1Component),
        title: 'N1 特訓 — 問題1 漢字讀音',
      },
      {
        path: 'drill/mondai2',
        loadComponent: () => import('./pages/drill/drill-mondai2.component').then(m => m.DrillMondai2Component),
        title: 'N1 特訓 — 問題2 文意推斷',
      },
      {
        path: 'drill/mondai3',
        loadComponent: () => import('./pages/drill/drill-mondai3.component').then(m => m.DrillMondai3Component),
        title: 'N1 特訓 — 問題3 近義詞替換',
      },
      {
        path: 'drill/mondai4',
        loadComponent: () => import('./pages/drill/drill-mondai4.component').then(m => m.DrillMondai4Component),
        title: 'N1 特訓 — 問題4 單字用法',
      },
      {
        path: 'drill/mondai5',
        loadComponent: () => import('./pages/drill/drill-mondai5.component').then(m => m.DrillMondai5Component),
        title: 'N1 特訓 — 問題5 句子文法',
      },
      {
        path: 'drill/mondai6',
        loadComponent: () => import('./pages/drill/drill-mondai6.component').then(m => m.DrillMondai6Component),
        title: 'N1 特訓 — 問題6 排列組合',
      },
      {
        path: 'drill/mondai7',
        loadComponent: () => import('./pages/drill/drill-mondai7.component').then(m => m.DrillMondai7Component),
        title: 'N1 特訓 — 問題7 文章文法',
      },
      {
        path: 'tips/:mondaiType',
        loadComponent: () => import('./pages/tips/tips-shell.component').then(m => m.TipsShellComponent),
        title: 'N1 特訓 — 解題技巧',
      },
      {
        path: 'stats',
        loadComponent: () => import('./pages/stats/stats-dashboard.component').then(m => m.StatsDashboardComponent),
        title: 'N1 特訓 — 統計分析',
      },
      {
        path: 'review',
        loadComponent: () => import('./pages/review/wrong-answers.component').then(m => m.WrongAnswersComponent),
        title: 'N1 特訓 — 錯題複習',
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
