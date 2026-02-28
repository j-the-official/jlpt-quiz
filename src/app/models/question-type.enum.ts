export enum QuestionType {
  MONDAI_1 = 'mondai1',
  MONDAI_2 = 'mondai2',
  MONDAI_3 = 'mondai3',
  MONDAI_4 = 'mondai4',
  MONDAI_5 = 'mondai5',
  MONDAI_6 = 'mondai6',
  MONDAI_7 = 'mondai7',
}

export interface QuestionTypeInfo {
  type: QuestionType;
  number: number;
  nameJa: string;
  nameZh: string;
  descriptionZh: string;
  section: 'vocabulary' | 'grammar';
  difficulty: 'normal' | 'boss';
  dataFile: string;
}

export const QUESTION_TYPES: QuestionTypeInfo[] = [
  {
    type: QuestionType.MONDAI_1,
    number: 1,
    nameJa: '漢字読み',
    nameZh: '漢字讀音',
    descriptionZh: '看句子中畫底線的漢字，選出正確的平假名讀音',
    section: 'vocabulary',
    difficulty: 'normal',
    dataFile: 'assets/data/mondai1-kanji-reading.json',
  },
  {
    type: QuestionType.MONDAI_2,
    number: 2,
    nameJa: '文脈規定',
    nameZh: '文意推斷',
    descriptionZh: '根據句子前後文，從四個選項中選出最適合填入空格的詞彙',
    section: 'vocabulary',
    difficulty: 'normal',
    dataFile: 'assets/data/mondai2-context-vocab.json',
  },
  {
    type: QuestionType.MONDAI_3,
    number: 3,
    nameJa: '言い換え類義',
    nameZh: '近義詞替換',
    descriptionZh: '選出與畫底線詞語意思最接近的選項',
    section: 'vocabulary',
    difficulty: 'normal',
    dataFile: 'assets/data/mondai3-synonyms.json',
  },
  {
    type: QuestionType.MONDAI_4,
    number: 4,
    nameJa: '用法',
    nameZh: '單字用法',
    descriptionZh: '給定一個詞彙，從四個句子中選出正確使用該詞彙的句子',
    section: 'vocabulary',
    difficulty: 'boss',
    dataFile: 'assets/data/mondai4-word-usage.json',
  },
  {
    type: QuestionType.MONDAI_5,
    number: 5,
    nameJa: '文の文法1',
    nameZh: '句子文法',
    descriptionZh: '選出最適合填入句子空格的文法選項',
    section: 'grammar',
    difficulty: 'normal',
    dataFile: 'assets/data/mondai5-grammar.json',
  },
  {
    type: QuestionType.MONDAI_6,
    number: 6,
    nameJa: '文の文法2（排列）',
    nameZh: '排列組合',
    descriptionZh: '將四個選項排列成正確順序，選出放在★位置的選項',
    section: 'grammar',
    difficulty: 'boss',
    dataFile: 'assets/data/mondai6-arrangement.json',
  },
  {
    type: QuestionType.MONDAI_7,
    number: 7,
    nameJa: '文章の文法',
    nameZh: '文章文法',
    descriptionZh: '閱讀短文，為每個空格選出最適當的詞語或文法',
    section: 'grammar',
    difficulty: 'normal',
    dataFile: 'assets/data/mondai7-passage-grammar.json',
  },
];
