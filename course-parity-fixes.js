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
    }
  },true);

  function enhanceLesson(){
    const page=document.getElementById('lessonPage');
    if(!page||!page.querySelector('.lesson-grid'))return;
    const n=lessonNumber();
    const signature='lesson-'+n;
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

  const page=document.getElementById('lessonPage');
  if(page){
    new MutationObserver(enhanceLesson).observe(page,{childList:true});
    enhanceLesson();
  }

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