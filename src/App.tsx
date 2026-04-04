import { useMemo, useState } from "react";
import {
  checkModelHealth,
  DEFAULT_MODEL_ENDPOINT,
  DEFAULT_TRANSLATION_PROMPT,
  translateImage,
} from "./services/modelService";
import type { ModelHealth, TranslationResult } from "./types/model";

type SelectedImage = {
  file: File;
  previewUrl: string;
  base64: string;
};

const milestones = [
  "联调本地 Qwen2.5-VL 接口",
  "接入区域截图",
  "加入结果悬浮窗",
  "接入托盘与全局快捷键",
];

async function fileToDataUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function extractBase64(dataUrl: string): string {
  const parts = dataUrl.split(",");
  return parts.length > 1 ? parts[1] : dataUrl;
}

function App() {
  const [endpoint, setEndpoint] = useState(DEFAULT_MODEL_ENDPOINT);
  const [prompt, setPrompt] = useState(DEFAULT_TRANSLATION_PROMPT);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [health, setHealth] = useState<ModelHealth | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [translationLoading, setTranslationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const healthSummary = useMemo(() => {
    if (!health) {
      return "未检查";
    }

    if (health.ok) {
      return `可用 (${health.status}) / ${health.elapsedMs} ms`;
    }

    if (health.status > 0) {
      return `异常 (${health.status}) / ${health.elapsedMs} ms`;
    }

    return `不可达 / ${health.elapsedMs} ms`;
  }, [health]);

  const onSelectImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setError(null);
    setTranslation(null);

    try {
      const dataUrl = await fileToDataUrl(file);
      setSelectedImage({
        file,
        previewUrl: dataUrl,
        base64: extractBase64(dataUrl),
      });
    } catch (readError) {
      setSelectedImage(null);
      setError(readError instanceof Error ? readError.message : "读取图片失败");
    }
  };

  const onCheckHealth = async () => {
    setHealthLoading(true);
    setError(null);

    try {
      const endpointUrl = new URL(endpoint);
      const hostOnly = `${endpointUrl.protocol}//${endpointUrl.host}`;
      const result = await checkModelHealth(hostOnly);
      setHealth(result);
    } catch (healthError) {
      setHealth({
        ok: false,
        status: 0,
        elapsedMs: 0,
        message: healthError instanceof Error ? healthError.message : "探活失败",
      });
      setError(healthError instanceof Error ? healthError.message : "探活失败");
    } finally {
      setHealthLoading(false);
    }
  };

  const onTranslate = async () => {
    if (!selectedImage) {
      setError("请先导入一张图片");
      return;
    }

    setTranslationLoading(true);
    setError(null);

    try {
      const result = await translateImage(selectedImage.base64, {
        endpoint,
        prompt,
      });
      setTranslation(result);
    } catch (translateError) {
      setTranslation(null);
      setError(translateError instanceof Error ? translateError.message : "翻译失败");
    } finally {
      setTranslationLoading(false);
    }
  };

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Windows Screenshot Translator</p>
        <h1>本地模型截图翻译 PoC</h1>
        <p className="lead">
          当前页面用于联调本地 Qwen2.5-VL 服务，目标是先验证图片请求格式、返回结构和翻译质量。
        </p>
      </section>

      <section className="grid topGrid">
        <article className="card panel">
          <h2>服务配置</h2>
          <label className="field">
            <span>接口地址</span>
            <input value={endpoint} onChange={(event) => setEndpoint(event.target.value)} />
          </label>
          <label className="field">
            <span>提示词</span>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={5}
            />
          </label>
          <div className="buttonRow">
            <button type="button" onClick={onCheckHealth} disabled={healthLoading}>
              {healthLoading ? "检查中..." : "检查服务"}
            </button>
            <button type="button" onClick={onTranslate} disabled={translationLoading || !selectedImage}>
              {translationLoading ? "翻译中..." : "发送翻译请求"}
            </button>
          </div>
          <div className="statusBlock">
            <div>
              <strong>服务状态：</strong>
              <span>{healthSummary}</span>
            </div>
            {health?.message ? <div className="statusError">{health.message}</div> : null}
          </div>
        </article>

        <article className="card panel">
          <h2>图片输入</h2>
          <label className="uploadBox">
            <input type="file" accept="image/*" onChange={onSelectImage} />
            <span>选择一张截图或图片文件</span>
            <small>当前阶段先手动导图，截图能力后续接入</small>
          </label>
          {selectedImage ? (
            <>
              <div className="metaRow">
                <span>{selectedImage.file.name}</span>
                <span>{Math.round(selectedImage.file.size / 1024)} KB</span>
              </div>
              <img className="preview" src={selectedImage.previewUrl} alt="Selected preview" />
            </>
          ) : (
            <div className="placeholder">尚未选择图片</div>
          )}
        </article>
      </section>

      <section className="grid lowerGrid">
        <article className="card panel">
          <h2>翻译结果</h2>
          {translation ? (
            <>
              <div className="metaRow">
                <span>模型：{translation.model}</span>
                <span>耗时：{translation.elapsedMs} ms</span>
              </div>
              <pre className="resultBlock">{translation.translatedText || "模型返回空文本"}</pre>
            </>
          ) : (
            <div className="placeholder">尚未返回译文</div>
          )}
          {error ? <div className="errorBanner">{error}</div> : null}
        </article>

        <article className="card panel">
          <h2>原始响应</h2>
          <pre className="rawBlock">
            {translation?.rawResponse
              ? JSON.stringify(translation.rawResponse, null, 2)
              : "等待模型返回 JSON"}
          </pre>
        </article>

        <article className="card panel">
          <h2>项目里程碑</h2>
          <ul>
            {milestones.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="endpoint">POST {DEFAULT_MODEL_ENDPOINT}</div>
        </article>
      </section>
    </main>
  );
}

export default App;
