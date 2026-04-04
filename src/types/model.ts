export type ModelHealth = {
  ok: boolean;
  status: number;
  elapsedMs: number;
  message?: string;
};

export type TranslationOptions = {
  endpoint?: string;
  model?: string;
  prompt?: string;
  temperature?: number;
  maxTokens?: number;
};

export type TranslationResult = {
  sourceText?: string;
  translatedText: string;
  elapsedMs: number;
  model: string;
  rawResponse?: unknown;
};

export type ModelResponseEnvelope = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};
