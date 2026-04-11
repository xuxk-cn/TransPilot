# Releases 下载说明

GitHub 仓库：
[https://github.com/xuxk-cn/TransPilot](https://github.com/xuxk-cn/TransPilot)

## 当前推荐版本

### 1. 标准包

适合：

- 已有本地 `llama.cpp` 环境的用户
- 已有公司服务器模型服务的用户
- 不需要随包携带大模型的用户

发布文件：

- `TransPilot-v1.0.0.zip`

内容：

- `TransPilot.exe`
- 帮助文档

### 2. 完整包

适合：

- 希望解压后直接运行的用户
- 本地单机使用
- 不想手动配置 `llama.cpp` 和模型的用户

发布文件：

- `TransPilot-v1.0.0-full.zip`

内容：

- `TransPilot.exe`
- `runtime\llama.cpp`
- `runtime\models\Qwen2.5-VL-7B-Instruct-q4_k_m.gguf`
- `runtime\models\mmproj-F16.gguf`
- 默认配置文件
- 帮助文档

## 选择建议

### 如果你属于普通用户

优先下载：

- `TransPilot-v1.0.0-full.zip`

原因：

- 解压即可使用
- 不需要手动补模型文件
- 不需要单独部署 `llama.cpp`

### 如果你属于管理员 / 公司 IT

优先下载：

- `TransPilot-v1.0.0.zip`

原因：

- 更适合集成到已有内网部署环境
- 客户端更轻
- 方便统一连接公司服务器

## 注意事项

- 完整包体积较大，因为包含模型文件
- 标准包体积较小，但需要你自行准备模型服务
- 如果公司多人使用，建议统一部署公司服务器版 `llama.cpp`
