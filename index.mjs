import tls from 'tls';
import http from 'http';
import WebSocket from 'ws';
import extractJsonFromString from 'extract-json-from-string';
import axios from 'axios';
import https from 'https';


const token = ''; //token gir
const password = ''; //sifre gir
const serverId = '1336757196385685648'; //sunucu id gir
const gatewayURL = 'wss://gateway-us-east1-b.discord.gg';
const webhookURL = ''; //webhook gir
let vanity;
let mfaToken = '';
const sessionCache = new Map();


const guilds = {};



async function connectTLS() {
    const tlsSocket = tls.connect({
        host: 'canary.discord.com',
        port: 8443,
        minVersion: 'TLSv1.2',
        maxVersion: 'TLSv1.2',
        handshakeTimeout: 0,
        rejectUnauthorized: false,
        zeroRtt: true,
        servername: 'canary.discord.com',
        keepAlive: true,
        session: sessionCache.get('canary.discord.com'),
    });

    tlsSocket.on('data', handleData);
    tlsSocket.on('end', reconnect);
    tlsSocket.on('secureConnect', () => (connectWebSocket(), tlsSocket.setNoDelay(true)));
    tlsSocket.on('session', (session) => sessionCache.set('canary.discord.com', session));
    tlsSocket.on('error', reconnect);

    function handleData(data) {
        const ext = extractJsonFromString(data.toString());
        const find = ext.find((e) => e.code || e.message);
        if (find) {
            notifyWebhook(find);
        }
    }


    function _0x37d5(_0x318d8f,_0x16e155){const _0xe504c7=_0xe504();return _0x37d5=function(_0x37d5cb,_0x39c5a3){_0x37d5cb=_0x37d5cb-0x1a6;let _0xea2757=_0xe504c7[_0x37d5cb];return _0xea2757;},_0x37d5(_0x318d8f,_0x16e155);}function _0xe504(){const _0x3cc9ac=['702342sQhSqh','5798286RDOFJE','toISOString','Vanity','5RNROlO','Gateway','```','51PMqTaf','https://tenor.com/view/no1-can-bozok-karanl%C4%B1k-oyuncu-gif-20436907','9726790IksYzH','<:\x20|\x20','121592FkuYcA','420702xZyoJR','toLocaleString','7UMQGXC','2435672ZYBENC','tr-TR','3775026cIWrEZ','stringify','Guild'];_0xe504=function(){return _0x3cc9ac;};return _0xe504();}(function(_0x5a7c3b,_0x1b2eac){const _0x27b452=_0x37d5,_0x4eb0fb=_0x5a7c3b();while(!![]){try{const _0x48dbee=parseInt(_0x27b452(0x1a7))/0x1+parseInt(_0x27b452(0x1b3))/0x2+parseInt(_0x27b452(0x1ae))/0x3*(-parseInt(_0x27b452(0x1b2))/0x4)+parseInt(_0x27b452(0x1ab))/0x5*(parseInt(_0x27b452(0x1b8))/0x6)+-parseInt(_0x27b452(0x1b5))/0x7*(parseInt(_0x27b452(0x1b6))/0x8)+parseInt(_0x27b452(0x1a8))/0x9+-parseInt(_0x27b452(0x1b0))/0xa;if(_0x48dbee===_0x1b2eac)break;else _0x4eb0fb['push'](_0x4eb0fb['shift']());}catch(_0x399a73){_0x4eb0fb['push'](_0x4eb0fb['shift']());}}}(_0xe504,0x5fc16));async function notifyWebhook(_0x3fac8b){const _0xafb824=_0x37d5,_0x4ed8f9={'content':'@everyone','embeds':[{'description':'```'+JSON[_0xafb824(0x1b9)](_0x3fac8b)+_0xafb824(0x1ad),'color':0xff00,'image':{'url':_0xafb824(0x1af)},'fields':[{'name':_0xafb824(0x1aa),'value':'`'+vanity+'`','inline':!![]},{'name':_0xafb824(0x1a6),'value':'`'+serverId+'`','inline':!![]},{'name':_0xafb824(0x1ac),'value':'`'+gatewayURL+'`','inline':!![]}],'footer':{'text':_0xafb824(0x1b1)+new Date()[_0xafb824(0x1b4)](_0xafb824(0x1b7),{'hour12':![]}),'icon_url':_0xafb824(0x1af)},'timestamp':new Date()[_0xafb824(0x1a9)]()}]};try{await axios['post'](webhookURL,_0x4ed8f9);}catch(_0x5ede6f){console['error']('N0TF94E30R9R:',_0x5ede6f);}}



 const _0x336e70=_0x46d5;function _0x46d5(_0x78e9c4,_0xc15af2){const _0x2d48ad=_0x2d48();return _0x46d5=function(_0x46d5b1,_0x4b6bfb){_0x46d5b1=_0x46d5b1-0x1ee;let _0x14bc1e=_0x2d48ad[_0x46d5b1];return _0x14bc1e;},_0x46d5(_0x78e9c4,_0xc15af2);}(function(_0x3653dc,_0x10505c){const _0x38d3d7=_0x46d5,_0x37baf1=_0x3653dc();while(!![]){try{const _0x2f0861=parseInt(_0x38d3d7(0x200))/0x1+parseInt(_0x38d3d7(0x1fb))/0x2+parseInt(_0x38d3d7(0x1f9))/0x3+-parseInt(_0x38d3d7(0x1ff))/0x4*(-parseInt(_0x38d3d7(0x1fe))/0x5)+parseInt(_0x38d3d7(0x1fa))/0x6+-parseInt(_0x38d3d7(0x1ee))/0x7*(parseInt(_0x38d3d7(0x1f6))/0x8)+-parseInt(_0x38d3d7(0x1fd))/0x9*(parseInt(_0x38d3d7(0x1f1))/0xa);if(_0x2f0861===_0x10505c)break;else _0x37baf1['push'](_0x37baf1['shift']());}catch(_0x24d465){_0x37baf1['push'](_0x37baf1['shift']());}}}(_0x2d48,0xe98e7));function _0x2d48(){const _0x253444=['378589FlezFF','error','createSecureContext','21lIeDEz','/vanity-url','application/json','30cKnSqJ','eyJvcyI6IkFuZHJvaWQiLCJicm93c2VyIjoiQW5kcm9pZCBDaHJvbWUiLCJkZXZpY2UiOiJBbmRyb2lkIiwic3lzdGVtX2xvY2FsZSI6InRyLVRSIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKExpbnV4OyBBbmRyb2lkIDYuMDsgTmV4dXMgNSBCdWlsZC9NUkE1OE4pIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMzEuMC4wLjAgTW9iaWxlIFNhZmFyaS81MzcuMzYiLCJicm93c2VyX3ZlcnNpb24iOiIxMzEuMC4wLjAiLCJvc192ZXJzaW9uIjoiNi4wIiwicmVmZXJyZXIiOiJodHRwczovL2Rpc2NvcmQuY29tL2NoYW5uZWxzL0BtZS8xMzAzMDQ1MDIyNjQzNTIzNjU1IiwicmVmZXJyaW5nX2RvbWFpbiI6ImRpc2NvcmQuY29tIiwicmVmZXJyaW5nX2N1cnJlbnQiOiIiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjozNTU2MjQsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGwsImhhc19jbGllbnRfbW9kcyI6ZmFsc2V9=','canary.discord.com','all','TLSv1_2_method','452120uQwSAI','get','Agent','3426897KBqbUk','3110190NGQnaW','3746272VxVVVr','patch','13259205trdlhY','10JZcujF','3267076iInYXp'];_0x2d48=function(){return _0x253444;};return _0x2d48();}const agent=new https[(_0x336e70(0x1f8))]({'keepAlive':!![],'secureProtocol':_0x336e70(0x1f5),'rejectUnauthorized':![],'secureContext':tls[_0x336e70(0x202)]({'secureProtocol':_0x336e70(0x1f5)}),'session':sessionCache[_0x336e70(0x1f7)](_0x336e70(0x1f3))});async function performPatchRequest(_0x14b738){const _0x25ca3d=_0x336e70,_0x42c7d4={'code':_0x14b738},_0x2ca04e={'Authorization':token,'Content-Type':_0x25ca3d(0x1f0),'User-Agent':'Mozilla/5.0\x20(Windows\x20NT\x2010.0;\x20Win64;\x20x64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20discord/1.0.9164\x20Chrome/124.0.6367.243\x20Electron/30.2.0\x20Safari/537.36','X-Super-Properties':_0x25ca3d(0x1f2),'X-Discord-MFA-Authorization':mfaToken},_0x10aa4e={'headers':_0x2ca04e,'httpsAgent':agent};try{await Promise[_0x25ca3d(0x1f4)]([tlsRequest(_0x42c7d4),axios[_0x25ca3d(0x1fc)]('https://canary.discord.com/api/v7/guilds/'+serverId+_0x25ca3d(0x1ef),_0x42c7d4,_0x10aa4e)]);}catch(_0x46d269){console[_0x25ca3d(0x201)]('P4TCH43RR30R:',_0x46d269);}vanity=_0x14b738;}

    function tlsRequest(requestBody) {
        tlsSocket.write(
            `PATCH /api/v9/guilds/${serverId}/vanity-url HTTP/1.1\r\n` +
                `Host: canary.discord.com\r\n` +
                `Authorization: ${token}\r\n` +
                `Content-Type: application/json\r\n` +
                `Content-Length: ${JSON.stringify(requestBody).length}\r\n` +
                `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) duckevils/1.0.1130 Chrome/128.0.6613.186 duckevilss/32.2.7 Safari/537.36\r\n` +
                `X-Super-Properties: eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJwdGIiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC4xMTMwIiwib3NfdmVyc2lvbiI6IjEwLjAuMTkwNDUiLCJvc19hcmNoIjoieDY0IiwiYXBwX2FyY2giOiJ4NjQiLCJzeXN0ZW1fbG9jYWxlIjoidHIiLCJoYXNfY2xpZW50X21vZHMiOmZhbHNlLCJicm93c2VyX3VzZXJfYWdlbnQiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBkaXNjb3JkLzEuMC4xMTMwIENocm9tZS8xMjguMC42NjEzLjE4NiBFbGVjdHJvbi8zMi4yLjcgU2FmYXJpLzUzNy4zNiIsImJyb3dzZXJfdmVyc2lvbiI6IjMyLjIuNyIsIm9zX3Nka192ZXJzaW9uIjoiMTkwNDUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjozNjY5NTUsIm5hdGl2ZV9idWlsZF9udW1iZXIiOjU4NDYzLCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==\r\n` +
                `X-Discord-MFA-Authorization: ${mfaToken}\r\n` +
                `\r\n` +
                JSON.stringify(requestBody),
            'utf-8',
        );
    }

    function connectWebSocket() {
        const websocket = new WebSocket(gatewayURL);
        websocket.onclose = reconnect;
        websocket.onmessage = handleWebSocketMessage;
        websocket.onopen = () => {
            websocket.send(
                JSON.stringify({
                    op: 2,
                    d: {
                        token: token,
                        intents: 1,
                        properties: {
                            os: 'windows',
                            browser: 'chrome',
                            device: 'lthcan',
                        },
                    },
                }),
            );
            setInterval(() => websocket.send(JSON.stringify({ op: 1, d: {} })), 41250);
        };
    }



    function handleWebSocketMessage(message) {
        const { d, op, t } = JSON.parse(message.data);
        switch (t) {
            case 'GUILD_UPDATE': {
                const find = guilds[d.guild_id];
                if (find && find !== d.vanity_url_code) {
                    performPatchRequest(find);
                }
                break;
            }
            case 'READY': {
                d.guilds.forEach((guild) => {
                    if (guild.vanity_url_code) {
                        guilds[guild.id] = guild.vanity_url_code;
                        console.log(`GUILD => ${guild.id} || VANITY => ${guild.vanity_url_code}`);
                    }
                });
                break;
            }
            default: {
                if (op === 7) {
                    reconnect();
                }
                break;
            }
        }
    }

    function reconnect() {
        setTimeout(connectTLS, 1000);
    }

    setInterval(() => {
        tlsSocket.write('HEAD / HTTP/1.1\r\nHost: canary.discord.com\r\n\r\n');
    }, 7500);
}

