# TransPilot
## 1. 产品定位

`TransPilot` 是一个 Windows 截图、识别与翻译工具，当前主要面向这几类场景：

- 截图后识别图片中的文字，并翻译到指定目标语言

- 截图后识别表格，并导出为 Excel

- 截图识别图中内容

- 本地部署模型，避免把业务核心数据、图片上传到外部云服务

  当前项目默认围绕 `llama.cpp + Qwen2.5-VL` 设计。原因很明确：

- 截图翻译本质上需要视觉理解，不是纯文本翻译

- 表格识别也依赖图像内容识别

- 因此模型必须是**多模态模型**，不能只用纯文本模型

## 1.1 适合人群与核心卖点

这个产品更适合以下两类市场：

### A. B2B / 团队内部工具

适合行业和场景：

- 外贸

- 制造业

- 海外资料阅读

- 招投标 / 预算表识别

- 内网环境

- 数据敏感部门

  为什么适合：

- 截图和文档内容可以本地处理

- 不需要把图片上传到外部云服务

- 可以统一部署到公司服务器

- 适合多人共享和集中维护

- 对表格识别、截图翻译这类办公场景更实用

### B. 专业个人用户

适合人群：

- 需要长期处理外语截图

- 不信任云端上传

- 希望本地模型可控

  为什么适合：

- 本地部署可控

- 可按机器配置选择模型

- 更适合长期高频使用，而不是一次性尝鲜

### 当前产品的主要卖点

相比普通“拍照翻译 / 图片翻译”工具，`TransPilot` 的核心卖点在于：

- Windows 截图工作流更直接
- 本地部署 `Qwen2.5-VL + llama.cpp`
- 截图直接识图、提取文字、翻译
- 适合隐私要求高的环境
- 支持表格识别并导出 Excel
- 可接公司服务器统一部署

## 2. 主要功能

### 2.1 截屏-识图-翻译

用户点击 `截屏-识图-翻译` 或按 `Alt+Q` 后，程序会：

1. 触发截图

2. 获取截图，可存图、识图、提取文字、翻译

3. 用本地视觉模型识别图片中的文字

4. 按设置中的目标语言输出翻译结果

   适用场景：

- 软件界面文字翻译
- PDF/图片中的段落翻译
- 海外网页、文档、聊天截图翻译

### 2.2 表格识别

用户点击 `表格识别` 或按 `Alt+E` 后，程序会：

1. 触发截图

2. 识别截图中的表格内容

3. 导出为 Excel 文件

   适用场景：

- 报价单、预算表、清单截图
- PDF 中的表格
- 网页表格截图

### 2.3 保存截图

在主界面的 `截图内容` 区域右侧提供 `保存图片` 按钮。

作用：

- 用户可以把本次截图直接保存为 `PNG`
- 便于留档、二次发送、问题复查

### 2.4 模型服务检查

程序会检查当前配置的模型服务地址是否可用。

当前逻辑：

- 应用启动时：先检测服务状态
- 点击 `检查服务` 时：如配置允许，会尝试拉起内置 `llama-server`
- 点击 `截屏-识图-翻译` 或 `表格识别` 时：如果服务未就绪，也会先尝试拉起

## 3. 用户侧本地模型配置

## 3.1 基本原则

这个应用如果要做**截图识别 + 翻译**，推荐优先使用 `Qwen2.5-VL` 系列。

原因：

- 它是视觉语言模型，能直接理解截图内容

- 官方提供 `3B / 7B / 72B` 多个尺寸

- 对文本、图表、布局有较强能力

  这里有一个关键点：

- 纯文本模型只适合“已有文字后的翻译”

- 不适合“直接看图识字”

- 所以对 `TransPilot` 来说，纯文本模型不能替代视觉模型

## 3.2 推荐模型档位

以下建议是基于官方公开模型尺寸，加上本项目实际部署经验做出的工程建议。

### A. 低配机器

适合场景：

- 轻薄本

- 无独显

- 老机器

- 内存偏紧

  推荐：

- `Qwen2.5-VL-3B-Instruct` 的 GGUF 量化版本

  建议：

- 优先 `q4` 或更轻的量化

- 这类机器以“能跑起来”为第一目标

- 截图翻译可用，但速度和复杂图片准确率会弱一些

### B. 主流桌面机 / 笔记本

适合场景：

- 有 NVIDIA 显卡

- 6GB以上显存更理想

- 日常办公或个人使用

  推荐：

- `Qwen2.5-VL-7B-Instruct`

