/* DK 3D background: dependency-free perspective engine + mouse interaction */
(function(){
var el=document.getElementById('bg')||document.getElementById('bgCanvas');if(!el)return;
var cv=el;if(el.tagName!=='CANVAS'){cv=document.createElement('canvas');cv.style.cssText='position:absolute;inset:0;width:100%;height:100%';el.appendChild(cv)}
var x=cv.getContext('2d'),W,H,D=Math.min(devicePixelRatio||1,2),mx=0,my=0,mpx=-999,mpy=-999,t=0,run=true,i;
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var knot=[];for(i=0;i<460;i++){var u=i/460*Math.PI*6,r=1.1+.35*Math.cos(1.5*u);knot.push([r*Math.cos(u),r*Math.sin(u),.9*Math.sin(1.5*u)])}
var halo=[];for(i=0;i<90;i++){var a=i/90*Math.PI*2;halo.push([2.1*Math.cos(a),.15*Math.sin(a*3),2.1*Math.sin(a)])}
var g=(1+Math.sqrt(5))/2,V=[[-1,g,0],[1,g,0],[-1,-g,0],[1,-g,0],[0,-1,g],[0,1,g],[0,-1,-g],[0,1,-g],[g,0,-1],[g,0,1],[-g,0,-1],[-g,0,1]].map(function(v){return v.map(function(c){return c*.55})});
var E=[];for(var a1=0;a1<12;a1++)for(var b=a1+1;b<12;b++)if(Math.hypot(V[a1][0]-V[b][0],V[a1][1]-V[b][1],V[a1][2]-V[b][2])<1.2)E.push([a1,b]);
var S=[];for(i=0;i<170;i++)S.push([(Math.random()-.5)*14,(Math.random()-.5)*9,(Math.random()-.5)*10]);
function size(){W=cv.width=innerWidth*D;H=cv.height=innerHeight*D}
function rot(p,ay,ax){var c=Math.cos(ay),s=Math.sin(ay),X=p[0]*c+p[2]*s,Z=-p[0]*s+p[2]*c;c=Math.cos(ax);s=Math.sin(ax);return[X,p[1]*c-Z*s,p[1]*s+Z*c]}
function proj(p,ox){var f=3.2/(3.2+p[2]+2.2),m=Math.min(W,H)*.34,X=W/2+(p[0]+ox)*f*m,Y=H/2+p[1]*f*m;
 var dx=X-mpx*D,dy=Y-mpy*D,d=Math.hypot(dx,dy),R=170*D;if(d<R&&d>0){var k=(1-d/R)*60*D;X+=dx/d*k;Y+=dy/d*k}return[X,Y,f]}
function frame(){if(!run)return;t+=reduce?0:.006;x.clearRect(0,0,W,H);
var ay=t+mx*.9,ax=.35+my*.5,k;x.globalCompositeOperation='lighter';
for(k=0;k<S.length;k++){var q=proj(rot(S[k],ay*.3,ax*.3),0);x.fillStyle='rgba(139,92,246,'+.35*q[2]+')';x.fillRect(q[0],q[1],1.6*D,1.6*D)}
for(k=0;k<halo.length;k++){var h=proj(rot(halo[k],-ay*.7,ax*.8),0);x.fillStyle='rgba(255,157,0,'+.5*h[2]+')';x.beginPath();x.arc(h[0],h[1],(.8+h[2]*1.4)*D,0,7);x.fill()}
for(k=0;k<knot.length;k++){var p=proj(rot(knot[k],ay,ax),.9);x.fillStyle='hsla('+(190+knot[k][2]*60)+',100%,60%,'+(.25+p[2]*.55)+')';x.beginPath();x.arc(p[0],p[1],(1+p[2]*1.8)*D,0,7);x.fill()}
x.strokeStyle='rgba(0,229,255,.5)';x.lineWidth=1.2*D;
var P=V.map(function(v){return proj(rot(v,-ay*1.4,ax+t),-1.1)});
E.forEach(function(e){x.beginPath();x.moveTo(P[e[0]][0],P[e[0]][1]);x.lineTo(P[e[1]][0],P[e[1]][1]);x.stroke()});
requestAnimationFrame(frame)}
addEventListener('resize',size);addEventListener('mousemove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;mpx=e.clientX;mpy=e.clientY});
document.addEventListener('visibilitychange',function(){run=!document.hidden;if(run)frame()});
size();frame()})();
