function saveProgress(key,score){localStorage.setItem(DKAuth.k('dk_'+key),String(score));updateProgress()}function updateProgress(){const keys=['computer','internet','python'];let done=keys.filter(k=>localStorage.getItem(DKAuth.k('dk_'+k))).length;const el=document.getElementById('progressText');if(el)el.textContent=`Activities completed: ${done}/3`;const bar=document.getElementById('progressBar');if(bar)bar.style.width=(done/3*100)+'%'}
function resetAll(){if(confirm('Reset all activity scores?')){['computer','internet','python'].forEach(k=>localStorage.removeItem(DKAuth.k('dk_'+k)));location.reload()}}
updateProgress();

document.addEventListener('DOMContentLoaded',()=>{const m=document.querySelector('.menu'),n=document.querySelector('.navlinks');if(m&&n)m.addEventListener('click',()=>n.classList.toggle('open'))});
document.addEventListener('click',e=>{const l=e.target.closest&&e.target.closest('a[href$=".pdf"]');if(l){try{sessionStorage.setItem('DK_RETURN',location.pathname.split('/').pop()+location.search)}catch(x){}l.removeAttribute('target')}},true);
