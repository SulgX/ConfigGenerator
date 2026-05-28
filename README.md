# ⚡ Config Generator – Xray / V2Ray / Sing‑box

A web‑based tool to quickly generate identical configuration files for **Xray**, **V2Ray**, and **Sing‑box** using **VLESS**, **VMess**, **Trojan**, or **Shadowsocks** protocols.  
Perfect for testing clean IPs and domains with the same settings.

## ✨ Features

- **Import subscription links** (vless://, vmess://, trojan://, ss://) – auto‑fill all fields
- **Full parameter control**: core type, network (TCP, WS, gRPC, QUIC, etc.), TLS/Reality security, transport options
- **Batch generation** – paste a list of IPs/domains and get configs for all of them at once
- **IPv6 support** – enter addresses with or without brackets; links are automatically formatted
- **Two output modes**: full JSON config or shareable connection links
- **Ping test** (WebSocket only) – measure latency and find the fastest server
- **Presets** – save and load your favorite setups in browser storage
- **Subscription Base64 export** – ready to import into clients
- **QR code** – scan to instantly add configs to mobile devices
- **Copy and download** individual or all configs

## 🚀 Quick Start

1. (Optional) Paste a subscription link in the top box and click **Parse & Apply**.
2. Choose the **Core** (Xray / V2Ray / Sing‑box) and **Protocol** (VLESS, VMess, Trojan, SS).
3. Adjust the network, security, and other transport settings as needed.
4. Enter your IPs or domains in the **IP / Domain List** box (one per line).
5. Click **Generate Configs**.
6. Switch between **JSON** and **Links** tabs to see the output.
7. Use the buttons to **copy**, **download**, **ping**, or get a **QR code**.

## ⚠️ Important Note

The **Ping** feature works reliably only for **WebSocket** transport. For other transports it will show "N/A". You can still proceed by confirming the warning.

## 🌐 Live Demo

Try the tool online at:  
**[Worker.Js](https://confgen.sulgx.workers.dev)**

## 📖 Credits

Made by [SulgX](https://github.com/SulgX) for the people of Iran 🇮🇷