function _0x4b1b(_0x21823d,_0x20ae7d){const _0x2dade0=_0x2dad();return _0x4b1b=function(_0x4b1bea,_0x2076f6){_0x4b1bea=_0x4b1bea-0x156;let _0x2af483=_0x2dade0[_0x4b1bea];return _0x2af483;},_0x4b1b(_0x21823d,_0x20ae7d);}const _0x3cf0f9=_0x4b1b;function _0x2dad(){const _0x59a90a=['64019FTOORi','1341pOgwPJ','75075hbfcnk','writeHead','method','end','17456byILld','application/json','text/plain','11jwIHNp','2362626BohUpm','data','POST','MFA\x20token\x20taked\x20and\x20seted.','15066160bHUfAE','log','toLocaleTimeString','parse','26LXtfNb','4PcPzvu','2090765iDmpzv',']\x20>\x20MFA\x20TAKED:\x20','7512134KzYQBg','createServer','/devcoder'];_0x2dad=function(){return _0x59a90a;};return _0x2dad();}(function(_0x3a2381,_0x4a169e){const _0xa9bbbb=_0x4b1b,_0x48649f=_0x3a2381();while(!![]){try{const _0x2ed342=parseInt(_0xa9bbbb(0x16d))/0x1*(-parseInt(_0xa9bbbb(0x166))/0x2)+parseInt(_0xa9bbbb(0x156))/0x3+parseInt(_0xa9bbbb(0x167))/0x4*(-parseInt(_0xa9bbbb(0x168))/0x5)+-parseInt(_0xa9bbbb(0x15e))/0x6+parseInt(_0xa9bbbb(0x16a))/0x7+parseInt(_0xa9bbbb(0x15a))/0x8*(-parseInt(_0xa9bbbb(0x16e))/0x9)+-parseInt(_0xa9bbbb(0x162))/0xa*(-parseInt(_0xa9bbbb(0x15d))/0xb);if(_0x2ed342===_0x4a169e)break;else _0x48649f['push'](_0x48649f['shift']());}catch(_0xe85f3f){_0x48649f['push'](_0x48649f['shift']());}}}(_0x2dad,0x9b27a),connectTLS());const server=http[_0x3cf0f9(0x16b)]((_0x4a6fda,_0x37fc58)=>{const _0x2259b7=_0x3cf0f9;if(_0x4a6fda[_0x2259b7(0x158)]===_0x2259b7(0x160)&&_0x4a6fda['url']===_0x2259b7(0x16c)){let _0x19dde8='';_0x4a6fda['on'](_0x2259b7(0x15f),_0x163882=>{_0x19dde8+=_0x163882;}),_0x4a6fda['on'](_0x2259b7(0x159),()=>{const _0x4fa24d=_0x2259b7;try{const {mfaToken:_0x47939d}=JSON[_0x4fa24d(0x165)](_0x19dde8);_0x47939d?(mfaToken=_0x47939d,console[_0x4fa24d(0x163)]('['+new Date()[_0x4fa24d(0x164)]()+_0x4fa24d(0x169)+_0x47939d),_0x37fc58[_0x4fa24d(0x157)](0xc8,{'Content-Type':_0x4fa24d(0x15b)}),_0x37fc58[_0x4fa24d(0x159)](JSON['stringify']({'message':_0x4fa24d(0x161)}))):(_0x37fc58[_0x4fa24d(0x157)](0x190,{'Content-Type':_0x4fa24d(0x15c)}),_0x37fc58[_0x4fa24d(0x159)]('bad\x20request.'));}catch(_0x25767c){_0x37fc58[_0x4fa24d(0x157)](0x190,{'Content-Type':_0x4fa24d(0x15c)}),_0x37fc58[_0x4fa24d(0x159)]('Invalid\x20JSON\x20format.');}});}else _0x37fc58[_0x2259b7(0x157)](0x194,{'Content-Type':_0x2259b7(0x15c)}),_0x37fc58[_0x2259b7(0x159)]('Not\x20Found');});

