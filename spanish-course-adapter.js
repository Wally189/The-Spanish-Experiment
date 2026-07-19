(()=>{
const replacements=[
['The Latin Experiment','The Spanish Experiment'],
['A public journey into the Church’s language','A public journey into Spanish'],
['Ecclesiastical Latin','Spanish'],['ecclesiastical Latin','Spanish'],
['Latin by the Natural Method','Poco a Poco'],['Father William Most','Guillermo F. Hall Avilés'],['Father Most','Hall Avilés'],
['Why Latin?','Why Spanish?'],['why-latin.html','why-spanish.html'],
['Today’s Latin','Today’s Spanish'],['Today’s latin','Today’s Spanish'],
['First volume','Parte Primera'],['Volume I','Parte Primera'],['Volume 1','Parte Primera'],
['Church’s language','Spanish language'],['the Church’s language','Spanish'],
['Latin','Spanish'],['latin','Spanish'],['LATIN','SPANISH']
];
let themeAdded=false;
function replaceText(root=document.body){
  if(!root)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{let value=node.nodeValue;replacements.forEach(([a,b])=>value=value.split(a).join(b));node.nodeValue=value});
}
function replaceAttributes(root=document){
  root.querySelectorAll?.('[href]').forEach(el=>{let href=el.getAttribute('href')||'';href=href.replaceAll('why-latin.html','why-spanish.html');el.setAttribute('href',href)});
  root.querySelectorAll?.('[style]').forEach(el=>{let s=el.getAttribute('style')||'';s=s.replace(/#8e1530/gi,'#aa151b').replace(/#dda937/gi,'#f1bf00').replace(/#244b9b/gi,'#aa151b').replace(/#71307b/gi,'#aa151b').replace(/#2e7051/gi,'#f1bf00');el.setAttribute('style',s)});
}
function applyTheme(){
  if(themeAdded)return;themeAdded=true;
  const style=document.createElement('style');
  style.textContent=`:root{--burgundy:#aa151b!important;--blue:#aa151b!important;--gold:#f1bf00!important;--purple:#aa151b!important;--green:#f1bf00!important}.hero-visual{background:linear-gradient(160deg,#aa151b,#aa151b 48%,#f1bf00)!important}.brand-mark{font-size:0}.brand-mark:after{content:"ES";font:900 14px system-ui;color:#f1bf00}.hero:after{content:"ES"!important;color:rgba(170,21,27,.08)!important;font-size:170px!important}.progress-track span{background:#aa151b!important}.lesson-link.active{border-color:#f1bf00!important;background:#fff8d6!important}.lesson-link.active .icon{background:#aa151b!important}.side-card.blue,.side-card.purple,.side-card.green{border-top-color:#aa151b!important}.manifesto{background:linear-gradient(145deg,#aa151b,#6f0b10 70%,#f1bf00)!important}`;
  document.head.appendChild(style);
}
function adaptCourseShell(){
  const brandMark=document.querySelector('.brand-mark');if(brandMark)brandMark.textContent='ES';
  document.querySelectorAll('.lesson-link').forEach((button,index)=>{const strong=button.querySelector('strong');if(strong)strong.textContent='Lección '+(index+1)});
  const book=document.querySelector('.book-card');if(book)book.innerHTML='<strong>Poco a Poco</strong>Guillermo F. Hall Avilés’ public-domain direct-method Spanish course.<br><a href="https://archive.org/details/pocopocoelementa00hallrich" target="_blank" rel="noopener">Open the source book →</a>';
}
function adaptCurrentLesson(){
  const page=document.querySelector('.lesson-page');if(!page)return;
  const number=Number(page.dataset.lessonNumber||1);
  const h1=page.querySelector('h1');if(h1&&page.dataset.publicationStatus==='published')h1.textContent='Lección '+toRoman(number);
  const heroWord=page.querySelector('.hero-visual .latin,.hero-visual .spanish');if(heroWord){heroWord.classList.remove('latin');heroWord.classList.add('spanish');heroWord.textContent='¿QUÉ ES?'}
  page.querySelectorAll('.book-title-link').forEach(link=>{link.innerHTML='<em>Poco a Poco</em>';link.href='index.html#materials'});
  const sourceFact=[...page.querySelectorAll('.fact')].find(x=>x.textContent.includes('Based on'));if(sourceFact){const span=sourceFact.querySelector('span');if(span)span.innerHTML='Guillermo F. Hall Avilés<br><a class="book-title-link" href="index.html#materials"><em>Poco a Poco</em></a>'}
  const why=page.querySelector('.side-card.blue');if(why){why.querySelector('h3').textContent='Why Spanish?';why.querySelector('p').textContent='Explore the reason for learning Spanish and using a historic direct-method course.';const a=why.querySelector('a');if(a)a.href='why-spanish.html?return='+encodeURIComponent('course.html?lesson='+number)}
  const bookCard=[...page.querySelectorAll('.side-card')].find(x=>x.textContent.includes('Have the book?'));if(bookCard){bookCard.querySelector('p').textContent='This website accompanies Poco a Poco. Use the book as the primary text.'}
  const church=[...page.querySelectorAll('.side-card')].find(x=>x.querySelector('h3')?.textContent==='In the Church');if(church)church.querySelector('h3').textContent='In the Spanish-speaking world';
  const manifesto=page.querySelector('.manifesto');if(manifesto){manifesto.querySelector('h3').innerHTML='One language.<br>Many countries.<br>Many centuries.';manifesto.querySelector('p').textContent='What happens when a learner begins recognising Spanish as something they can actually use?'}
}
function toRoman(n){const map=[[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let out='';for(const [v,s] of map)while(n>=v){out+=s;n-=v}return out}
function run(){applyTheme();replaceText();replaceAttributes();adaptCourseShell();adaptCurrentLesson();document.title=document.title.replace(/Latin/g,'Spanish')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
window.addEventListener('latin-lesson-rendered',()=>requestAnimationFrame(run));
new MutationObserver(()=>requestAnimationFrame(()=>{replaceText();replaceAttributes();adaptCourseShell()})).observe(document.documentElement,{subtree:true,childList:true});
})();
