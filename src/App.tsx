import {
  DEFAULT_MODEL_ENDPOINT,
  DEFAULT_TRANSLATION_PROMPT,
} from "./services/modelService";

const milestones = [
  "联调本地 Qwen2.5-VL 接口",
  "接入区域截图",
  "加入结果悬浮窗",
  "接入托盘与全局快捷键",
];

const nextActions = [
  "确认 llama-server 的多模态请求格式",
  "实现 translateImage 服务层",
  "实现截图选区窗口",
];

function App() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Windows Screenshot Translator</p>
        <h1>本地模型截屏翻译</h1>
        <p className="lead">
          当前项目骨架已建立。首版目标是打通“截图 -&gt; 本地模型翻译 -&gt;
          结果展示”闭环。
        </p>
      </section>

      <section className="grid">
        <article className="card">
          <h2>当前架构</h2>
          <ul>
            <li>前端：React + TypeScript + Vite</li>
            <li>桌面壳：Tauri 2</li>
            <li>模型服务：本地 llama-server，默认 `127.0.0.1:8081`</li>
            <li>目标模型：Qwen2.5-VL-7B-Instruct</li>
          </ul>
        </article>

        <article className="card">
          <h2>里程碑</h2>
          <ul>
            {milestones.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>下一步</h2>
          <ul>
            {nextActions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card emphasis">
          <h2>联调目标</h2>
          <p>需要尽快确认本地模型接口能否接受 Base64 图片输入，并返回稳定译文。</p>
          <div className="endpoint">POST {DEFAULT_MODEL_ENDPOINT}</div>
          <p className="promptLabel">默认提示词</p>
          <p className="promptText">{DEFAULT_TRANSLATION_PROMPT}</p>
        </article>
      </section>
    </main>
  );
}

export default App;
