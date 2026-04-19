export type SegmentType = 'text' | 'code' | 'url' | 'video_url' | 'reference';

export interface Segment {
  type: SegmentType;
  title: string;
  value: string;
}

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correct_option_idx: number;
}

export interface Chapter {
  title: string;
  description: string;
  segments: Segment[];
  quiz: QuizQuestion[];
}

export interface ContentData {
  chapter: Chapter;
}
