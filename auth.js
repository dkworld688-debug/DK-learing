/* DK auth helpers. NOTE: client-side only = demo-grade. Real security needs a server. */
(function(){
var TTL=2*60*60*1000, PROTECTED=!/(^|\/)index\.html$|\/$/.test(location.pathname);
window.DKAuth={
 session:function(){try{var s=JSON.parse(sessionStorage.getItem('DK_SESSION')||'null');if(s&&Date.now()-s.t<TTL)return s}catch(e){}return null},
 login:function(u){sessionStorage.setItem('DK_SESSION',JSON.stringify({u:u,t:Date.now()}))},
 k:function(n){var s=DKAuth.session();return 'DKp:'+(s?encodeURIComponent(s.u.toLowerCase()):'guest')+':'+n},
 logout:function(){sessionStorage.removeItem('DK_SESSION');location.href='index.html'},
 hex:function(b){return Array.from(new Uint8Array(b)).map(function(v){return v.toString(16).padStart(2,'0')}).join('')},
 hash:async function(pw,saltHex){
  var salt=saltHex?new Uint8Array(saltHex.match(/../g).map(function(h){return parseInt(h,16)})):crypto.getRandomValues(new Uint8Array(16));
  var key=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveBits']);
  var bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt:salt,iterations:150000,hash:'SHA-256'},key,256);
  return{salt:DKAuth.hex(salt),hash:DKAuth.hex(bits)}}
};
if(PROTECTED&&!DKAuth.session())location.replace('index.html');
document.addEventListener('DOMContentLoaded',function(){
 document.querySelectorAll('[data-logout],#logoutLink,#loginBtnNav').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();DKAuth.logout()})})});
})();
