(()=>{
  const toast=document.getElementById('lockToast');
  const page=document.getElementById('lessonPage');
  const lessonNumber=()=>Number(new URLSearchParams(location.search).get('lesson'))||1;
  const showLock=()=>{
    if(!toast)return;
    toast.classList.add('show');
    clearTimeout(window.spanishLockTimer);
    window.spanishLockTimer=setTimeout(()=>toast.classList.remove('show'),2200);
  };
  const scrollToElement=selector=>document.querySelector(selector)?.scrollIntoView({behavior:'smooth',block:'start'});

  function applyArabicNumbers(){
    const n=lessonNumber();
    document.querySelectorAll('.lesson-link').forEach(link=>{
      const number=Number(link.dataset.number);
      if(!number)return;
      const icon=link.querySelector('.icon');
      const heading=link.querySelector('strong');
      if(icon)icon.textContent=String(number);
      if(heading)heading.textContent='Lección '+number;
    });
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

  function convertToSingleReading(){
    const heads=[...page.querySelectorAll('.section-head')];
    const first=heads.find(h=>h.querySelector('h2')?.textContent.trim()==='First reading');
    const second=heads.find(h=>h.querySelector('h2')?.textContent.trim()==='Second reading');
    if(first){
      first.querySelector('h2').textContent='Reading';
      const p=first.querySelector('p');
      if(p)p.textContent='This is my interpretation of the lesson; corrections and constructive feedback are welcome.';
      const grid=first.nextElementSibling;
      grid?.querySelectorAll('.tag').forEach(tag=>tag.textContent='one reading · my interpretation');
      grid?.querySelectorAll('.audio-card>p').forEach(text=>text.textContent='Listen to or make one complete reading of the lesson before continuing with the written work.');
      grid?.querySelectorAll('.audio-placeholder span:first-of-type').forEach(text=>text.textContent='Lesson reading to be added');
    }
    if(second){
      const secondGrid=second.nextElementSibling;
      secondGrid?.remove();
      second.remove();
    }
    const between=heads.find(h=>h.querySelector('h2')?.textContent.trim()==='Between the readings');
    if(between){
      between.querySelector('h2').textContent='Work through the lesson';
      const p=between.querySelector('p');
      if(p)p.textContent='Use the original textbook, your notebook, your voice and a dictionary.';
    }
    const recall=[...page.querySelectorAll('.path-card')].find(card=>card.querySelector('h3')?.textContent.trim()==='Recuerda');
    if(recall){
      const summary=recall.querySelector('.inside>p');
      const detail=recall.querySelector('.path-detail');
      if(summary)summary.textContent='Close the book. Recall the words and rebuild the lesson.';
      if(detail)detail.textContent='Test what you can remember, then return to the source and correct anything uncertain.';
    }
  }

  function enhanceLesson(){
    if(!page?.querySelector('.lesson-grid'))return;
    const n=lessonNumber();
    const signature='lesson-'+n;
    page.dataset.currentLesson=String(n);
    applyArabicNumbers();
    convertToSingleReading();
    if(page.dataset.parityEnhanced===signature)return;
    page.dataset.parityEnhanced=signature;

    const checklistKey='spanish-experiment-checklist-'+n;
    let checked=[];
    try{checked=JSON.parse(localStorage.getItem(checklistKey)||'[]')}catch{checked=[]}
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
  }

  document.addEventListener('click',event=>{
    const locked=event.target.closest('.lesson-link.coming');
    if(locked){
      event.preventDefault();
      event.stopImmediatePropagation();
      showLock();
    }
  },true);

  if(page){
    const observer=new MutationObserver(()=>requestAnimationFrame(enhanceLesson));
    observer.observe(page,{childList:true});
    enhanceLesson();
  }
})();