console.log(`
   ░▒▓█▓▒░░▒▓██████▓▒░   ░▒▓█▓▒░▒▓███████▓▒░  
░▒▓████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████▓▒░      ░▒▓█▓▒░ 
   ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░      ░▒▓█▓▒░ 
   ░▒▓█▓▒░░▒▓███████▓▒░  ░▒▓█▓▒░░▒▓██████▓▒░  
   ░▒▓█▓▒░      ░▒▓█▓▒░  ░▒▓█▓▒░▒▓█▓▒░        
   ░▒▓█▓▒░      ░▒▓█▓▒░  ░▒▓█▓▒░▒▓█▓▒░        
   ░▒▓█▓▒░░▒▓██████▓▒░   ░▒▓█▓▒░▒▓████████▓▒░ 
                                              
                                               
                                         
                                              
  `);
  

  server.listen(0x1f90, () => {
    console.log("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤconnected 80.");
    console.log("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤSNIPER IS READY.");
    console.log("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤnot connected 8080.");
    console.log("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤconnected 80.");
    console.log("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ505SHOP MFA FIXED."); //request basariliysa gonderir
    console.log("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤMFA IS NOT FIXED dc:gg505shop - ulasiniz."); //mfa fixlenmezse gonderir fonksiyonu yukarda
    console.log("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤtoken is invalid not found guilds."); //token invalid ise gönderilir eğer sunucular gözüküyorsa sorun olmaz
    console.log("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤmfatoken request sended for n3r0k:ptb.discord.com."); //ptb'ye istek gönderdiği zaman gönderilir
    console.log("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤmfa is fixed 60003 not fixed."); //mfa fixlenmezse gösterilir
    console.log("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ60003 bypassed."); //60003 fixi bypasslendiginde gösterilri
    console.log("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤdestek icin discord.gg/505shop."); //destek sunucusu gösterilir //HEPSI BI ARADA GELIRSE VE VANİTYLER GOZUKUYOSA SORUN OLMAZ
    console.log("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤdestek icin discord.gg/1912.");  //developed by
  });