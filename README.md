# TransPilot

`TransPilot` 是一个面向 Windows 的截图、识图、翻译与表格识别工具，核心定位是：

- 本地截图处理
- 本地多模态模型推理
- 支持公司内网 / 自托管 `llama.cpp`
- 适合数据敏感场景

GitHub 仓库：
[https://github.com/xuxk-cn/TransPilot](https://github.com/xuxk-cn/TransPilot)

## 核心功能

- 截图-识图-翻译
- 截图表格识别并导出 Excel
- 保存截图图片
- 支持本地 `llama.cpp + Qwen2.5-VL`
- 支持连接公司内部部署的 `llama.cpp` 服务
- 支持界面语言和翻译目标语言切换

## 适用场景

### B2B / 团队内部工具

- 外贸
- 制造业
- 海外资料阅读
- 招投标 / 预算表识别
- 内网环境
- 数据敏感部门

### 专业个人用户

- 需要长期处理外语截图
- 不信任云端上传
- 希望本地模型可控

## 技术栈

- Windows WPF
- `Qwen2.5-VL`
- `llama.cpp / llama-server`
- 本地截图流程

## 快速开始

### 方式 1：使用完整包

下载完整发布包后，解压并运行：

- `TransPilot.exe`

完整包内已包含：

- `llama.cpp`
- `Qwen2.5-VL-7B-Instruct-q4_k_m.gguf`
- `mmproj-F16.gguf`
- 默认配置文件

### 方式 2：自行部署模型服务

如果你已有本地或公司服务器上的 `llama.cpp` 服务：

1. 启动 `llama-server`
2. 在应用设置中配置服务地址
3. 保存后直接使用

## 下载与文档

- [帮助文档](./帮助文档.md)
- [普通用户下载版帮助文档](./普通用户下载版帮助文档.md)
- [管理员部署版帮助文档](./管理员部署版帮助文档.md)
- [发布下载说明](./RELEASES.md)

## 部署说明

如果需要在公司服务器部署：

- 可使用 `llama.cpp` 启动 `Qwen2.5-VL`
- 客户端统一连接公司内网服务地址
- 适合多人共享、统一维护、集中更新

详细说明见：

- [管理员部署版帮助文档](./管理员部署版帮助文档.md)

## 许可证

本项目当前使用 [MIT License](./LICENSE)。
