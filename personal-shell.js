(()=>{
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const hash=location.hash.toLowerCase();
  let active='home';
  if(page==='course.html'||page==='experiment.html'||page==='why-spanish.html')active='course';
  else if(page==='terminology.html'||page==='vocabulary.html'||page==='pronunciation.html')active='materials';
  else if(hash==='#schedule')active='schedule';
  else if(hash==='#materials')active='materials';
  else if(hash==='#certificates')active='certificates';
  else if(hash==='#contact')active='contact';
  const nav=document.querySelector('.global-nav,.nav');
  if(!nav)return;
  nav.setAttribute('aria-label','Primary navigation');
  const items=[
    ['home','index.html#home','⌂','Home'],
    ['course','course.html','▤','Course'],
    ['schedule','index.html#schedule','◫','Schedule'],
    ['materials','index.html#materials','▣','Materials'],
    ['certificates','index.html#certificates','✦','Certificates'],
    ['contact','index.html#contact','✉','Contact']
  ];
  nav.innerHTML='<div class="personal-shell-logo" aria-hidden="true">✠</div>'+items.map(([key,url,icon,label])=>'<a class="personal-shell-link'+(key===active?' on':'')+'" '+(key===active?'aria-current="page" ':'')+'href="'+url+'">'+icon+'<br>'+label+'</a>').join('');
})();
