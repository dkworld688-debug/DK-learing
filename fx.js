/* DK mouse effects: glow cursor, particle trail, click burst, 3D card tilt */
(function(){
if(matchMedia('(pointer:coarse)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var st=document.createElement('style');
st.textContent='.dkc-dot{position:fixed;left:0;top:0;pointer-events:none;z-index:99999;border-radius:50%;will-change:transform}.dkc-dot{width:8px;height:8px;margin:-4px 0 0 -4px;background:#00e5ff;box-shadow:0 0 14px 3px #00e5ff}#dkfx{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:99998}';
document.head.appendChild(st);
var cv=document.createElement('canvas');cv.id='dkfx';document.body.appendChild(cv);
var dot=document.createElement('div');dot.className='dkc-dot';document.body.append(dot);
var x=cv.getContext('2d'),W,H,P=[],mx=-100,my=-100,hue=190;
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight}size();addEventListener('resize',size);
function spawn(n,v,life){for(var i=0;i<n;i++){var a=Math.random()*6.283,s=Math.random()*v;P.push({x:mx,y:my,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:life,m:life,h:hue+Math.random()*60,r:1+Math.random()*2.5})}}
addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;dot.style.transform='translate('+mx+'px,'+my+'px)';hue=(hue+2)%360;spawn(2,1.2,38);});
addEventListener('mousedown',function(){spawn(24,6,50)});
document.addEventListener('mouseleave',function(){mx=my=-100});
(function loop(){ x.clearRect(0,0,W,H);x.globalCompositeOperation='lighter';
 for(var i=P.length-1;i>=0;i--){var p=P[i];p.x+=p.vx;p.y+=p.vy;p.vx*=.96;p.vy*=.96;p.l--;if(p.l<=0){P.splice(i,1);continue}
  var a=p.l/p.m;x.fillStyle='hsla('+p.h+',100%,60%,'+a*.8+')';x.beginPath();x.arc(p.x,p.y,p.r*a+.3,0,6.283);x.fill()}
 if(P.length>400)P.splice(0,P.length-400);requestAnimationFrame(loop)})();
// 3D tilt + light on cards
var SEL='.grid .card,.service-card,.step,.th,.gn-button,.intro-text,.stat';
document.addEventListener('mousemove',function(e){var el=e.target.closest&&e.target.closest(SEL);if(!el)return;
 var r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
 el.style.transition='transform .08s';el.style.transform='perspective(800px) rotateX('+(-py*10)+'deg) rotateY('+(px*12)+'deg) translateY(-6px) scale(1.02)'});
document.addEventListener('mouseout',function(e){var el=e.target.closest&&e.target.closest(SEL);if(el&&!el.contains(e.relatedTarget)){el.style.transition='transform .4s';el.style.transform=''}});
})();
