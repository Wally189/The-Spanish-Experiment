(()=>{
  const toast=document.getElementById('lockToast');
  const lessonNumber=()=>Number(new URLSearchParams(location.search).get('lesson'))||1;
  const showLock=()=>{
    if(!toast)return;
    toast.classList.add('show');
    clearTimeout(window.spanishLockTimer);
    window.spanishLockTimer=setTimeout(()=>toast.classList.remove('show'),2200);
  };
  const scrollToElement=selector=>document.querySelector(selector)?.scrollIntoView({behavior:'smooth',block:'start'});

  document.addEventListener('click',event=>{
    const locked=event.target.closest('.lesson-link.coming');
    if(locked){
      event.preventDefault();
      event.stopImmediatePropagation();
      showLock();
      return;
    }
    if(event.target.closest('#completeButton'))setTimeout(enhanceLesson,0);
  },true);

  function applyArabicNumbers(){
    document.querySelectorAll('.lesson-link').forEach(link=>{
      const n=Number(link.dataset.number);
      if(!n)return;
      const icon=link.querySelector('.icon');
      const heading=link.querySelector('strong');
      if(icon&&icon.textContent!==String(n))icon.textContent=String(n);
      if(heading&&heading.textContent!=='Lección '+n)heading.textContent='Lección '+n;
    });
    const n=lessonNumber();
    const hero=document.querySelector('.hero h1');
    if(hero)hero.textContent='Lección '+n;
    const reflection=document.querySelector('.content-card h3');
    if(reflection&&reflection.textContent.startsWith('What Lección'))reflection.textContent='What Lección '+n+' reveals';
    const crumbs=document.querySelector('.breadcrumbs');
    if(crumbs)crumbs.innerHTML=crumbs.innerHTML.replace(/Lección\s+[IVXLCDM]+/g,'Lección '+n);
    const complete=document.getElementById('completeButton');
    if(complete)complete.textContent=complete.classList.contains('done')?'Lección '+n+' completed ✓':'Mark Lección '+n+' complete';
    document.title='The Spanish Experiment — Lección '+n;
  }

  function enhanceLesson(){
    applyArabicNumbers();
    const page=document.getElementById('lessonPage');
    if(!page||!page.querySelector('.lesson-grid'))return false;
    if(page.dataset.parityEnhanced==='yes')return true;
    page.dataset.parityEnhanced='yes';
    const n=lessonNumber();
    const checklistKey='spanish-experiment-checklist-'+n;
    let checked=[];
    try{checked=JSON.parse(localStorage.getItem(checklistKey)||'[]')}catch(e){checked=[]}
    page.querySelectorAll('.reader-check input').forEach((box,index)=>{
      box.checked=checked.includes(index);
      box.addEventListener('change',()=>{
        const state=[...page.querySelectorAll('.reader-check input')]
          .map((item,i)=>item.checked?i:null).filter(i=>i!==null);
        localStorage.setItem(checklistKey,JSON.stringify(state));
      });
    });
    const actions=[...page.querySelectorAll('.quick-action')];
    if(actions[0])actions[0].onclick=()=>scrollToElement('.reading-grid');
    if(actions[1])actions[1].onclick=()=>scrollToElement('.study-sequence');
    if(actions[2])actions[2].onclick=()=>scrollToElement('.reader-turn');
    if(actions[3])actions[3].onclick=()=>scrollToElement('.path-grid');
    if(actions[4])actions[4].onclick=()=>{
      let panel=page.querySelector('.private-notes');
      if(!panel){
        panel=document.createElement('section');
        panel.className='private-notes';
        panel.innerHTML='<label for="privateLessonNotes">My private notes</label><textarea id="privateLessonNotes" placeholder="Record what clicked, what was difficult, and what to revisit."></textarea><small>Saved only in this browser.</small>';
        actions[4].closest('.section').appendChild(panel);
        const area=panel.querySelector('textarea'),key='spanish-experiment-notes-'+n;
        area.value=localStorage.getItem(key)||'';
        area.addEventListener('input',()=>localStorage.setItem(key,area.value));
      }
      panel.scrollIntoView({behavior:'smooth',block:'center'});
      panel.querySelector('textarea')?.focus();
    };
    return true;
  }

  let attempts=0;
  const initialise=setInterval(()=>{
    attempts++;
    const ready=enhanceLesson();
    if(ready||attempts>=40)clearInterval(initialise);
  },75);

  const requested=lessonNumber();
  if(requested>1){
    setTimeout(()=>{
      const published=document.querySelector('.lesson-link[data-number="'+requested+'"].published');
      if(!published){
        const url=new URL(location.href);
        url.searchParams.set('lesson','1');
        history.replaceState({},'',url.pathname+url.search);
        document.querySelector('.lesson-link[data-number="1"]')?.click();
        showLock();
      }
    },350);
  }
})();