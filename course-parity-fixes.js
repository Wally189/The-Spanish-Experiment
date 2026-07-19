(()=>{
  const toast=document.getElementById('lockToast');
  function showLock(){
    if(!toast)return;
    toast.classList.add('show');
    clearTimeout(window.spanishLockTimer);
    window.spanishLockTimer=setTimeout(()=>toast.classList.remove('show'),2200);
  }
  document.addEventListener('click',event=>{
    const lesson=event.target.closest('.lesson-link.coming');
    if(!lesson)return;
    event.preventDefault();
    event.stopImmediatePropagation();
    showLock();
  },true);
  const requested=Number(new URLSearchParams(location.search).get('lesson'));
  if(requested>1){
    const published=document.querySelector('.lesson-link[data-number="'+requested+'"].published');
    if(!published){
      const url=new URL(location.href);
      url.searchParams.set('lesson','1');
      history.replaceState({},'',url.pathname+url.search);
      setTimeout(()=>document.querySelector('.lesson-link[data-number="1"]')?.click(),0);
      setTimeout(showLock,100);
    }
  }
})();