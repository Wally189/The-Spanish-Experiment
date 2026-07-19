(()=>{
const replacements=[
['The Latin Experiment','The Spanish Experiment'],
['A public journey into the Church’s language','A public journey into Spanish'],
['Ecclesiastical Latin','Spanish'],['ecclesiastical Latin','Spanish'],
['Latin by the Natural Method','Poco a Poco'],['Father William Most','Guillermo F. Hall Avilés'],['Father Most','Hall Avilés'],
['Latin','Spanish'],['latin','Spanish'],['LATIN','SPANISH'],
['Volume I','Parte Primera'],['Volume 1','Parte Primera'],
['Why Latin?','Why Spanish?'],['why-latin.html','why-spanish.html'],
['Today’s Spanish','Today’s Spanish']
];
function replaceText(root=document.body){const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(node=>{let value=node.nodeValue;replacements.forEach(([a,b])=>value=value.split(a).join(b));node.nodeValue=value})}
function replaceAttributes(){document.querySelectorAll('[href]').forEach(el=>{let href=el.getAttribute('href')||'';href=href.replace(/^index\.html/,'index.html').replace('why-latin.html','why-spanish.html');el.setAttribute('href',href)});document.querySelectorAll('[style]').forEach(el=>{let s=el.getAttribute('style');s=s.replace(/#8e1530/gi,'#aa151b').replace(/#dda937/gi,'#f1bf00').replace(/#244b9b/gi,'#aa151b').replace(/#71307b/gi,'#aa151b').replace(/#2e7051/gi,'#f1bf00');el.setAttribute('style',s)})}
function applyTheme(){const style=document.createElement('style');style.textContent=':root{--burgundy:#aa151b!important;--blue:#aa151b!important;--gold:#f1bf00!important;--purple:#aa151b!important;--green:#f1bf00!important}.hero-visual{background:linear-gradient(160deg,#aa151b,#aa151b 48%,#f1bf00)!important}.brand-mark{font-size:0}.brand-mark:after{content:"ES";font:900 14px system-ui;color:#f1bf00}.hero:after{content:"ES"!important;color:rgba(170,21,27,.08)!important;font-size:170px!important}';document.head.appendChild(style)}
function adaptLessonOne(){const h1=document.querySelector('h1');if(h1)h1.textContent='Lección I';const subtitle=document.querySelector('.subtitle');if(subtitle)subtitle.textContent='Parte Primera · Lección Primera';const heroLatin=document.querySelector('.hero-visual .latin');if(heroLatin){heroLatin.classList.remove('latin');heroLatin.classList.add('spanish');heroLatin.textContent='¿Qué es?'}
const lede=document.querySelector('.lede');if(lede)lede.textContent='The first experiment follows the opening of Poco a Poco: animals, size, direct questions and repeated model answers, approached through reading, handwriting, speaking, listening and reflection.';
const book=document.querySelector('.book-card');if(book){book.innerHTML='<strong>Poco a Poco</strong>Guillermo F. Hall Avilés’ public-domain direct-method Spanish course.<br><a href="https://archive.org/details/pocopocoelementa00hallrich" target="_blank" rel="noopener">Open the source book →</a>'}
const sample=document.querySelector('.sample-latin');if(sample){sample.className='sample-spanish';sample.innerHTML='El elefante es un animal.<br>¿Qué es el elefante?<br>Es un animal.'}
document.querySelectorAll('.lesson-link').forEach((button,index)=>{if(index===0){button.classList.remove('locked');const strong=button.querySelector('strong');const small=button.querySelector('small');if(strong)strong.textContent='Lección I';if(small)small.textContent='Animals, size and direct questions'}else{const strong=button.querySelector('strong');if(strong)strong.textContent='Lección '+(index+1)}});
}
function run(){replaceText();replaceAttributes();applyTheme();adaptLessonOne();document.title=document.title.replace(/Latin/g,'Spanish')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
new MutationObserver(()=>{replaceText();replaceAttributes()}).observe(document.documentElement,{subtree:true,childList:true});
})();