// worker.js – Full Config Generator Live Demo
// Deploy to Cloudflare Workers to host the complete tool.
export default {
  async fetch(request) {
    const html = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Config Generator – Xray / V2Ray / Sing‑box</title>
    <style>
        :root {
            --bg: #0d1117;
            --surface: #161b22;
            --border: #30363d;
            --text: #c9d1d9;
            --accent: #58a6ff;
            --green: #3fb950;
            --red: #f85149;
            --gold: #ffd700;
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background: var(--bg); color: var(--text); font-family: 'Segoe UI', system-ui, sans-serif; line-height: 1.5; padding: 10px; display: flex; flex-direction: column; min-height: 100vh; }
        .main-container { flex: 1; }
        .header { text-align: center; margin-bottom: 20px; }
        .header h1 { color: var(--accent); font-size: 2rem; }
        .header .subtitle { opacity: 0.6; font-size: 0.9rem; }
        .footer { text-align: center; padding: 15px; margin-top: 30px; border-top: 1px solid var(--border); opacity: 0.9; font-size: 0.9rem; }
        .footer a { color: var(--gold); text-decoration: none; }
        .footer a:visited { color: var(--gold); }
        .footer a:hover { text-decoration: underline; }
        .container { max-width: 1400px; margin: 0 auto; }
        .panel { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 20px; }
        .panel h2 { color: var(--accent); font-size: 1.2rem; margin-bottom: 16px; border-bottom: 1px solid var(--border); padding-bottom: 8px; }
        .grid2col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 768px) { .grid2col { grid-template-columns: 1fr; } .row { flex-wrap: wrap; } .row > * { flex: 1 1 100%; } .btn { padding: 8px 16px; } .protocol-bar button { flex: 1 1 45%; } }
        label { display: block; margin-bottom: 6px; font-size: 0.85rem; }
        input, select, textarea {
            width: 100%; padding: 10px 12px; background: var(--bg); border: 1px solid var(--border);
            border-radius: 8px; color: var(--text); font-size: 0.9rem; font-family: inherit;
            transition: border 0.2s;
        }
        input:focus, select:focus, textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 2px rgba(88,166,255,0.2); }
        textarea { resize: vertical; min-height: 80px; }
        .btn {
            display: inline-flex; align-items: center; justify-content: center;
            padding: 10px 18px; border: none; border-radius: 8px; font-size: 0.85rem;
            font-weight: 600; cursor: pointer; transition: all 0.2s; margin: 4px; gap: 6px;
        }
        .btn-primary { background: var(--accent); color: #fff; }
        .btn-primary:hover { background: #79c0ff; }
        .btn-success { background: var(--green); color: #fff; }
        .btn-success:hover { background: #4cb658; }
        .btn-danger { background: var(--red); color: #fff; }
        .btn-danger:hover { background: #e5534b; }
        .btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text); }
        .btn-outline:hover { border-color: var(--accent); color: var(--accent); }
        .protocol-bar { display: flex; gap: 8px; margin-bottom: 16px; }
        .protocol-bar button {
            flex: 1; background: var(--bg); border: 1px solid var(--border); color: var(--text);
            border-radius: 20px; padding: 8px 0; cursor: pointer; font-weight: 600;
        }
        .protocol-bar button.active { background: var(--accent); border-color: var(--accent); color: #000; }
        .row { display: flex; gap: 10px; align-items: center; }
        .config-card { background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin: 12px 0; position: relative; }
        .config-card h4 { color: var(--accent); margin-bottom: 10px; }
        .config-card pre {
            background: #00000033; padding: 12px; border-radius: 6px; overflow-x: auto;
            font-family: 'JetBrains Mono', 'Cascadia Code', monospace; font-size: 0.8rem;
            color: var(--green); white-space: pre-wrap; word-break: break-all;
            direction: ltr; text-align: left;
        }
        .actions { position: absolute; top: 10px; left: 10px; display: flex; gap: 6px; }
        .btn-sm { padding: 4px 12px; font-size: 0.75rem; }
        .ping-container { max-height: 400px; overflow-y: auto; border: 1px solid var(--border); border-radius: 8px; margin-top: 12px; }
        .ping-table { width: 100%; border-collapse: collapse; direction: ltr; }
        .ping-table th, .ping-table td { border: 1px solid var(--border); padding: 8px; text-align: center; }
        .ping-table th { background: var(--surface); color: var(--accent); position: sticky; top: 0; cursor: pointer; }
        .best { background: rgba(63,185,80,0.15); }
        .notification { position: fixed; top: 20px; right: 20px; background: var(--green); color: #000; padding: 12px 20px; border-radius: 8px; font-weight: bold; z-index: 999; animation: slideIn 0.3s; }
        @keyframes slideIn { from { transform: translateX(100%); } }
        .output-scroll { max-height: 500px; overflow-y: auto; border: 1px solid var(--border); border-radius: 8px; padding: 8px; background: var(--bg); }
        .qr-modal { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); align-items: center; justify-content: center; z-index: 1000; }
        .qr-modal .modal-content { background: var(--surface); padding: 20px; border-radius: 12px; text-align: center; }
        .progress-bar { width: 100%; background: var(--border); border-radius: 4px; height: 6px; margin: 8px 0; }
        .progress-fill { height: 100%; width: 0; background: var(--accent); border-radius: 4px; transition: width 0.2s; }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        #sulgx-link { animation: blink 1.2s infinite; font-weight: bold; }
        #readme-link { margin-left: 15px; color: var(--text); }
        #readme-link:hover { color: var(--accent); }
        input.ltr, textarea.ltr, select.ltr { direction: ltr; text-align: left; }
    </style>
</head>
<body>
<div class="main-container">
    <div class="header">
        <h1>⚡ Config Generator</h1>
        <div class="subtitle">Xray · V2Ray · Sing‑box – VLESS / VMess / Trojan / Shadowsocks</div>
    </div>
    <div class="container">
        <!-- Import -->
        <div class="panel">
            <h2>📥 Import Link(s) – one per line</h2>
            <textarea id="importLink" class="ltr" placeholder="vless://...&#10;trojan://..."></textarea>
            <div style="margin-top:10px;"><button class="btn btn-primary" id="importBtn">🔍 Parse & Apply</button><button class="btn btn-outline" id="clearImportBtn">🗑️ Clear</button></div>
        </div>
        <div class="grid2col">
            <!-- General -->
            <div class="panel">
                <h2>⚙️ General</h2>
                <div class="row" style="margin-bottom:12px;">
                    <div style="flex:1"><label>Core</label><select id="coreType"><option value="xray">Xray</option><option value="v2ray">V2Ray</option><option value="singbox">Sing‑box</option></select></div>
                    <div style="flex:2"><label>Base Name</label><input type="text" id="serverBaseName" class="ltr" value="Server USA" placeholder="Prefix"></div>
                </div>
                <div class="row" style="margin-bottom:12px;">
                    <div><label>Port</label><input type="number" id="port" class="ltr" value="443"></div>
                    <div><label>Network</label><select id="network"><option value="tcp">TCP</option><option value="ws">WebSocket</option><option value="grpc">gRPC</option><option value="h2">HTTP/2</option><option value="kcp">mKCP</option><option value="quic">QUIC</option><option value="httpupgrade">HTTP Upgrade</option><option value="splithttp">SplitHTTP</option><option value="xhttp">XHTTP</option></select></div>
                    <div><label>Security</label><select id="security"><option value="none">None</option><option value="tls">TLS</option><option value="reality">Reality</option></select></div>
                </div>
                <!-- TLS / Reality fields -->
                <div id="tlsRealityFields" style="display:none;"><div class="row"><div><label>SNI</label><input id="sni" class="ltr" placeholder="example.com"></div><div><label>Fingerprint</label><select id="fingerprint" class="ltr"><option value="chrome">Chrome</option><option value="firefox">Firefox</option><option value="safari">Safari</option><option value="ios">iOS</option><option value="android">Android</option><option value="edge">Edge</option><option value="random">Random</option><option value="randomized">Randomized</option></select></div><div><label>ALPN</label><input id="alpn" class="ltr" value="h2,http/1.1"></div></div></div>
                <div id="realityOnlyFields" style="display:none;"><div class="row"><div><label>Public Key</label><input id="publicKey" class="ltr"></div><div><label>Short ID</label><input id="shortId" class="ltr"></div><div><label>Spider X</label><input id="spiderX" class="ltr" value="/"></div></div></div>
                <!-- Transport fields -->
                <div id="wsFields" style="display:none;"><div class="row"><div><label>Path</label><input id="wsPath" class="ltr" value="/ws"></div><div><label>Host</label><input id="wsHost" class="ltr" placeholder="example.com"></div></div></div>
                <div id="grpcFields" style="display:none;"><div class="row"><div><label>Service Name</label><input id="grpcServiceName" class="ltr" value="GunService"></div><div><label>Mode</label><select id="grpcMultiMode" class="ltr"><option value="gun">gun</option><option value="multi">multi</option></select></div></div></div>
                <div id="kcpFields" style="display:none;"><div class="row"><div><label>Seed</label><input id="kcpSeed" class="ltr"></div><div><label>Header Type</label><select id="kcpHeaderType" class="ltr"><option value="none">none</option><option value="srtp">srtp</option><option value="utp">utp</option><option value="wechat-video">wechat-video</option><option value="dtls">dtls</option><option value="wireguard">wireguard</option></select></div><div><label>Congestion</label><select id="kcpCongestion" class="ltr"><option value="false">false</option><option value="true">true</option></select></div></div></div>
                <div id="quicFields" style="display:none;"><div class="row"><div><label>Security</label><select id="quicSecurity" class="ltr"><option value="none">none</option><option value="aes-128-gcm">aes-128-gcm</option><option value="chacha20-poly1305">chacha20-poly1305</option></select></div><div><label>Key</label><input id="quicKey" class="ltr"></div><div><label>Header Type</label><select id="quicHeaderType" class="ltr"><option value="none">none</option><option value="srtp">srtp</option><option value="utp">utp</option><option value="wechat-video">wechat-video</option><option value="dtls">dtls</option><option value="wireguard">wireguard</option></select></div></div></div>
                <div id="h2Fields" style="display:none;"><div class="row"><div><label>Host</label><input id="h2Host" class="ltr"></div><div><label>Path</label><input id="h2Path" class="ltr" value="/"></div></div></div>
                <div id="httpupgradeFields" style="display:none;"><div class="row"><div><label>Host</label><input id="httpupgradeHost" class="ltr"></div><div><label>Path</label><input id="httpupgradePath" class="ltr" value="/"></div></div></div>
                <div id="splithttpFields" style="display:none;"><div class="row"><div><label>Host</label><input id="splithttpHost" class="ltr"></div><div><label>Path</label><input id="splithttpPath" class="ltr" value="/"></div></div></div>
                <div id="xhttpFields" style="display:none;"><div class="row"><div><label>Host</label><input id="xhttpHost" class="ltr"></div><div><label>Path</label><input id="xhttpPath" class="ltr" value="/"></div><div><label>Mode</label><select id="xhttpMode" class="ltr"><option value="auto">auto</option><option value="packet-up">packet-up</option><option value="stream-up">stream-up</option><option value="stream-one">stream-one</option></select></div></div></div>
                <div class="row" style="margin-top:12px;"><div><label>Mux</label><select id="muxEnabled"><option value="false">Disabled</option><option value="true">Enabled</option></select></div><div><label>Concurrency</label><input type="number" id="muxConcurrency" class="ltr" value="8"></div></div>
            </div>
            <!-- Protocol -->
            <div class="panel">
                <h2>🔌 Protocol</h2>
                <div class="protocol-bar" id="protocolSelector">
                    <button class="active" data-proto="vless">VLESS</button>
                    <button data-proto="vmess">VMess</button>
                    <button data-proto="trojan">Trojan</button>
                    <button data-proto="ss">Shadowsocks</button>
                </div>
                <div id="vlessFields">
                    <div class="row"><div style="flex:2"><label>UUID</label><input id="vlessUuid" class="ltr"></div><button class="btn btn-outline" id="genVlessUuid">🎲</button></div>
                    <div><label>Flow</label><select id="vlessFlow" class="ltr"><option value="">None</option><option>xtls-rprx-vision</option><option>xtls-rprx-vision-udp443</option><option>xtls-rprx-origin</option><option>xtls-rprx-direct</option></select></div>
                    <div><label>Encryption</label><input id="vlessEncryption" class="ltr" value="none"></div>
                </div>
                <div id="vmessFields" style="display:none;">
                    <div class="row"><div style="flex:2"><label>UUID</label><input id="vmessUuid" class="ltr"></div><button class="btn btn-outline" id="genVmessUuid">🎲</button></div>
                    <div><label>Security</label><select id="vmessSecurity" class="ltr"><option>auto</option><option>aes-128-gcm</option><option>chacha20-poly1305</option><option>none</option><option>zero</option></select></div>
                    <div><label>Alter ID</label><input type="number" id="vmessAlterId" class="ltr" value="0"></div>
                </div>
                <div id="trojanFields" style="display:none;"><div class="row"><div><label>Password</label><input id="trojanPassword" class="ltr"></div><button class="btn btn-outline" id="genTrojanPw">🎲</button></div></div>
                <div id="ssFields" style="display:none;"><div><label>Method</label><select id="ssMethod" class="ltr"><option>aes-256-gcm</option><option>aes-128-gcm</option><option>chacha20-ietf-poly1305</option><option>2022-blake3-aes-256-gcm</option><option>2022-blake3-aes-128-gcm</option><option>2022-blake3-chacha20-poly1305</option></select></div><div class="row"><div><label>Password</label><input id="ssPassword" class="ltr"></div><button class="btn btn-outline" id="genSsPw">🎲</button></div></div>
            </div>
        </div>
        <!-- IP List & Presets -->
        <div class="grid2col">
            <div class="panel"><h2>🌍 IP / Domain List</h2><textarea id="ipList" class="ltr" placeholder="1.1.1.1&#10;my.server.com&#10;IPv6 addresses supported (with or without brackets)"></textarea><div style="margin-top:12px;"><button class="btn btn-primary" id="generateBtn">🚀 Generate Configs</button><button class="btn btn-outline" id="clearIpBtn">🗑️ Clear</button></div></div>
            <div class="panel"><h2>💾 Presets</h2><div id="presetList" style="max-height:200px;overflow-y:auto;"></div><div style="margin-top:12px;"><button class="btn btn-success" id="savePresetBtn">💾 Save</button><button class="btn btn-danger" id="clearPresetsBtn">🗑️ Clear All</button></div></div>
        </div>
        <!-- Output -->
        <div class="panel">
            <h2>📤 Output</h2>
            <div style="display:flex; gap:10px; margin-bottom:15px; flex-wrap:wrap;">
                <button class="btn btn-primary" id="btnJson">📄 JSON</button>
                <button class="btn btn-primary active" id="btnLink">🔗 Links</button>
                <button class="btn btn-outline" id="subBtn">📦 Subscription (Base64)</button>
                <button class="btn btn-outline" id="qrBtn">🔲 QR Code</button>
            </div>
            <div class="output-scroll" id="outputScroll"><div id="outputArea"></div></div>
            <div style="margin-top:15px; display:flex; gap:10px; flex-wrap:wrap;">
                <button class="btn btn-primary" id="copyOutputBtn">📋 Copy</button>
                <button class="btn btn-success" id="downloadOutputBtn">📥 Download</button>
                <button class="btn btn-outline" id="pingBtn">⏱️ Ping (WebSocket only)</button>
            </div>
            <div id="pingPanel" style="margin-top:20px; display:none;">
                <div style="display:flex; align-items:center; justify-content:space-between;"><span id="pingProgress">0/0</span><button class="btn btn-danger btn-sm" id="cancelPingBtn">⏹️ Cancel</button></div>
                <div class="progress-bar"><div class="progress-fill" id="progressFill"></div></div>
                <div id="pingResults"></div>
            </div>
        </div>
    </div>
</div>
<div class="footer">
    از طرف <a id="sulgx-link" href="https://github.com/SulgX" target="_blank">SulgX</a> برای مردم ایران
    <a id="readme-link" href="https://github.com/SulgX/ConfigGenerator" target="_blank">📖 README</a>
</div>
<div id="qrModal" class="qr-modal"><div class="modal-content"><canvas id="qrCanvas"></canvas><br><button class="btn btn-primary" id="closeQrBtn">Close</button><button class="btn btn-outline" id="retryQrBtn" style="display:none;">Retry</button></div></div>
<div id="notification" class="notification" style="display:none;"></div>

<script>
(function() {
    let currentProtocol = 'vless';
    let outputMode = 'link';
    let generatedConfigs = [];
    let pingResultsData = [];
    let sortDirection = 'asc';
    let pingCancelFlag = false;
    let pingInProgress = false;
    let qrLoaded = false;

    let presets = {};
    try { presets = JSON.parse(localStorage.getItem('vpPresets') || '{}'); } catch(e) {}

    const g = id => document.getElementById(id);
    const val = id => (g(id)?.value || '').trim();
    const setVal = (id, v) => { if(g(id)) g(id).value = v; };
    let notifTimer = null;
    const notify = (msg, ok=true) => {
        if(notifTimer) clearTimeout(notifTimer);
        const n = g('notification');
        n.textContent = msg;
        n.style.background = ok ? 'var(--green)' : 'var(--red)';
        n.style.display = 'block';
        notifTimer = setTimeout(() => { n.style.display = 'none'; }, 3000);
    };

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random()*16|0;
            return (c==='x'?r:(r&0x3|0x8)).toString(16);
        });
    }
    function randomPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let p = ''; for(let i=0;i<32;i++) p += chars[Math.random()*chars.length|0];
        return p;
    }

    // IPv6 helper: returns true if address is IPv6
    function isIPv6(addr) {
        // simple check: contains ':' and maybe '.', but not only dots
        return /^[0-9a-fA-F:]+$/.test(addr) && addr.includes(':');
    }
    // Format address for URI: wrap IPv6 in brackets, else keep as-is
    function formatAddressForURI(addr) {
        return isIPv6(addr) ? '[' + addr + ']' : addr;
    }
    // Strip brackets from an address if present (for internal storage)
    function stripBrackets(addr) {
        if (addr.startsWith('[') && addr.endsWith(']')) {
            return addr.slice(1, -1);
        }
        return addr;
    }

    // Protocol UI
    function selectProtocol(proto) {
        currentProtocol = proto;
        document.querySelectorAll('#protocolSelector button').forEach(b => b.classList.remove('active'));
        document.querySelector(\`#protocolSelector button[data-proto="\${proto}"]\`).classList.add('active');
        ['vless','vmess','trojan','ss'].forEach(p => {
            const el = document.getElementById(p+'Fields');
            if(el) el.style.display = p===proto ? 'block' : 'none';
        });
    }
    g('protocolSelector').addEventListener('click', e => {
        if(e.target.tagName === 'BUTTON') selectProtocol(e.target.dataset.proto);
    });

    function updateFieldVisibility() {
        const net = val('network'), sec = val('security');
        g('wsFields').style.display = net==='ws' ? 'block' : 'none';
        g('grpcFields').style.display = net==='grpc' ? 'block' : 'none';
        g('tlsRealityFields').style.display = (sec==='tls'||sec==='reality') ? 'block' : 'none';
        g('realityOnlyFields').style.display = sec==='reality' ? 'block' : 'none';
        g('kcpFields').style.display = net==='kcp' ? 'block' : 'none';
        g('quicFields').style.display = net==='quic' ? 'block' : 'none';
        g('h2Fields').style.display = net==='h2' ? 'block' : 'none';
        g('httpupgradeFields').style.display = net==='httpupgrade' ? 'block' : 'none';
        g('splithttpFields').style.display = net==='splithttp' ? 'block' : 'none';
        g('xhttpFields').style.display = net==='xhttp' ? 'block' : 'none';
    }
    g('network').addEventListener('change', updateFieldVisibility);
    g('security').addEventListener('change', updateFieldVisibility);

    // Parsing with IPv6 support
    function parseCustomScheme(link, scheme) {
        const withoutScheme = link.slice(scheme.length + 3);
        const fragmentIndex = withoutScheme.indexOf('#');
        let fragment = '', main = withoutScheme;
        if(fragmentIndex !== -1) { fragment = decodeURIComponent(withoutScheme.slice(fragmentIndex+1)); main = withoutScheme.slice(0, fragmentIndex); }
        const questionIndex = main.indexOf('?');
        let query = '', userinfoHost = main;
        if(questionIndex !== -1) { query = main.slice(questionIndex+1); userinfoHost = main.slice(0, questionIndex); }
        const atIndex = userinfoHost.indexOf('@');
        if(atIndex === -1) throw new Error('Invalid format');
        const userinfo = userinfoHost.slice(0, atIndex);
        const hostPort = userinfoHost.slice(atIndex+1);
        let host, port;
        // Parse IPv6: [address]:port or address:port
        if (hostPort.startsWith('[')) {
            const closeBracket = hostPort.indexOf(']');
            if (closeBracket === -1) throw new Error('Invalid IPv6 address');
            host = hostPort.slice(1, closeBracket);
            const afterBracket = hostPort.slice(closeBracket+1);
            if (afterBracket.startsWith(':')) {
                port = parseInt(afterBracket.slice(1)) || 443;
            } else {
                port = 443;
            }
        } else {
            const colonIndex = hostPort.lastIndexOf(':');
            if (colonIndex !== -1) {
                host = hostPort.slice(0, colonIndex);
                port = parseInt(hostPort.slice(colonIndex+1)) || 443;
            } else {
                host = hostPort;
                port = 443;
            }
        }
        const params = {};
        if(query) {
            query.split('&').forEach(p => {
                const eq = p.indexOf('=');
                if(eq !== -1) params[decodeURIComponent(p.slice(0,eq))] = decodeURIComponent(p.slice(eq+1));
                else params[decodeURIComponent(p)] = '';
            });
        }
        return { userinfo, host, port, params, fragment };
    }

    function safeAtob(str) {
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        while(str.length % 4) str += '=';
        return atob(str);
    }

    function parseVMess(link) {
        const json = JSON.parse(safeAtob(link.slice(8)));
        return { protocol:'vmess', address: stripBrackets(json.add), port: json.port, uuid: json.id, aid: json.aid || 0, security: json.scy || 'auto', net: json.net || 'tcp', tls: json.tls==='tls'?'tls':'none', sni: json.sni || json.host || '', fp: json.fp || '', alpn: json.alpn || '', path: json.path || '', host: json.host || '', serviceName: json.path || '', remark: json.ps || '' };
    }
    function parseVLess(link) {
        const parsed = parseCustomScheme(link, 'vless');
        const p = parsed.params;
        return { protocol:'vless', address: stripBrackets(parsed.host), port: parsed.port, uuid: parsed.userinfo, remark: parsed.fragment, flow: p.flow||'', enc: p.encryption||'none', security: p.security||'none', sni: p.sni||'', fp: p.fp||'', alpn: p.alpn||'', pbk: p.pbk||'', sid: p.sid||'', spx: p.spx||'/', net: p.type||'tcp', path: p.path||'/', host: p.host||'', serviceName: p.serviceName||'', kcpSeed: p.seed||'', kcpHeader: p.headerType||'', kcpCong: p.congestion||'', quicSec: p.quicSecurity||'', quicKey: p.key||'', quicHeader: p.quicHeaderType||'', h2Host: p.host||'', h2Path: p.path||'', httpupgradeHost: p.host||'', httpupgradePath: p.path||'', splithttpHost: p.host||'', splithttpPath: p.path||'', xhttpHost: p.host||'', xhttpPath: p.path||'', xhttpMode: p.mode||'' };
    }
    function parseTrojan(link) {
        const parsed = parseCustomScheme(link, 'trojan');
        const p = parsed.params;
        return { protocol:'trojan', address: stripBrackets(parsed.host), port: parsed.port, password: parsed.userinfo, remark: parsed.fragment, security: p.security||'tls', sni: p.sni||'', fp: p.fp||'', alpn: p.alpn||'', net: p.type||'tcp', path: p.path||'/', host: p.host||'', serviceName: p.serviceName||'', kcpSeed: p.seed||'', kcpHeader: p.headerType||'', kcpCong: p.congestion||'', quicSec: p.quicSecurity||'', quicKey: p.key||'', quicHeader: p.quicHeaderType||'', h2Host: p.host||'', h2Path: p.path||'', httpupgradeHost: p.host||'', httpupgradePath: p.path||'', splithttpHost: p.host||'', splithttpPath: p.path||'', xhttpHost: p.host||'', xhttpPath: p.path||'', xhttpMode: p.mode||'' };
    }
    function parseSS(link) {
        let main = link.slice(5);
        let remark = '';
        const hashIdx = main.indexOf('#');
        if(hashIdx !== -1) { remark = decodeURIComponent(main.slice(hashIdx+1)); main = main.slice(0, hashIdx); }
        const atIdx = main.lastIndexOf('@');
        let method, password, addr, port;
        if(atIdx !== -1) {
            const userinfo = safeAtob(main.slice(0, atIdx));
            const colon = userinfo.indexOf(':');
            if(colon === -1) throw new Error('Invalid SS userinfo');
            method = userinfo.slice(0, colon);
            password = userinfo.slice(colon+1);
            const hostPort = main.slice(atIdx+1);
            // parse host/port with IPv6 support
            if (hostPort.startsWith('[')) {
                const closeBracket = hostPort.indexOf(']');
                if(closeBracket === -1) throw new Error('Invalid IPv6');
                addr = hostPort.slice(1, closeBracket);
                const after = hostPort.slice(closeBracket+1);
                port = after.startsWith(':') ? parseInt(after.slice(1)) : 8388;
            } else {
                const colonIdx = hostPort.lastIndexOf(':');
                if(colonIdx !== -1) {
                    addr = hostPort.slice(0, colonIdx);
                    port = parseInt(hostPort.slice(colonIdx+1)) || 8388;
                } else {
                    addr = hostPort;
                    port = 8388;
                }
            }
        } else {
            const decoded = safeAtob(main);
            const parts = decoded.split('@');
            if(parts.length !== 2) throw new Error('Legacy SS format error');
            const user = parts[0], host = parts[1];
            const colon = user.indexOf(':');
            method = user.slice(0, colon);
            password = user.slice(colon+1);
            const colonIdx = host.lastIndexOf(':');
            if(colonIdx !== -1) {
                addr = host.slice(0, colonIdx);
                port = parseInt(host.slice(colonIdx+1)) || 8388;
            } else {
                addr = host; port = 8388;
            }
        }
        return { protocol:'ss', address: stripBrackets(addr), port: parseInt(port), method, password, remark, security:'none', net:'tcp' };
    }

    function applyConfig(cfg) {
        selectProtocol(cfg.protocol);
        if(cfg.port) setVal('port', cfg.port);
        if(cfg.remark) setVal('serverBaseName', cfg.remark);
        if(cfg.security) setVal('security', cfg.security);
        if(cfg.sni) setVal('sni', cfg.sni);
        if(cfg.fp) setVal('fingerprint', cfg.fp);
        if(cfg.alpn) setVal('alpn', cfg.alpn);
        if(cfg.pbk) setVal('publicKey', cfg.pbk);
        if(cfg.sid) setVal('shortId', cfg.sid);
        if(cfg.spx) setVal('spiderX', cfg.spx);
        if(cfg.net) setVal('network', cfg.net);
        const net = cfg.net || 'tcp';
        // transport host mapping (same as before)
        if(net === 'ws') { if(cfg.path) setVal('wsPath', cfg.path); if(cfg.host) setVal('wsHost', cfg.host); }
        else if(net === 'grpc') { if(cfg.serviceName) setVal('grpcServiceName', cfg.serviceName); }
        else if(net === 'h2') { if(cfg.h2Host||cfg.host) setVal('h2Host', cfg.h2Host||cfg.host); if(cfg.h2Path||cfg.path) setVal('h2Path', cfg.h2Path||cfg.path||'/'); }
        else if(net === 'httpupgrade') { if(cfg.httpupgradeHost||cfg.host) setVal('httpupgradeHost', cfg.httpupgradeHost||cfg.host); if(cfg.httpupgradePath||cfg.path) setVal('httpupgradePath', cfg.httpupgradePath||cfg.path||'/'); }
        else if(net === 'splithttp') { if(cfg.splithttpHost||cfg.host) setVal('splithttpHost', cfg.splithttpHost||cfg.host); if(cfg.splithttpPath||cfg.path) setVal('splithttpPath', cfg.splithttpPath||cfg.path||'/'); }
        else if(net === 'xhttp') { if(cfg.xhttpHost||cfg.host) setVal('xhttpHost', cfg.xhttpHost||cfg.host); if(cfg.xhttpPath||cfg.path) setVal('xhttpPath', cfg.xhttpPath||cfg.path||'/'); if(cfg.xhttpMode) setVal('xhttpMode', cfg.xhttpMode); }
        if(cfg.kcpSeed) setVal('kcpSeed', cfg.kcpSeed); if(cfg.kcpHeader) setVal('kcpHeaderType', cfg.kcpHeader); if(cfg.kcpCong) setVal('kcpCongestion', cfg.kcpCong);
        if(cfg.quicSec) setVal('quicSecurity', cfg.quicSec); if(cfg.quicKey) setVal('quicKey', cfg.quicKey); if(cfg.quicHeader) setVal('quicHeaderType', cfg.quicHeader);
        if(cfg.protocol==='vless') { if(cfg.uuid) setVal('vlessUuid', cfg.uuid); if(cfg.flow) setVal('vlessFlow', cfg.flow); if(cfg.enc) setVal('vlessEncryption', cfg.enc); }
        else if(cfg.protocol==='vmess') { if(cfg.uuid) setVal('vmessUuid', cfg.uuid); if(cfg.security) setVal('vmessSecurity', cfg.security); if(cfg.aid !== undefined) setVal('vmessAlterId', cfg.aid); }
        else if(cfg.protocol==='trojan') { if(cfg.password) setVal('trojanPassword', cfg.password); }
        else if(cfg.protocol==='ss') { if(cfg.method) setVal('ssMethod', cfg.method); if(cfg.password) setVal('ssPassword', cfg.password); }
        updateFieldVisibility();
    }

    function importLinks() {
        const raw = val('importLink');
        if(!raw) return notify('No link entered', false);
        const lines = raw.split('\\n').filter(l => l.trim());
        if(!lines.length) return notify('Empty lines', false);
        try {
            const first = lines[0].trim();
            let cfg;
            if(first.startsWith('vmess://')) cfg = parseVMess(first);
            else if(first.startsWith('vless://')) cfg = parseVLess(first);
            else if(first.startsWith('trojan://')) cfg = parseTrojan(first);
            else if(first.startsWith('ss://')) cfg = parseSS(first);
            else throw new Error('Unknown protocol');
            applyConfig(cfg);
            const ips = [];
            for(const line of lines) {
                const l = line.trim();
                let addr = '';
                if(l.startsWith('vmess://')) addr = stripBrackets(JSON.parse(safeAtob(l.slice(8))).add);
                else if(l.startsWith('vless://') || l.startsWith('trojan://')) {
                    const parsed = parseCustomScheme(l, l.startsWith('vless://')?'vless':'trojan');
                    addr = stripBrackets(parsed.host);
                } else if(l.startsWith('ss://')) {
                    const main = l.slice(5);
                    const at = main.lastIndexOf('@');
                    if(at !== -1) {
                        const hostPort = main.slice(at+1);
                        if (hostPort.startsWith('[')) {
                            const cb = hostPort.indexOf(']');
                            addr = cb !== -1 ? hostPort.slice(1, cb) : hostPort;
                        } else {
                            addr = hostPort.split(':')[0];
                        }
                    } else {
                        const dec = safeAtob(main);
                        const host = dec.split('@')[1] || '';
                        addr = host.split(':')[0];
                    }
                    addr = stripBrackets(addr);
                }
                if(addr) ips.push(addr);
            }
            g('ipList').value = ips.join('\\n');
            try { localStorage.setItem('ipList', ips.join('\\n')); } catch(e) {}
            notify(\`Loaded \${ips.length} IP(s) from \${lines.length} link(s)\`);
        } catch(e) { notify('Parse error: ' + e.message, false); }
    }

    // Presets (unchanged mapping)
    const presetKeyMap = {
        core: 'coreType', net: 'network', sec: 'security',
        pbk: 'publicKey', sid: 'shortId', spx: 'spiderX',
        wsPath: 'wsPath', wsHost: 'wsHost',
        grpcSvc: 'grpcServiceName', grpcMode: 'grpcMultiMode',
        kcpSeed: 'kcpSeed', kcpHeader: 'kcpHeaderType', kcpCong: 'kcpCongestion',
        quicSec: 'quicSecurity', quicKey: 'quicKey', quicHeader: 'quicHeaderType',
        h2Host: 'h2Host', h2Path: 'h2Path',
        httpupgradeHost: 'httpupgradeHost', httpupgradePath: 'httpupgradePath',
        splithttpHost: 'splithttpHost', splithttpPath: 'splithttpPath',
        xhttpHost: 'xhttpHost', xhttpPath: 'xhttpPath', xhttpMode: 'xhttpMode',
        mux: 'muxEnabled', muxConc: 'muxConcurrency',
        vlessUuid: 'vlessUuid', vlessFlow: 'vlessFlow', vlessEnc: 'vlessEncryption',
        vmessUuid: 'vmessUuid', vmessSec: 'vmessSecurity', vmessAid: 'vmessAlterId',
        trojanPw: 'trojanPassword', ssMethod: 'ssMethod', ssPw: 'ssPassword',
        baseName: 'serverBaseName'
    };
    function renderPresets() {
        const div = g('presetList');
        const keys = Object.keys(presets);
        if(!keys.length) { div.innerHTML = '<p style="opacity:0.6;">No presets saved</p>'; return; }
        div.innerHTML = keys.map(k => \`<div style="display:flex; justify-content:space-between; padding:8px; border-bottom:1px solid var(--border);"><span>📁 \${k}</span><div><button class="btn btn-sm btn-primary load-preset-btn" data-name="\${k}">Load</button><button class="btn btn-sm btn-danger del-preset-btn" data-name="\${k}">Del</button></div></div>\`).join('');
        div.querySelectorAll('.load-preset-btn').forEach(btn => btn.addEventListener('click', function() { loadPreset(this.dataset.name); }));
        div.querySelectorAll('.del-preset-btn').forEach(btn => btn.addEventListener('click', function() { deletePreset(this.dataset.name); }));
    }
    function savePreset() {
        const name = prompt('Preset name:', 'MyPreset_' + new Date().toISOString().slice(0,10));
        if(!name) return;
        const data = {
            protocol: currentProtocol,
            core: val('coreType'), port: val('port'), net: val('network'), sec: val('security'),
            sni: val('sni'), fp: val('fingerprint'), alpn: val('alpn'),
            pbk: val('publicKey'), sid: val('shortId'), spx: val('spiderX'),
            wsPath: val('wsPath'), wsHost: val('wsHost'),
            grpcSvc: val('grpcServiceName'), grpcMode: val('grpcMultiMode'),
            kcpSeed: val('kcpSeed'), kcpHeader: val('kcpHeaderType'), kcpCong: val('kcpCongestion'),
            quicSec: val('quicSecurity'), quicKey: val('quicKey'), quicHeader: val('quicHeaderType'),
            h2Host: val('h2Host'), h2Path: val('h2Path'),
            httpupgradeHost: val('httpupgradeHost'), httpupgradePath: val('httpupgradePath'),
            splithttpHost: val('splithttpHost'), splithttpPath: val('splithttpPath'),
            xhttpHost: val('xhttpHost'), xhttpPath: val('xhttpPath'), xhttpMode: val('xhttpMode'),
            mux: val('muxEnabled'), muxConc: val('muxConcurrency'),
            vlessUuid: val('vlessUuid'), vlessFlow: val('vlessFlow'), vlessEnc: val('vlessEncryption'),
            vmessUuid: val('vmessUuid'), vmessSec: val('vmessSecurity'), vmessAid: val('vmessAlterId'),
            trojanPw: val('trojanPassword'), ssMethod: val('ssMethod'), ssPw: val('ssPassword'),
            baseName: val('serverBaseName')
        };
        presets[name] = data;
        try { localStorage.setItem('vpPresets', JSON.stringify(presets)); } catch(e) {}
        renderPresets(); notify('Preset saved');
    }
    function loadPreset(name) {
        const d = presets[name];
        if(!d) return;
        selectProtocol(d.protocol);
        Object.entries(d).forEach(([key, value]) => {
            if(key === 'protocol') return;
            const elementId = presetKeyMap[key] || key;
            if(elementId && g(elementId)) g(elementId).value = value;
        });
        updateFieldVisibility(); notify('Preset loaded');
    }
    function deletePreset(name) { delete presets[name]; try { localStorage.setItem('vpPresets', JSON.stringify(presets)); } catch(e) {} renderPresets(); }
    function clearPresets() { if(confirm('Delete all?')) { presets = {}; try { localStorage.removeItem('vpPresets'); } catch(e) {} renderPresets(); } }

    // Config generation
    function buildStreamSettings() {
        const net = val('network'), sec = val('security');
        let stream = { network: net, security: sec };
        if(sec==='tls') {
            stream.tlsSettings = { serverName: val('sni'), fingerprint: val('fingerprint'), alpn: val('alpn').replace(/\\s/g,'').split(',').filter(Boolean) };
        } else if(sec==='reality') {
            stream.realitySettings = { serverName: val('sni'), fingerprint: val('fingerprint'), publicKey: val('publicKey'), shortId: val('shortId'), spiderX: val('spiderX') || '/' };
        }
        if(net==='ws') stream.wsSettings = { path: val('wsPath')||'/', headers: { Host: val('wsHost') } };
        else if(net==='grpc') stream.grpcSettings = { serviceName: val('grpcServiceName'), multiMode: val('grpcMultiMode') };
        else if(net==='kcp') stream.kcpSettings = { seed: val('kcpSeed'), header: { type: val('kcpHeaderType') }, congestion: val('kcpCongestion')==='true' };
        else if(net==='quic') stream.quicSettings = { security: val('quicSecurity'), key: val('quicKey'), header: { type: val('quicHeaderType') } };
        else if(net==='h2') stream.httpSettings = { host: val('h2Host'), path: val('h2Path')||'/' };
        else if(net==='httpupgrade') stream.httpupgradeSettings = { host: val('httpupgradeHost'), path: val('httpupgradePath')||'/' };
        else if(net==='splithttp') stream.splithttpSettings = { host: val('splithttpHost'), path: val('splithttpPath')||'/' };
        else if(net==='xhttp') stream.xhttpSettings = { host: val('xhttpHost'), path: val('xhttpPath')||'/', mode: val('xhttpMode') };
        return stream;
    }

    function buildJSON(server, core) {
        let proto = currentProtocol;
        const port = parseInt(val('port'));
        const stream = buildStreamSettings();
        const mux = val('muxEnabled')==='true' ? { enabled:true, concurrency: parseInt(val('muxConcurrency'))||8 } : null;
        if(core==='xray' || core==='v2ray') {
            const outProto = proto==='ss' ? 'shadowsocks' : proto;
            const cfg = {
                log: { loglevel: "warning" },
                inbounds: [ { tag: "socks-in", port: 10808, protocol: "socks", settings: { udp: true } }, { tag: "http-in", port: 10809, protocol: "http" } ],
                outbounds: [ { tag: "proxy", protocol: outProto, settings: {} }, { tag: "direct", protocol: "freedom" }, { tag: "block", protocol: "blackhole" } ],
                routing: { domainStrategy: "IPIfNonMatch", rules: [ { type: "field", outboundTag: "proxy", network: "tcp,udp" } ] }
            };
            const out = cfg.outbounds[0];
            if(proto==='vless') out.settings = { vnext: [{ address: server, port, users: [{ id: val('vlessUuid'), encryption: val('vlessEncryption')||'none', flow: val('vlessFlow') }] }] };
            else if(proto==='vmess') out.settings = { vnext: [{ address: server, port, users: [{ id: val('vmessUuid'), security: val('vmessSecurity'), alterId: parseInt(val('vmessAlterId'))||0 }] }] };
            else if(proto==='trojan') out.settings = { servers: [{ address: server, port, password: val('trojanPassword') }] };
            else if(proto==='ss') out.settings = { servers: [{ address: server, port, method: val('ssMethod'), password: val('ssPassword') }] };
            out.streamSettings = stream;
            if(mux) out.mux = mux;
            return cfg;
        } else { // sing-box
            const cfg = {
                log: { level: "warn" },
                inbounds: [ { type: "mixed", tag: "mixed-in", listen: "127.0.0.1", listen_port: 10808 } ],
                outbounds: [ { tag: "proxy", type: proto, server, server_port: port }, { tag: "direct", type: "direct" }, { tag: "block", type: "block" } ],
                route: { rules: [ { outbound: "proxy", network: ["tcp", "udp"] } ] }
            };
            const out = cfg.outbounds[0];
            if(proto==='vless') { out.uuid = val('vlessUuid'); out.flow = val('vlessFlow'); }
            else if(proto==='vmess') { out.uuid = val('vmessUuid'); out.security = val('vmessSecurity'); out.alter_id = parseInt(val('vmessAlterId'))||0; }
            else if(proto==='trojan') out.password = val('trojanPassword');
            else if(proto==='ss') { out.method = val('ssMethod'); out.password = val('ssPassword'); }
            if(stream.security!=='none') {
                out.tls = { enabled: true, server_name: val('sni')||server, utls: { enabled: true, fingerprint: val('fingerprint')||'chrome' } };
                if(stream.security==='reality') out.tls.reality = { enabled: true, public_key: val('publicKey'), short_id: val('shortId') };
            }
            if(stream.network!=='tcp') {
                out.transport = { type: stream.network };
                if(stream.network==='ws') { out.transport.path = val('wsPath'); out.transport.headers = { Host: val('wsHost')||server }; }
                else if(stream.network==='grpc') out.transport.service_name = val('grpcServiceName');
                else if(stream.network==='kcp') { out.transport.seed = val('kcpSeed'); out.transport.header = { type: val('kcpHeaderType') }; out.transport.congestion = val('kcpCongestion')==='true'; }
                else if(stream.network==='quic') { out.transport.security = val('quicSecurity'); out.transport.key = val('quicKey'); out.transport.header = { type: val('quicHeaderType') }; }
                else if(stream.network==='h2') { out.transport.host = val('h2Host')||server; out.transport.path = val('h2Path'); }
                else if(stream.network==='httpupgrade') { out.transport.host = val('httpupgradeHost')||server; out.transport.path = val('httpupgradePath'); }
                else if(stream.network==='splithttp') { out.transport.host = val('splithttpHost')||server; out.transport.path = val('splithttpPath'); }
                else if(stream.network==='xhttp') { out.transport.host = val('xhttpHost')||server; out.transport.path = val('xhttpPath'); out.transport.mode = val('xhttpMode'); }
            }
            if(mux) out.multiplex = { enabled: true, protocol: "smux", max_connections: mux.concurrency };
            return cfg;
        }
    }

    function buildLink(server, index) {
        const name = encodeURIComponent(\`\${val('serverBaseName')||'Server'} [\${index+1}]\`);
        const port = val('port');
        const net = val('network'), sec = val('security');
        const params = [];
        if (net !== 'tcp') params.push(\`type=\${net}\`);
        if (sec !== 'none') params.push(\`security=\${sec}\`);
        const sni = val('sni'); if (sni) params.push(\`sni=\${encodeURIComponent(sni)}\`);
        const fp = val('fingerprint'); if (fp) params.push(\`fp=\${encodeURIComponent(fp)}\`);
        if (sec === 'tls' || sec === 'reality') {
            const alpn = val('alpn').replace(/\\s/g, '');
            if (alpn && alpn !== 'h2,http/1.1') params.push(\`alpn=\${encodeURIComponent(alpn)}\`);
        }
        if (sec === 'reality') {
            params.push(\`pbk=\${encodeURIComponent(val('publicKey'))}\`, \`sid=\${encodeURIComponent(val('shortId'))}\`, \`spx=\${encodeURIComponent(val('spiderX')||'/')}\`);
        }
        if (net === 'ws') { params.push(\`path=\${encodeURIComponent(val('wsPath'))}\`, \`host=\${encodeURIComponent(val('wsHost'))}\`); }
        else if (net === 'grpc') { params.push(\`serviceName=\${encodeURIComponent(val('grpcServiceName'))}\`, \`mode=\${val('grpcMultiMode')}\`); }
        else if (net === 'kcp') { if (val('kcpSeed')) params.push(\`seed=\${encodeURIComponent(val('kcpSeed'))}\`); params.push(\`headerType=\${val('kcpHeaderType')}\`, \`congestion=\${val('kcpCongestion')}\`); }
        else if (net === 'quic') { params.push(\`quicSecurity=\${val('quicSecurity')}\`, \`key=\${encodeURIComponent(val('quicKey'))}\`, \`headerType=\${val('quicHeaderType')}\`); }
        else if (net === 'h2') { params.push(\`host=\${encodeURIComponent(val('h2Host'))}\`, \`path=\${encodeURIComponent(val('h2Path'))}\`); }
        else if (net === 'httpupgrade') { params.push(\`host=\${encodeURIComponent(val('httpupgradeHost'))}\`, \`path=\${encodeURIComponent(val('httpupgradePath'))}\`); }
        else if (net === 'splithttp') { params.push(\`host=\${encodeURIComponent(val('splithttpHost'))}\`, \`path=\${encodeURIComponent(val('splithttpPath'))}\`); }
        else if (net === 'xhttp') { params.push(\`host=\${encodeURIComponent(val('xhttpHost'))}\`, \`path=\${encodeURIComponent(val('xhttpPath'))}\`, \`mode=\${val('xhttpMode')}\`); }

        const formattedAddr = formatAddressForURI(server);

        switch (currentProtocol) {
            case 'vmess': {
                const cfg = { v: "2", ps: decodeURIComponent(name), add: server, port, id: val('vmessUuid'), aid: val('vmessAlterId')||0, scy: val('vmessSecurity')||'auto', net, type: (sec==='tls'||sec==='reality')?'tls':'none', host: val('wsHost')||'', path: net==='grpc'?val('grpcServiceName'):(val('wsPath')||''), tls: sec==='tls'?'tls':'', sni, alpn: val('alpn'), fp };
                const str = JSON.stringify(cfg);
                const encoder = new TextEncoder(); const bytes = encoder.encode(str);
                let binary = ''; bytes.forEach(b => binary += String.fromCharCode(b));
                return 'vmess://' + btoa(binary);
            }
            case 'vless': {
                const finalParams = [\`encryption=\${val('vlessEncryption')||'none'}\`];
                const flowVal = val('vlessFlow');
                if (flowVal && net === 'tcp' && sec !== 'none') finalParams.push(\`flow=\${encodeURIComponent(flowVal)}\`);
                finalParams.push(...params);
                const queryStr = finalParams.length ? '?' + finalParams.join('&') : '';
                return \`vless://\${val('vlessUuid')}@\${formattedAddr}:\${port}\${queryStr}#\${name}\`;
            }
            case 'trojan': {
                const queryStr = params.length ? '?' + params.join('&') : '';
                return \`trojan://\${val('trojanPassword')}@\${formattedAddr}:\${port}\${queryStr}#\${name}\`;
            }
            case 'ss': {
                const userinfo = btoa(\`\${val('ssMethod')}:\${val('ssPassword')}\`);
                let url = \`ss://\${userinfo}@\${formattedAddr}:\${port}\`;
                if (net !== 'tcp' || sec !== 'none') {
                    let plugin = '';
                    if (sec === 'tls' || sec === 'reality') plugin += 'tls;';
                    if (net === 'ws') { plugin += 'mode=websocket;'; if (val('wsHost')) plugin += \`host=\${val('wsHost')};\`; if (val('wsPath')) plugin += \`path=\${val('wsPath')};\`; }
                    else if (net === 'grpc') { plugin += \`mode=grpc;serviceName=\${val('grpcServiceName')};\`; }
                    if (plugin) url += '?plugin=' + encodeURIComponent(plugin.replace(/;\$/, ''));
                }
                return url + '#' + name;
            }
        }
    }

    function validateInputs() {
        if(!val('ipList')) { notify('Enter IPs', false); return false; }
        const port = parseInt(val('port'));
        if(isNaN(port) || port<1 || port>65535) { notify('Invalid port', false); return false; }
        if(currentProtocol === 'vless' && !val('vlessUuid')) { notify('UUID required for VLESS', false); return false; }
        if(currentProtocol === 'vmess' && !val('vmessUuid')) { notify('UUID required for VMess', false); return false; }
        if(currentProtocol === 'trojan' && !val('trojanPassword')) { notify('Password required for Trojan', false); return false; }
        if(currentProtocol === 'ss' && (!val('ssMethod')||!val('ssPassword'))) { notify('Method & password required for SS', false); return false; }
        return true;
    }

    function generateConfigs() {
        if(!validateInputs()) return;
        // Process IP list: strip brackets from each line
        const rawList = val('ipList').split('\\n').map(s=>s.trim()).filter(s=>s);
        const list = rawList.map(stripBrackets);
        const core = val('coreType');
        generatedConfigs = list.map((server, idx) => ({
            name: \`\${val('serverBaseName')||'Server'} [\${idx+1}]\`,
            json: buildJSON(server, core),
            link: buildLink(server, idx)
        }));
        renderOutput();
        notify(\`\${generatedConfigs.length} configs generated\`);
    }

    // Output, ping, etc. identical to previous version
    function switchOutput(mode) {
        outputMode = mode;
        g('btnJson').classList.toggle('active', mode==='json');
        g('btnLink').classList.toggle('active', mode==='link');
        renderOutput();
    }

    function renderOutput() {
        const div = g('outputArea');
        if(!generatedConfigs.length) { div.innerHTML = '<p style="opacity:0.6;">No configs</p>'; return; }
        if(outputMode==='json') {
            div.innerHTML = generatedConfigs.map((c,i) => \`<div class="config-card"><h4>📄 \${c.name}</h4><div class="actions"><button class="btn btn-sm btn-primary copy-json-btn" data-idx="\${i}">Copy</button></div><pre>\${JSON.stringify(c.json, null, 2)}</pre></div>\`).join('');
            div.querySelectorAll('.copy-json-btn').forEach(b => b.addEventListener('click', function() { copyJson(parseInt(this.dataset.idx)); }));
        } else {
            div.innerHTML = generatedConfigs.map((c,i) => \`<div class="config-card"><h4>🔗 \${c.name}</h4><div class="actions"><button class="btn btn-sm btn-primary copy-link-btn" data-idx="\${i}">Copy</button></div><pre>\${c.link}</pre></div>\`).join('');
            div.querySelectorAll('.copy-link-btn').forEach(b => b.addEventListener('click', function() { copyLink(parseInt(this.dataset.idx)); }));
        }
    }

    function copyJson(i) { navigator.clipboard.writeText(JSON.stringify(generatedConfigs[i].json, null, 2)).then(()=>notify('Copied')); }
    function copyLink(i) { navigator.clipboard.writeText(generatedConfigs[i].link).then(()=>notify('Copied')); }
    function copyOutput() {
        if(!generatedConfigs.length) return;
        const text = outputMode==='json' ? generatedConfigs.map(c => JSON.stringify(c.json, null, 2)).join('\\n\\n') : generatedConfigs.map(c => c.link).join('\\n');
        navigator.clipboard.writeText(text).then(() => notify('Copied'));
    }
    function downloadOutput() {
        if(!generatedConfigs.length) return;
        const content = outputMode==='json' ? generatedConfigs.map(c => JSON.stringify(c.json, null, 2)).join('\\n\\n---\\n\\n') : generatedConfigs.map(c => c.link).join('\\n');
        const blob = new Blob([content], {type:'text/plain'});
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = outputMode==='json'?'configs.json':'configs.txt';
        a.click(); URL.revokeObjectURL(a.href);
        notify('Downloaded');
    }
    function generateSubscription() {
        if(!generatedConfigs.length) return;
        const base64 = btoa(generatedConfigs.map(c => c.link).join('\\n'));
        navigator.clipboard.writeText(base64).then(() => notify('Subscription Base64 copied'));
    }
    function showQR() {
        if(!generatedConfigs.length) return;
        if(!qrLoaded) {
            g('retryQrBtn').style.display = 'none';
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js';
            s.onload = () => { qrLoaded = true; showQR(); };
            s.onerror = () => { qrLoaded = false; g('qrModal').style.display = 'flex'; g('qrCanvas').style.display = 'none'; g('retryQrBtn').style.display = 'inline-block'; notify('Failed to load QR library', false); };
            document.head.appendChild(s);
            return;
        }
        if(typeof QRCode === 'undefined') { notify('QR library unavailable', false); return; }
        g('retryQrBtn').style.display = 'none'; g('qrCanvas').style.display = 'block';
        QRCode.toCanvas(g('qrCanvas'), generatedConfigs.map(c => c.link).join('\\n'), { width: 300 }, (err) => {
            if(err) notify('QR error', false);
            else g('qrModal').style.display = 'flex';
        });
    }
    function closeQR() { g('qrModal').style.display = 'none'; qrLoaded = false; g('retryQrBtn').style.display = 'none'; }
    function retryQR() { qrLoaded = false; showQR(); }

    // Ping (unchanged, works for ws)
    function pingAllConfigs() {
        if(!generatedConfigs.length) { notify('Generate configs first', false); return; }
        if(pingInProgress) { notify('Ping already in progress', false); return; }
        if(val('network')!=='ws') { if(!confirm('Ping works reliably only for WebSocket transport. Continue anyway?')) return; }
        pingInProgress = true; pingCancelFlag = false; pingResultsData = [];
        g('pingPanel').style.display = 'block';
        g('pingProgress').textContent = \`0 / \${generatedConfigs.length}\`;
        g('progressFill').style.width = '0%';
        g('pingResults').innerHTML = '<p style="opacity:0.6;">Starting ping...</p>';
        runPing(0);
    }

    async function runPing(index) {
        if(pingCancelFlag || index >= generatedConfigs.length) {
            pingInProgress = false;
            if(!pingCancelFlag) { sortPingData(); renderPingTable(); }
            g('pingProgress').textContent = \`\${pingResultsData.length} / \${generatedConfigs.length}\`;
            g('progressFill').style.width = '100%';
            return;
        }
        const cfg = generatedConfigs[index];
        const latency = await measureLatency(cfg);
        pingResultsData.push({ name: cfg.name, latency, link: cfg.link });
        sortPingData(); renderPingTable(true);
        const done = pingResultsData.length;
        g('pingProgress').textContent = \`\${done} / \${generatedConfigs.length}\`;
        g('progressFill').style.width = (done / generatedConfigs.length * 100) + '%';
        setTimeout(() => runPing(index+1), 50);
    }

    function cancelPing() { pingCancelFlag = true; pingInProgress = false; notify('Ping cancelled', false); }

    async function measureLatency(cfg) {
        const json = cfg.json;
        let server, port, tls, sni, wsPath, net;
        const outbound = json.outbounds?.find(o=>o.tag==='proxy') || json.outbounds?.[0];
        if(!outbound) return null;
        if(outbound.settings?.vnext?.[0]?.address) {
            server = outbound.settings.vnext[0].address; port = outbound.settings.vnext[0].port;
            tls = outbound.streamSettings?.security === 'tls' || outbound.streamSettings?.security === 'reality';
            sni = outbound.streamSettings?.tlsSettings?.serverName || outbound.streamSettings?.realitySettings?.serverName || server;
            net = outbound.streamSettings?.network || 'tcp'; wsPath = outbound.streamSettings?.wsSettings?.path || '';
        } else if(outbound.settings?.servers?.[0]?.address) {
            server = outbound.settings.servers[0].address; port = outbound.settings.servers[0].port;
            tls = outbound.streamSettings?.security === 'tls' || outbound.streamSettings?.security === 'reality';
            sni = outbound.streamSettings?.tlsSettings?.serverName || outbound.streamSettings?.realitySettings?.serverName || server;
            net = outbound.streamSettings?.network || 'tcp'; wsPath = outbound.streamSettings?.wsSettings?.path || '';
        } else if(outbound.server) {
            server = outbound.server; port = outbound.server_port;
            tls = outbound.tls?.enabled || false; sni = outbound.tls?.server_name || server;
            net = outbound.transport?.type || 'tcp'; wsPath = outbound.transport?.path || '';
        } else return null;
        if(!server || !port || net !== 'ws') return null;
        // For IPv6, format address for WebSocket URL
        const addr = formatAddressForURI(server);
        const scheme = tls ? 'wss' : 'ws';
        const wsUrl = \`\${scheme}://\${addr}:\${port}\${wsPath}\`;
        try {
            const start = performance.now();
            await new Promise((resolve, reject) => {
                const ws = new WebSocket(wsUrl);
                const timeout = setTimeout(() => { ws.close(); reject(new Error('Timeout')); }, 5000);
                ws.onopen = () => { clearTimeout(timeout); ws.close(); resolve(); };
                ws.onerror = () => { clearTimeout(timeout); reject(new Error('WS error')); };
                ws.onclose = (e) => { if(e.wasClean) resolve(); else reject(new Error('Closed')); };
            });
            return Math.round(performance.now() - start);
        } catch(e) { return null; }
    }

    function sortPingData() {
        pingResultsData.sort((a, b) => {
            if(a.latency===null && b.latency===null) return 0;
            if(a.latency===null) return 1;
            if(b.latency===null) return -1;
            return sortDirection === 'asc' ? a.latency - b.latency : b.latency - a.latency;
        });
    }

    let pingContainerEl = null;
    function renderPingTable(preserveScroll = false) {
        let scrollTop = 0;
        if(preserveScroll && pingContainerEl) scrollTop = pingContainerEl.scrollTop;
        let html = '<div class="ping-container"><table class="ping-table"><thead><tr><th>Config</th><th id="sortLatency" style="cursor:pointer;">Latency ' + (sortDirection==='asc'?'▲':'▼') + '</th><th>Status</th><th>Copy</th></tr></thead><tbody>';
        pingResultsData.forEach(r => {
            const best = r.latency !== null && r.latency === Math.min(...pingResultsData.filter(x=>x.latency!==null).map(x=>x.latency)) ? 'best' : '';
            html += \`<tr class="\${best}"><td>\${r.name}</td><td>\${r.latency!==null ? r.latency+' ms' : 'N/A'}</td><td>\${r.latency!==null ? '🟢' : '🔴'}</td><td><button class="btn btn-sm btn-primary copy-ping-link-btn" data-link="\${encodeURIComponent(r.link)}">Copy</button></td></tr>\`;
        });
        html += '</tbody></table></div>';
        g('pingResults').innerHTML = html;
        const sortHeader = g('sortLatency');
        if(sortHeader) sortHeader.addEventListener('click', togglePingSort);
        g('pingResults').querySelectorAll('.copy-ping-link-btn').forEach(b => b.addEventListener('click', function() { copyLinkFromPing(this.dataset.link); }));
        pingContainerEl = document.querySelector('.ping-container');
        if(preserveScroll && pingContainerEl) pingContainerEl.scrollTop = scrollTop;
    }

    function togglePingSort() {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        sortPingData(); renderPingTable();
    }

    function copyLinkFromPing(encoded) { navigator.clipboard.writeText(decodeURIComponent(encoded)).then(() => notify('Link copied')); }

    function clearIPs() { g('ipList').value = ''; try { localStorage.removeItem('ipList'); } catch(e) {} }

    // Event listeners
    function setupListeners() {
        g('importBtn').addEventListener('click', importLinks);
        g('clearImportBtn').addEventListener('click', () => { g('importLink').value = ''; });
        g('genVlessUuid').addEventListener('click', () => { setVal('vlessUuid', uuid()); notify('UUID generated'); });
        g('genVmessUuid').addEventListener('click', () => { setVal('vmessUuid', uuid()); notify('UUID generated'); });
        g('genTrojanPw').addEventListener('click', () => { setVal('trojanPassword', randomPassword()); notify('Password generated'); });
        g('genSsPw').addEventListener('click', () => { setVal('ssPassword', randomPassword()); notify('Password generated'); });
        g('generateBtn').addEventListener('click', generateConfigs);
        g('clearIpBtn').addEventListener('click', clearIPs);
        g('savePresetBtn').addEventListener('click', savePreset);
        g('clearPresetsBtn').addEventListener('click', clearPresets);
        g('btnJson').addEventListener('click', () => switchOutput('json'));
        g('btnLink').addEventListener('click', () => switchOutput('link'));
        g('subBtn').addEventListener('click', generateSubscription);
        g('qrBtn').addEventListener('click', showQR);
        g('closeQrBtn').addEventListener('click', closeQR);
        g('retryQrBtn').addEventListener('click', retryQR);
        g('copyOutputBtn').addEventListener('click', copyOutput);
        g('downloadOutputBtn').addEventListener('click', downloadOutput);
        g('pingBtn').addEventListener('click', pingAllConfigs);
        g('cancelPingBtn').addEventListener('click', cancelPing);
    }

    document.addEventListener('DOMContentLoaded', () => {
        setupListeners();
        renderPresets();
        updateFieldVisibility();
        setVal('vlessUuid', uuid());
        setVal('vmessUuid', uuid());
        setVal('trojanPassword', randomPassword());
        setVal('ssPassword', randomPassword());
        try { const saved = localStorage.getItem('ipList'); if(saved) g('ipList').value = saved; } catch(e) {}
    });
})();
</script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
