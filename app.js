const chat=document.querySelector('#chat'), form=document.querySelector('#composer'), input=document.querySelector('#message');
const KEY='kaidons-bot-chat-v1';
let history=JSON.parse(localStorage.getItem(KEY)||'[]');
function add(text,who='bot'){const el=document.createElement('article');el.className='bubble '+who;const label=document.createElement('b');label.textContent=who==='bot'?"Kaidon's Bot":'You';const p=document.createElement('p');p.textContent=text;el.append(label,p);chat.append(el);chat.scrollTop=chat.scrollHeight;}
function render(){history.forEach(m=>add(m.text,m.who));}
function save(text,who){history.push({text,who});localStorage.setItem(KEY,JSON.stringify(history.slice(-150)));}
const jokes=["Why did the phone wear glasses? It lost its contacts. 🤓","Why was the computer cold? It left its Windows open. 😂","What do you call a robot who takes the long way? R2-Detour. 🤖"];
const questions=[{q:"Which planet is known as the Red Planet?",a:["Venus","Mars","Jupiter"],correct:1},{q:"How many sides does a hexagon have?",a:["5","6","8"],correct:1},{q:"What gas do plants absorb?",a:["Oxygen","Carbon dioxide","Helium"],correct:1}];
function reply(raw){const s=raw.trim(), low=s.toLowerCase();
 if(low==='.help')return "Commands:\n.help — show commands\n.joke — tell a joke\n.quiz — start a quick quiz\n.rules — show sample group rules\n.info your question — basic offline info";
 if(low==='.joke')return jokes[Math.floor(Math.random()*jokes.length)];
 if(low==='.quiz'){const q=questions[Math.floor(Math.random()*questions.length)];return `QUIZ TIME 💚\n${q.q}\n${q.a.map((x,i)=>`${i+1}. ${x}`).join('\n')}\n\nReply with 1, 2 or 3. (Quiz answers are not yet tracked in this starter.)`;}
 if(low==='.rules')return "Sample group rules:\n1. Respect everyone.\n2. No bullying or harassment.\n3. Keep messages relevant.\n4. Ask an admin before sharing private content.\n5. Admins make final moderation decisions.";
 if(low.startsWith('.info '))return "I'm in offline starter mode, so I can answer built-in commands but I don't have live AI knowledge yet. Connect a secure AI service in a later version for broader questions.";
 if(low.startsWith('.play '))return "Music search needs an online music service. I can help find authorised tracks in a future connected version; I can't provide copyrighted song files without permission.";
 if(low.startsWith('.'))return "I don't recognise that command. Type .help to see what I can do.";
 return "I'm currently in offline starter mode. I can run .help, .joke, .quiz and .rules. Full AI answers and new AI images need an online AI service; this starter doesn't pretend to generate them yet.";
}
function send(text){text=text.trim();if(!text)return;add(text,'user');save(text,'user');const answer=reply(text);add(answer);save(answer,'bot');}
form.addEventListener('submit',e=>{e.preventDefault();send(input.value);input.value='';});
document.querySelectorAll('[data-command]').forEach(b=>b.addEventListener('click',()=>send(b.dataset.command)));
document.querySelector('#clear').addEventListener('click',()=>{if(confirm('Clear this device’s chat history?')){history=[];localStorage.removeItem(KEY);chat.innerHTML='';add("Hosh! I'm here to bring the vibe. 💚 Ask me something or type .help.");}});
render();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