- 当前项目默认用的就是：

  - `Qwen2.5-VL-7B-Instruct-q4_k_m.gguf`

  - `mmproj-F16.gguf`

    这是当前最平衡的方案：

- 识图能力够用

- 翻译质量较稳

- 本地部署成本还可接受

### C. 公司服务器 / 高性能机器

适合场景：

- 共享 GPU 服务器

- 多人使用

- 对准确率要求更高

  推荐：

- `Qwen2.5-VL-7B-Instruct`

- 或更高规格的 `Qwen2.5-VL-72B` 级别模型

  但要明确：

- `72B` 更适合服务器，不适合普通员工桌面机

- 对显存、吞吐、部署维护要求明显更高

- 如果目标是“企业内多人共享识图翻译服务”，服务器端上更大模型才有意义

## 3.3 当前项目默认模型结构

当前程序内置目录约定是：

```text
TransPilot/
  TransPilot.exe
  config/
    settings.json
  runtime/
    llama.cpp/
      llama-server.exe
      *.dll
    models/
      Qwen2.5-VL-7B-Instruct-q4_k_m.gguf
      mmproj-F16.gguf
  logs/
  temp/
```

程序默认查找：

- 模型：
  - `runtime/models/Qwen2.5-VL-7B-Instruct-q4_k_m.gguf`
    下载地址：
  - [单击直接下载 Qwen2.5-VL-7B-Instruct-Q4_K_M.gguf](https://huggingface.co/ggml-org/Qwen2.5-VL-7B-Instruct-GGUF/resolve/main/Qwen2.5-VL-7B-Instruct-Q4_K_M.gguf)

- 多模态投影：
  - `runtime/models/mmproj-F16.gguf`
    下载地址：
  - [单击直接下载 mmproj-F16.gguf](https://huggingface.co/unsloth/Qwen2.5-VL-7B-Instruct-GGUF/resolve/main/mmproj-F16.gguf)

- 服务程序：
  - `runtime/llama.cpp/llama-server.exe`
    下载地址：
  - `llama.cpp` 官方 Release 页面：
    [https://github.com/ggml-org/llama.cpp/releases](https://github.com/ggml-org/llama.cpp/releases)
  - Windows 用户请优先下载带有以下关键词的压缩包：
    - `bin-win-cuda-x64`
  - 如果你的机器没有 NVIDIA CUDA 环境，可改选：
    - `bin-win-vulkan-x64`
    - 或 `bin-win-openblas-x64`
  - 下载后解压，取出其中的：
    - `llama-server.exe`
    - 同目录下全部 `.dll`
  - 放到：
    - `runtime/llama.cpp/`

### 3.3.1 下载步骤建议

为了避免用户打开下载页面后不知道选哪个文件，建议按下面顺序操作。

#### 第一步：下载主模型

直接点击：

- [下载 Qwen2.5-VL-7B-Instruct-Q4_K_M.gguf](https://huggingface.co/ggml-org/Qwen2.5-VL-7B-Instruct-GGUF/resolve/main/Qwen2.5-VL-7B-Instruct-Q4_K_M.gguf)

  下载后文件名应为：

- `Qwen2.5-VL-7B-Instruct-Q4_K_M.gguf`

  然后把它重命名或放置为：

- `runtime/models/Qwen2.5-VL-7B-Instruct-q4_k_m.gguf`

#### 第二步：下载 mmproj

直接点击：

- [下载 mmproj-F16.gguf](https://huggingface.co/unsloth/Qwen2.5-VL-7B-Instruct-GGUF/resolve/main/mmproj-F16.gguf)

  下载后文件名应为：

- `mmproj-F16.gguf`

  放到：

- `runtime/models/mmproj-F16.gguf`

#### 第三步：下载 llama.cpp

Windows 用户可以直接点下面的链接下载：

- 有 NVIDIA 显卡，优先下载：

  - [单击直接下载 llama.cpp Windows CUDA x64 包](https://github.com/ggml-org/llama.cpp/releases/download/b8733/llama-b8733-bin-win-cuda-x64.zip)

- 如果没有 NVIDIA 显卡，可下载 CPU 版：

  - [单击直接下载 llama.cpp Windows CPU x64 包](https://github.com/ggml-org/llama.cpp/releases/download/b8733/llama-b8733-bin-win-cpu-x64.zip)

    如果你想自己查看其他版本，也可以打开：

- [llama.cpp Release 页面](https://github.com/ggml-org/llama.cpp/releases)

  下载并解压后，复制这些文件到：

- `runtime/llama.cpp/`

  至少包括：

- `llama-server.exe`

- `llama.dll`

- `ggml.dll`

- 其他同目录下随包附带的 `.dll`

### 3.3.2 Windows 用户最简建议

如果用户不想研究太多版本，Windows 环境建议优先这样选：

- 有 NVIDIA 显卡：

  - 点击下载：
    [llama.cpp Windows CUDA x64](https://github.com/ggml-org/llama.cpp/releases/download/b8733/llama-b8733-bin-win-cuda-x64.zip)

- 没有 NVIDIA 显卡：

  - 点击下载：
    [llama.cpp Windows CPU x64](https://github.com/ggml-org/llama.cpp/releases/download/b8733/llama-b8733-bin-win-cpu-x64.zip)

    这样最不容易选错。

## 3.4 用户如何切换自己的模型

如果用户自己已经有模型服务，不一定非要用打包版内置模型。

方式有两种：

### 方式一：直接改服务地址

在程序设置里修改：

- 模型服务地址

  例如：

- `http://127.0.0.1:8081`

- `http://192.168.1.20:8081`

- `http://server-name:8081`

  这适合：

- 用户已有自己的 `llama.cpp` 服务

- 或公司内部已有统一模型服务

### 方式二：替换打包目录中的模型文件

如果仍然使用程序打包目录中的 `runtime/models`，则可以替换：

- `.gguf` 主模型

- `mmproj` 文件

  前提：

- 新模型必须与 `llama.cpp` 兼容

- 必须是适合视觉输入的模型

- `mmproj` 必须与主模型版本匹配

  否则容易出现：

- 服务启动失败

- 图片处理失败

- 识图结果异常

## 4. 公司服务器上如何配置 llama.cpp

## 4.1 适合的部署方式

公司服务器部署的目标通常是：

- 多人共用

- 统一模型版本

- 降低终端机器负担

- 便于统一维护和日志审计

  推荐方式：

- 在服务器上单独部署 `llama.cpp`

- 启动 `llama-server`

- 所有客户端把 `ApiBaseUrl` 指向该服务器

  这样客户端只负责：

- 截图

- 上传图片到内网服务

- 接收翻译/识别结果

## 4.2 Windows 服务器部署示例

假设目录如下：

```text
D:\TransPilot\llama.cpp
D:\TransPilot\LocalAI\models\Qwen2.5-VL-7B-Instruct-q4_k_m.gguf
D:\TransPilot\LocalAI\models\mmproj-F16.gguf
```

启动命令可参考：

```bat
llama-server.exe ^
  -m "D:\TransPilot\LocalAI\models\Qwen2.5-VL-7B-Instruct-q4_k_m.gguf" ^
  --mmproj "D:\TransPilot\LocalAI\models\mmproj-F16.gguf" ^
  -c 2048 ^
  -ngl 25 ^
  -t 8 ^
  --port 8081 ^
  --host 0.0.0.0
```

参数说明：

- `-m`：主模型 GGUF 文件
- `--mmproj`：视觉投影文件
- `-c`：上下文长度
- `-ngl`：GPU 卸载层数
- `-t`：CPU 线程数
- `--port`：服务端口
- `--host 0.0.0.0`：允许局域网内客户端访问

## 4.3 Linux 服务器部署示例

如果公司服务器是 Linux，可按同样思路部署：

```bash
./llama-server \
  -m /opt/models/Qwen2.5-VL-7B-Instruct-q4_k_m.gguf \
  --mmproj /opt/models/mmproj-F16.gguf \
  -c 2048 \
  -ngl 25 \
  -t 8 \
  --port 8081 \
  --host 0.0.0.0
```

建议：

- 放到 `systemd` 服务里管理
- 把日志单独落盘
- 统一从反向代理或防火墙控制访问

## 4.4 服务器部署建议

### 网络建议

- 不建议直接暴露到公网
- 优先部署在公司内网
- 客户端通过局域网访问

### 端口建议

- 默认可用 `8081`
- 如果公司已有其他推理服务，可统一规划端口

### 日志建议

至少保留：

- 服务启动日志

- 标准输出/错误输出

- 模型加载日志

- 崩溃日志

  当前项目打包版默认日志目录：

- `logs/llama-server.log`

### 运行方式建议

生产环境不要让用户手工点批处理。

更合适的做法：

- 服务器端由运维或管理员统一启动 `llama-server`

- 客户端只填服务器地址

  如果后面要进一步正规化，可以做：

- Windows 服务

- `systemd`

- 计划任务开机自启

- 反向代理

- 健康检查

## 4.5 客户端如何接入公司服务器

客户端只需要在设置中修改：

- 模型服务地址

  例如：

- `http://10.10.10.20:8081`

  然后：

- 关闭“自动启动内置 llama.cpp 服务”

  这样程序就不会尝试启动本地内置服务，而是直接用公司服务器。

## 4.6 公司多人使用时，llama.cpp 是否支持并发

支持，但不是无限并发。

`llama.cpp` 的 `llama-server` 支持多人请求和并行解码，但并发能力受这些因素共同限制：

- 模型大小

- 显存 / 内存

- 上下文长度 `-c`

- 并发槽位 `-np`

- GPU 性能

- 图片大小

- 输出 token 数量

  可以这样理解：

- `-c` 是总上下文资源

- `-np` 是并发槽位数

- 槽位越多，单个请求能分到的上下文就越少

  也就是说：

- 并发不是白来的

- 提高并发通常意味着单请求资源变少

### 推荐理解方式

例如：

```bash
llama-server -m model.gguf -c 16384 -np 4
```

这表示：

- 总上下文为 `16384`
- 最多允许 `4` 个并发槽位
- 每个请求大致分到总资源的一部分

### 对公司场景的建议

如果是公司内部多人使用 `TransPilot`，建议不要继续用单机调试时那种单用户参数，而要改成共享服务参数。

### 小团队

适合：

- 5 人左右

- 偶发使用

- 高峰不明显

  建议：

- `Qwen2.5-VL-7B`

- 单实例

- `-c 16384 -np 4`

### 中等团队

适合：

- 10 到 30 人

- 白天有明显并发

  建议：

- `Qwen2.5-VL-7B`

- 多实例部署

- 每个实例 `-np 3` 或 `-np 4`

- 客户端通过不同端口或反向代理访问

### 高频使用场景

适合：

- 大量用户同时请求

- 高频截图翻译和表格识别

  建议：

- 不要只依赖单个 `llama-server`

- 需要做实例池、分流、限流和监控

### 为什么视觉模型并发更敏感

`TransPilot` 使用的是视觉模型，不是纯文本模型。

视觉请求通常比纯文本请求更重，因此：

- 更吃显存

- 更吃推理时间

- 并发能力会更保守

  所以公司的多人共享部署，建议优先采用：

- 较小并发

- 多实例

- 客户端轻量请求

  而不是：

- 单实例

- 超大并发

- 超大图片

- 超长输出

### 客户端侧的配合建议

如果公司服务器要支持多人并发，客户端也应该尽量降低单次请求成本：

- 截图先压缩

- 不要给过长提示词

- 不要设置过大的 `max_tokens`

- 表格识别尽量避免模型输出长篇解释

  这样可以明显提高多人共享时的可用性。

## 4.7 公司服务器推荐参数模板

下面给出几组可以直接落地的参数模板。它们不是唯一答案，但适合作为公司内部部署的起点。

### 模板 A：单机共享，5 人左右

适合：

- 小团队

- 使用频率不高

- 主要做截图翻译

  推荐参数：

```bash
llama-server \
  -m /opt/models/Qwen2.5-VL-7B-Instruct-q4_k_m.gguf \
  --mmproj /opt/models/mmproj-F16.gguf \
  -c 16384 \
  -np 4 \
  -ngl 25 \
  -t 8 \
  --port 8081 \
  --host 0.0.0.0
```

说明：

- `-c 16384`：给多人共享留足总上下文
- `-np 4`：允许 4 个并发槽位
- `-ngl 25`：适合你们当前这类 GPU 卸载方式
- `-t 8`：是较稳的 CPU 线程起点

### 模板 B：10 到 20 人共享

适合：

- 白天有并发高峰

- 既做截图翻译，也做表格识别

  推荐参数：

```bash
llama-server \
  -m /opt/models/Qwen2.5-VL-7B-Instruct-q4_k_m.gguf \
  --mmproj /opt/models/mmproj-F16.gguf \
  -c 24576 \
  -np 6 \
  -ngl 25 \
  -t 12 \
  --port 8081 \
  --host 0.0.0.0
```

说明：

- 相比小团队模板，提高总上下文和槽位数
- 适合中等并发，但更吃显存和内存

### 模板 C：推荐的多实例方式

如果并发明显上升，不建议无限提高单实例的 `-np`，而是建议多实例部署。

例如同一台服务器起 2 个实例：

#### 实例 1

```bash
llama-server \
  -m /opt/models/Qwen2.5-VL-7B-Instruct-q4_k_m.gguf \
  --mmproj /opt/models/mmproj-F16.gguf \
  -c 16384 \
  -np 4 \
  -ngl 25 \
  -t 8 \
  --port 8081 \
  --host 0.0.0.0
```

#### 实例 2

```bash
llama-server \
  -m /opt/models/Qwen2.5-VL-7B-Instruct-q4_k_m.gguf \
  --mmproj /opt/models/mmproj-F16.gguf \
  -c 16384 \
  -np 4 \
  -ngl 25 \
  -t 8 \
  --port 8082 \
  --host 0.0.0.0
```

优点：

- 比单实例硬顶更稳
- 某个实例异常时不至于全部中断
- 更方便后续做反向代理和负载分配

### Windows 服务器批处理模板

如果公司服务器是 Windows，可以直接用批处理：

```bat
@echo off
chcp 65001 >nul
cd /d D:\TransPilot\llama.cpp
llama-server.exe ^
  -m "D:\TransPilot\models\Qwen2.5-VL-7B-Instruct-q4_k_m.gguf" ^
  --mmproj "D:\TransPilot\models\mmproj-F16.gguf" ^
  -c 16384 ^
  -np 4 ^
  -ngl 25 ^
  -t 8 ^
  --port 8081 ^
  --host 0.0.0.0
```

### 参数调整建议

#### 当服务很慢时

优先检查：

- GPU 是否真的参与推理
- 图片是否过大
- `max_tokens` 是否设置过高
- 请求是否过长

#### 当并发时经常失败

优先调整：

- 先提高 `-c`
- 再评估 `-np`
- 不够时改成多实例

#### 当显存不足时

优先调整：

- 降低模型规格
- 降低 `-ngl`
- 降低并发
- 优先减少单实例压力

### 最后的工程建议

如果公司要正式多人使用，建议先做一次最小压测：

- 5 个并发用户

- 每人连续发 10 次截图翻译

- 再测表格识别

  重点观察：

- 平均响应时间

- 峰值响应时间

- GPU 显存占用

- 服务是否掉线

- 是否出现上下文不足或图片处理失败

  压测过后，再决定：

- 用单实例

- 还是改成多实例

- 是否需要更大的模型或更强的 GPU

## 5. 推荐部署方案

## 5.1 单机本地版

适合：

- 个人使用

- 不依赖公司网络

  方案：

- 程序目录自带 `llama.cpp + 7B 模型 + mmproj`

- 用户解压后即可使用

  优点：

- 独立

- 隐私好

- 不依赖服务器

  缺点：

- 包体大

- 首次加载慢

- 占用本机资源

## 5.2 公司共享服务器版

适合：

- 多人使用

- 公司内部统一服务

  方案：

- 服务器统一部署 `llama.cpp`

- 客户端只保留 `TransPilot.exe`

- 客户端把服务地址指向公司服务器

  优点：

- 客户端轻

- 模型统一

- 运维集中

  缺点：

- 依赖网络

- 服务端压力更大

## 5.3 当前推荐

如果是当前项目落地，建议优先这样分：

- 个人离线版：继续用 `Qwen2.5-VL-7B-Instruct-q4_k_m.gguf`

- 公司共享版：服务器统一部署 `Qwen2.5-VL-7B-Instruct`，客户端统一指向内网地址

  这条路线最稳，成本也最可控。

## 6. 常见问题

### 6.1 为什么不能只用文本模型？

因为这个应用要先“看懂截图”，文本模型看不懂图片。

### 6.2 为什么需要 `mmproj`？

因为多模态模型在 `llama.cpp` 下通常需要视觉投影文件，缺少它会导致图片输入不可用。

### 6.3 为什么有时识图慢？

影响因素包括：

- 模型尺寸
- 量化等级
- 是否启用 GPU
- 显存大小
- 图片尺寸
- 并发数

### 6.4 为什么服务器版更适合多人使用？

因为模型只在服务器加载一次，客户端不需要每台机器都承担大模型启动成本。

## 7. 官方资料

- `llama.cpp` 官方仓库：
  [https://github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)

- `Qwen2.5-VL` 官方介绍：
  [https://qwen.ai/blog?id=qwen2.5-vl](https://qwen.ai/blog?id=qwen2.5-vl)

  说明：

- `Qwen2.5-VL` 官方公开提供 `3B / 7B / 72B` 尺寸，这是模型选型建议的依据

- `llama.cpp` 官方 README 明确提供了 `llama-server` 的 OpenAI 兼容服务模式和基础启动方式
