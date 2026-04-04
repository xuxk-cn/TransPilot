import type {
  ModelHealth,
  ModelResponseEnvelope,
  TranslationOptions,
  TranslationResult,
} from "../types/model";

export const DEFAULT_MODEL_HOST = "http://127.0.0.1:8081";
export const DEFAULT_MODEL_ENDPOINT = `${DEFAULT_MODEL_HOST}/v1/chat/completions`;

export const DEFAULT_TRANSLATION_PROMPT =
  "请阅读图片中的文字内容，并翻译为简体中文。默认只输出译文，不要添加解释。";

export async function checkModelHealth(
  endpoint = DEFAULT_MODEL_HOST,
): Promise<ModelHealth> {
  const startedAt = performance.now();

  try {
    const response = await fetch(endpoint, {
      method: "GET",
    });

    return {
      ok: response.ok,
      status: response.status,
      elapsedMs: Math.round(performance.now() - startedAt),
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      elapsedMs: Math.round(performance.now() - startedAt),
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function translateImage(
  imageBase64: string,
  options: TranslationOptions = {},
): Promise<TranslationResult> {
  const endpoint = options.endpoint ?? DEFAULT_MODEL_ENDPOINT;
  const prompt = options.prompt ?? DEFAULT_TRANSLATION_PROMPT;
  const startedAt = performance.now();

  const payload = {
    model: options.model ?? "Qwen2.5-VL-7B-Instruct",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${imageBase64}`,
            },
          },
        ],
      },
    ],
    temperature: options.temperature ?? 0.2,
    max_tokens: options.maxTokens ?? 512,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Model request failed: ${response.status} ${response.statusText}`);
  }

  const rawResponse = (await response.json()) as ModelResponseEnvelope;

  return {
    translatedText: rawResponse.choices?.[0]?.message?.content?.trim() ?? "",
    elapsedMs: Math.round(performance.now() - startedAt),
    model: payload.model,
    rawResponse,
  };
}
