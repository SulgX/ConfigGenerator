# ⚡ Config Generator – Xray / V2Ray / Sing‑box

A web‑based tool to quickly generate identical configuration files for **Xray**, **V2Ray**, and **Sing‑box** using **VLESS**, **VMess**, **Trojan**, or **Shadowsocks** protocols. Perfect for testing multiple clean IPs/domains with the same settings.

## ✨ Features

- **Import subscription links** (vless://, vmess://, trojan://, ss://) – auto‑fill all fields
- **Adjust all parameters**: core type, network (TCP, WS, gRPC, QUIC, etc.), TLS/Reality, transport options
- **Batch generation** – paste a list of IPs/domains and get configs for all of them
- **Two output modes**: full JSON config or shareable connection links
- **Ping test** (WebSocket only) – measure latency and find the fastest server
- **Presets** – save/load your favourite setups in browser storage
- **Subscription Base64 export** – ready for import into clients
- **QR code** – scan to quickly add configs to mobile devices
- **Copy, download** individual configs or the whole list

## 🚀 Quick Start

1. (Optional) Paste a subscription link in the top box and click **Parse & Apply**.
2. Choose your **Core** (Xray / V2Ray / Sing‑box) and **Protocol** (VLESS, VMess, Trojan, SS).
3. Set the **Network**, **Security**, and other transport options as needed.
4. Enter your IPs or domains in the **IP / Domain List** (one per line).
5. Click **Generate Configs**.
6. Switch between **JSON** and **Links** tabs to see the output.
7. Use the buttons to **copy**, **download**, test **ping**, or get a **QR code**.

## ⚠️ Important Note

The **Ping** feature works reliably only for **WebSocket** transport. For other transports, it will show "N/A". Use the confirmation dialog to proceed anyway.

## 🌐 Live Demo

Try the tool online at: **[Worker.js](https://confgen.sulgx.workers.dev)**

## 📖 Credits

Made by [SulgX](https://github.com/SulgX) for the people of Iran 🇮🇷
