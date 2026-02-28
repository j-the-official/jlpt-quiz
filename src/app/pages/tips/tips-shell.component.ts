import { Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QUESTION_TYPES } from '../../models/question-type.enum';

const TIPS: Record<string, { title: string; tips: { heading: string; content: string }[] }> = {
  mondai1: {
    title: '問題1 漢字讀音 — 解題技巧',
    tips: [
      { heading: '注意長短音陷阱', content: '選項常常只差一個長音符號。例如「趨勢」的「趨」讀「すう」（長音），而非「す」。遇到不確定的漢字，先回想有沒有長音版本。' },
      { heading: '促音・濁音・半濁音', content: 'N1 最愛考的三大陷阱。例如「潔白」是「けっぱく」（促音+半濁音），而非「けつはく」。建議用筆記本專門記錄這類容易混淆的讀音。' },
      { heading: '訓讀動詞必背', content: '「報われる（むくわれる）」「培う（つちかう）」「携わる（たずさわる）」等訓讀動詞是常客。這些字的音讀和訓讀差異很大，只能靠累積。' },
      { heading: '平時養成查讀音習慣', content: '看日文文章時，遇到不確定讀音的漢字就查。N1 考的就是你有沒有真的「知道怎麼念」而不只是「看得懂意思」。' },
    ],
  },
  mondai2: {
    title: '問題2 文意推斷 — 解題技巧',
    tips: [
      { heading: '先看空格前後的關鍵字', content: '不要急著看選項。先把空格前後的 2-3 個關鍵字抓出來，理解語境需要「正面還是負面」「程度強還是弱」的詞。' },
      { heading: '辨別近似詞的「精確語意」', content: '選項常出現中文意思幾乎一樣的詞。例如「抜本的」vs「根本的」，前者強調「連根拔起式的改革」，後者比較中性。' },
      { heading: '注意固定搭配', content: '日文有很多固定搭配（コロケーション），例如「法律を施行する」「計画を抜本的に見直す」。多讀多記這些搭配比背單字更有效。' },
    ],
  },
  mondai3: {
    title: '問題3 近義詞替換 — 解題技巧',
    tips: [
      { heading: '擴充同義詞資料庫', content: '這題考的就是你的同義詞量。建議用「一個詞帶三個近義詞」的方式學習，例如「たちまち＝すぐに＝直ちに＝即座に」。' },
      { heading: '外來語 → 和語/漢語 的轉換', content: 'N1 常考外來語替換成日語固有表達，或反過來。例如「キャンセルする」→「取り消す」。' },
      { heading: '代入法驗證', content: '把選項代入原句，看看句子通不通順、語氣對不對。有時候意思接近但語域（正式/口語）不同。' },
    ],
  },
  mondai4: {
    title: '問題4 單字用法 — 解題技巧',
    tips: [
      { heading: '不能只背中文意思', content: '這題的關鍵在於「搭配詞」和「使用情境」。例如「おびただしい」只用在形容「數量多」，不能用在形容性格或天氣。' },
      { heading: '判斷正面/負面語感', content: '很多詞有正面或負面的傾向。「あっけない」帶有「令人失望」的負面語感，所以不能用在正面的句子裡。' },
      { heading: '排除法最有效', content: '四個句子中，先把明顯不通順的排除掉。通常能排除 2 個，再從剩下 2 個細細比較。' },
      { heading: '多讀例句', content: '背單字時一定要看 2-3 個例句，記住這個字「通常跟什麼一起用」。辭書例句比自己造句更可靠。' },
    ],
  },
  mondai5: {
    title: '問題5 句子文法 — 解題技巧',
    tips: [
      { heading: '記住接續規則', content: '每個 N1 句型都有固定的接續方式。例如「からには」接動詞た形，「をもってしても」接名詞。先看空格前面是什麼形式，就能排除不符合接續的選項。' },
      { heading: '古文殘留句型要硬背', content: '「～を禁じ得ない」「～たるもの」「～べからず」這些帶有古文色彩的句型，沒有規律可循，只能多看多記。' },
      { heading: '注意語氣和前後邏輯', content: '空格填入後，整句的邏輯要通順。「からには」表示決心，「ものなら」表示假設，語氣完全不同。' },
    ],
  },
  mondai6: {
    title: '問題6 排列組合 — 解題技巧',
    tips: [
      { heading: '先找「必定相連」的組合', content: '四個選項中，一定有兩個必須相鄰的。例如「動詞原形」一定接在「名詞＋を」後面，「につれて」一定接在「動詞辞書形」後面。先把這些鎖定。' },
      { heading: '從句首和句尾往中間推', content: '看空格前後已有的文字，確定第一格和最後一格能接上去，然後往中間推理。' },
      { heading: '只需要答★位置', content: '記住：你只需要回答★位置的選項。如果你能確定★位置的答案，其他位置不確定也沒關係。' },
      { heading: '注意助詞的接續', content: '「は」「が」「を」「に」等助詞是排列的重要線索。主語一定在「は/が」前面，動詞的受詞在「を」前面。' },
    ],
  },
  mondai7: {
    title: '問題7 文章文法 — 解題技巧',
    tips: [
      { heading: '這是披著文法皮的閱讀測驗', content: '問題7 其實在考你理不理解文章的脈絡。先快速讀完整篇文章掌握大意，再回來看每個空格。' },
      { heading: '接續詞是重點', content: '「したがって（因此）」「ところが（然而）」「むしろ（不如說）」「ただし（但是）」——先判斷前後文的邏輯關係（因果/轉折/補充），就能選對接續詞。' },
      { heading: '語氣表達看文末', content: '空格在句尾時，要判斷作者的態度：肯定？推測？主張？建議？不同的語氣詞表達完全不同的立場。' },
    ],
  },
};

@Component({
  selector: 'app-tips-shell',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="mx-auto max-w-2xl px-4 py-8">
      <a routerLink="/" class="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        返回
      </a>

      @if (tipsData(); as data) {
        <h1 class="text-xl font-bold">{{ data.title }}</h1>
        <div class="mt-6 space-y-4">
          @for (tip of data.tips; track tip.heading) {
            <div class="rounded-xl border bg-card p-5 shadow-sm">
              <h3 class="font-semibold">{{ tip.heading }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ tip.content }}</p>
            </div>
          }
        </div>
      } @else {
        <p class="text-muted-foreground">找不到此題型的技巧資料。</p>
      }
    </div>
  `,
})
export class TipsShellComponent {
  mondaiType = input<string>();

  tipsData = computed(() => {
    const type = this.mondaiType();
    return type ? TIPS[type] ?? null : null;
  });
}
