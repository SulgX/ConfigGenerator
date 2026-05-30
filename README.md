# ⚡ Config Generator V1.1 – Xray / V2Ray / Sing‑box

A powerful browser‑based tool to create identical configuration files for **Xray**, **V2Ray**, and **Sing‑box** using **VLESS**, **VMess**, **Trojan**, or **Shadowsocks** protocols.  
Perfect for testing clean IPs and domains with a single profile.

## 🆕 What's New in V1.1

- **Profile management** – save, edit, and switch between multiple profiles (stored in your browser).
- **Import as Profiles** – paste multiple subscription links; each turns into a separate editable profile.
- **Custom fields** – fingerprint, ALPN, VLESS flow/encryption, and Shadowsocks method now support arbitrary “Custom…” values.
- **Allow Insecure** – toggle for self‑signed certificates (applied to TLS in both Xray/V2Ray and Sing‑box).
- **Flexible port selection** – pre‑defined ports plus custom ones (custom ports can be removed).
- **Smart naming** – three styles: plain numbers, emoji, or country flag/code – with live preview.
- **Improved IPv6 handling** – addresses automatically formatted for links.
- **QR code in ping results** – scan directly from the latency table.
- **Dark / light theme** – switch with a floating button, preference saved.

## ✨ Core Features

- **Import subscription links** (vless://, vmess://, trojan://, ss://) – auto‑fill all settings.
- **Full transport support:** TCP, WebSocket, gRPC, HTTP/2, mKCP, QUIC, HTTP Upgrade, SplitHTTP, XHTTP.
- **TLS & Reality security** with SNI, fingerprint, ALPN, public key, short ID, and spider X.
- **Batch generation** – paste a list of IPs/domains (IPv4/IPv6) and get configs for all selected ports.
- **Dual output:** full JSON (Xray/V2Ray or Sing‑box) or shareable links.
- **Ping test (WebSocket only)** – measure latency, sort results, copy links, and scan QR.
- **Subscription Base64 export** – ready for import into any client.
- **Copy, download** individual configs or the whole batch.

## 🚀 Quick Start

1. (Optional) Paste one or more subscription links in the top box and click **Import as Profiles**.
2. Choose a **Profile** from the table – its settings load into the form.
3. Adjust the **Core** (Xray / V2Ray / Sing‑box), **Protocol**, network, security, and other options.
4. Select one or more **Ports** by clicking them (add custom ones if needed).
5. Enter your IPs or domains in the **IP / Domain List** (one per line, IPv6 supported).
6. Click **Generate Configs**.
7. Switch between **JSON** and **Links** tabs to view the output.
8. Use **Copy**, **Download**, **Ping**, or **QR** buttons as needed.

## ⚠️ Important Note

The **Ping** feature works reliably only for **WebSocket** transport. For other transports it shows “N/A”. You can proceed by confirming the warning.

## 🌐 Live Demo

Try the tool online at:  
**[sulgx.github.io/ConfigGenerator](https://sulgx.github.io/ConfigGenerator)**

## 📖 Credits

Made by [SulgX](https://github.com/SulgX) for the people of Iran 
