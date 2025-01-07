!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).morse=t()}(this,(function(){"use strict";const e={latin:{A:"01",B:"1000",C:"1010",D:"100",E:"0",F:"0010",G:"110",H:"0000",I:"00",J:"0111",K:"101",L:"0100",M:"11",N:"10",O:"111",P:"0110",Q:"1101",R:"010",S:"000",T:"1",U:"001",V:"0001",W:"011",X:"1001",Y:"1011",Z:"1100"},arabicnumerals:{0:"11111",1:"01111",2:"00111",3:"00011",4:"00001",5:"00000",6:"10000",7:"11000",8:"11100",9:"11110"},punctuation:{".":"010101",",":"110011","?":"001100","'":"011110","!":"101011","/":"10010","(":"10110",")":"101101","&":"01000",":":"111000",";":"101010","=":"10001","+":"01010","-":"100001",_:"001101",'"':"010010",$:"0001001","@":"011010","¿":"00101","¡":"110001"},latinextended:{"Ã":"01101","Á":"01101","Å":"01101","À":"01101","Â":"01101","Ä":"0101","Ą":"0101","Æ":"0101","Ç":"10100","Ć":"10100","Ĉ":"10100","Č":"110","Ð":"00110","È":"01001","Ę":"00100","Ë":"00100","É":"00100","Ê":"10010","Ğ":"11010","Ĝ":"11010","Ĥ":"1111","İ":"01001","Ï":"10011","Ì":"01110","Ĵ":"01110","Ł":"01001","Ń":"11011","Ñ":"11011","Ó":"1110","Ò":"1110","Ö":"1110","Ô":"1110","Ø":"1110","Ś":"0001000","Ş":"01100","Ș":"1111","Š":"1111","Ŝ":"00010","ß":"000000","Þ":"01100","Ü":"0011","Ù":"0011","Ŭ":"0011","Ž":"11001","Ź":"110010","Ż":"11001"},cyrillic:{"А":"01","Б":"1000","В":"011","Г":"110","Д":"100","Е":"0","Ж":"0001","З":"1100","И":"00","Й":"0111","К":"101","Л":"0100","М":"11","Н":"10","О":"111","П":"0110","Р":"010","С":"000","Т":"1","У":"001","Ф":"0010","Х":"0000","Ц":"1010","Ч":"1110","Ш":"1111","Щ":"1101","Ъ":"11011","Ы":"1011","Ь":"1001","Э":"00100","Ю":"0011","Я":"0101","Ї":"01110","Є":"00100","І":"00","Ґ":"110"},greek:{"Α":"01","Β":"1000","Γ":"110","Δ":"100","Ε":"0","Ζ":"1100","Η":"0000","Θ":"1010","Ι":"00","Κ":"101","Λ":"0100","Μ":"11","Ν":"10","Ξ":"1001","Ο":"111","Π":"0110","Ρ":"010","Σ":"000","Τ":"1","Υ":"1011","Φ":"0010","Χ":"1111","Ψ":"1101","Ω":"011"},hebrew:{"א":"01","ב":"1000","ג":"110","ד":"100","ה":"111","ו":"0","ז":"1100","ח":"0000","ט":"001","י":"00","כ":"101","ל":"0100","מ":"11","נ":"10","ס":"1010","ע":"0111","פ":"0110","צ":"011","ק":"1101","ר":"010","ש":"000","ת":"1"},arabic:{"ا":"01","ب":"1000","ت":"1","ث":"1010","ج":"0111","ح":"0000","خ":"111","د":"100","ذ":"1100","ر":"010","ز":"1110","س":"000","ش":"1111","ص":"1001","ض":"0001","ط":"001","ظ":"1011","ع":"0101","غ":"110","ف":"0010","ق":"1101","ك":"101","ل":"0100","م":"11","ن":"10","ه":"00100","و":"011","ي":"00","ﺀ":"0"},persian:{"ا":"01","ب":"1000","پ":"0110","ت":"1","ث":"1010","ج":"0111","چ":"1110","ح":"0000","خ":"1001","د":"100","ذ":"0001","ر":"010","ز":"1100","ژ":"110","س":"000","ش":"1111","ص":"0101","ض":"00100","ط":"001","ظ":"1011","ع":"111","غ":"0011","ف":"0010","ق":"111000","ک":"101","گ":"1101","ل":"0100","م":"11","ن":"10","و":"011","ه":"0","ی":"00"},japanese:{"ア":"11011","カ":"0100","サ":"10101","タ":"10","ナ":"010","ハ":"1000","マ":"1001","ヤ":"011","ラ":"000","ワ":"101","イ":"01","キ":"10100","シ":"11010","チ":"0010","ニ":"1010","ヒ":"11001","ミ":"00101","リ":"110","ヰ":"01001","ウ":"001","ク":"0001","ス":"11101","ツ":"0110","ヌ":"0000","フ":"1100","ム":"1","ユ":"10011","ル":"10110","ン":"01010","エ":"10111","ケ":"1011","セ":"01110","テ":"01011","ネ":"1101","ヘ":"0","メ":"10001","レ":"111","ヱ":"01100","オ":"01000","コ":"1111","ソ":"1110","ト":"00100","ノ":"0011","ホ":"100","モ":"10010","ヨ":"11","ロ":"0101","ヲ":"0111","゛":"00","゜":"00110","。":"010100","ー":"01101","、":"010101","（":"101101","）":"010010"},korean:{"ㄱ":"0100","ㄴ":"0010","ㄷ":"1000","ㄹ":"0001","ㅁ":"11","ㅂ":"011","ㅅ":"110","ㅇ":"101","ㅈ":"0110","ㅊ":"1010","ㅋ":"1001","ㅌ":"1100","ㅍ":"111","ㅎ":"0111","ㅏ":"0","ㅑ":"00","ㅓ":"1","ㅕ":"000","ㅗ":"01","ㅛ":"10","ㅜ":"0000","ㅠ":"010","ㅡ":"100","ㅣ":"001","ㅐ":"1101","ㅔ":"1011"},thai:{"ก":"110","ข":"1010","ค":"101","ง":"10110","จ":"10010","ฉ":"1111","ช":"1001","ซ":"1100","ญ":"0111","ด":"100","ต":"1","ถ":"10100","ท":"10011","น":"10","บ":"1000","ป":"0110","ผ":"1101","ฝ":"10101","พ":"01100","ฟ":"0010","ม":"11","ย":"1011","ร":"010","ล":"0100","ว":"011","ส":"000","ห":"0000","อ":"10001","ฮ":"11011","ฤ":"01011","ะ":"01000","า":"01","ิ":"00100","ี":"00","ึ":"00110","ื":"0011","ุ":"00101","ู":"1110","เ":"0","แ":"0101","ไ":"01001","โ":"111","ำ":"00010","่":"001","้":"0001","๊":"11000","๋":"01010","ั":"01101","็":"11100","์":"11001","ๆ":"10111","ฯ":"11010"}},t=(t="0",n="1")=>((e,t="0",n="1")=>Object.fromEntries(Object.entries(e).map((([e,o])=>[e,Object.fromEntries(Object.entries(o).map((([e,o])=>[o.replace(/0/g,t).replace(/1/g,n),e])))]))))(e,t,n),n=(e,t,n)=>" "===e?"/":t[e]??n,o=(t,o={})=>{const{script:r,dash:i,dot:a,seperator:s,unknown:c,strict:l}={dash:"-",dot:".",seperator:" ",script:null,unknown:"#",strict:!1,...o};let d="";if(r){const o=e[r];if(!o)return c;d=[...t.replace(/\s+/g," ").trim().toUpperCase()].map((e=>n(e,o,c))).join(s)}else{let o=null;d=[...t.replace(/\s+/g," ").trim().toUpperCase()].map((t=>{for(const r in e)if(void 0!==e[r]&&void 0!==e[r][t]||" "===t){if(l&&o&&o!==r)throw new Error(`Inconsistent scripts detected: ${o} and ${r}. Strict mode is enabled. You must specify the script to encode. Only characters from the same script can be encoded.`);return o=r,n(t,e[r],c)}return c})).join(s)}return((e,t,n)=>e.replace(/0/g,t).replace(/1/g,n))(d,a,i)},r=(e,t,n)=>"/"===e?" ":t[e]??n,i=(e,n={})=>{const{script:o,seperator:i,unknown:a,dash:s,dot:c,strict:l}={dash:"-",dot:".",seperator:" ",script:null,unknown:"#",strict:!1,...n},d=t(c,s);if(o)return void 0===d[o]?a:e.split(i).map((e=>r(e,d[o],a))).join("");{let t=null;return e.split(i).map((e=>{for(const n in d)if(void 0!==d[n]&&void 0!==d[n][e]||"/"===e){if(l&&t&&t!==n)throw new Error(`Inconsistent scripts detected: ${t} and ${n}. Strict mode is enabled. You must specify the script to decode. Only morse characters from the same script can be decoded.`);return t=n,r(e,d[n],a)}return a})).join("")}},a=(e,t,n,o)=>{const r=e instanceof Blob?e:new Blob([e],{type:t}),i=URL.createObjectURL(r),a=document.createElement("a");a.href=i,a.download=n+o,a.click(),URL.revokeObjectURL(i)};async function s(e,t,n,o,r=""){try{if(window.showSaveFilePicker){const i={suggestedName:r,types:[{description:e,accept:{[t]:[n]}}]},a=await window.showSaveFilePicker(i),s=await a.createWritable();await s.write(o),await s.close()}else a(o,t,r,n)}catch(e){throw console.error(e),new Error("Failed to save file: "+e)}}return{decode:i,encode:o,audio:(e,t={})=>{t={dot:".",dash:"-",input:"morse",...t};let n=window.AudioContext||window.webkitAudioContext,r=window.OfflineAudioContext||window.webkitOfflineAudioContext;if(!n||!r)throw new Error("Web Audio API is not supported in this browser");e="text"===t.input?o(e,t):e;const[c,l,d]=((e,t={},n=0)=>{let{unit:o,fwUnit:r}={unit:.1,fwUnit:.1,...t};const i=[],a=[];let s=0;t.wpm&&(o=r=60/(50*t.wpm));const c=e=>{const r=t.volume/100||.5;i.push([r,n+s]),s+=o*e},l=e=>{i.push([0,n+s]),s+=r*e},d=e=>{i.push([0,n+s]),s+=e*o};for(let n=0,o=!1;n<e.length;n++)" "===e[n]?(l(7),o=!1):e[n]===t.dot?(o?d(1):o=!0,c(1)):e[n]===t.dash?(o?d(1):o=!0,c(3)):void 0!==e[n+1]&&" "!==e[n+1]&&(l(3),o=!1),a.push([s,n+1]);return[i,s,a]})(e,t);let u=new n,f=new r(1,44100*l,44100);const p=f.createOscillator(),w=f.createGain();p.type=t?.oscillator?.type||"sine",p.frequency.value=t?.oscillator?.frequency||440,c.forEach((([e,t])=>w.gain.setValueAtTime(e,t))),p.connect(w),w.connect(f.destination);let m=null,h=null,b=null,y=0,g=!1,v=0,U=!1,P=null;const k=new Promise(((e,t)=>{p.start(0),f.startRendering(),f.oncomplete=n=>{try{h=n.renderedBuffer,e()}catch(e){t(e)}},f.onerror=e=>t(e)})),A=()=>{(()=>{let e=(Date.now()-v)/1e3;if(e){const n=d.findIndex((([t,n])=>t>e)),o=c.findIndex((([t,n])=>n>e));d[n]&&t?.onHeadProgress&&t?.onHeadProgress(d[n]),c[o]&&t?.onProgress&&t?.onProgress(c[o])}})(),P=requestAnimationFrame(A)},O=()=>{P&&(cancelAnimationFrame(P),P=null)},j=()=>{clearTimeout(b),O(),m&&(U=!1,m.stop(),y=Date.now()-v,g=!1,t?.onPause&&t?.onPause())},x=()=>{j(),y=0,g=!1,t?.onPause&&t?.onPause(),v=0,U=!1,O()},E=async()=>(h||await k,(e=>{const t=e.numberOfChannels,n=e.sampleRate,o=e.length,r=o*t*2+44,i=new DataView(new ArrayBuffer(r)),a=(e,t,n)=>{for(let o=0;o<n.length;o++)e.setUint8(t+o,n.charCodeAt(o))},s=(e,t,n)=>{for(let o=0;o<n.length;o++,t+=2){const r=Math.max(-1,Math.min(1,n[o]));e.setInt16(t,r<0?32768*r:32767*r,!0)}};a(i,0,"RIFF"),i.setUint32(4,r-8,!0),a(i,8,"WAVE"),a(i,12,"fmt "),i.setUint32(16,16,!0),i.setUint16(20,1,!0),i.setUint16(22,t,!0),i.setUint32(24,n,!0),i.setUint32(28,n*t*2,!0),i.setUint16(32,2*t,!0),i.setUint16(34,16,!0),a(i,36,"data"),i.setUint32(40,o*t*2,!0);let c=44;for(let n=0;n<t;n++)s(i,c,e.getChannelData(n)),c+=2*o;return i.buffer})(h));return{play:async()=>{if(g)j();else{if(U)return;g=!0,t?.onPlay&&t?.onPlay(),Date.now()>v+y&&(v=Date.now()-y),await k,"suspended"===u.state&&await u.resume(),m=u.createBufferSource(),m.buffer=h,m.connect(u.destination),m.onended=()=>{g=!1,t?.oscillator?.onEnded&&t?.oscillator?.onEnded(),O()},m.start(u.currentTime,y/1e3),U=!0,clearTimeout(b),b=setTimeout((()=>x()),1e3*l),P||A()}},pause:j,stop:x,audioContext:u,oscillator:p,gainNode:w,getWavData:E,saveWav:async(t,n)=>{const{filePicker:o}={filePicker:!0,...n};t||(t=i(e));const r=await E();o?s("Audio File (Wav)","audio/wav",".wav",r,t):a(r,"audio/wav",t,".wav")}}},saveFile:s,downloadFile:a}}));
