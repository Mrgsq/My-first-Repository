"use strict";function Magnifier(t){var e={scal:2};Object.assign(e,t);var o=document.getElementById(e.ele),s=o.children[0],i=(s.children[0],o.children[2]),l=document.getElementById("mask"),n=i.children[0],d=(o.children[1],0),h=0;s.onmouseover=function(){l.style.display="block",i.style.display="block"},s.onmouseout=function(){l.style.display="none",i.style.display="none"};var c=0;window.onscroll=function(){c=scrollY},s.onmousemove=function(t){o.offsetTop+=c,d=t.clientX-o.offsetLeft-l.offsetWidth/2,h=t.clientY-o.offsetTop+scrollY-l.offsetHeight/2,d<0?d=0:d>s.offsetWidth-l.offsetWidth&&(d=s.offsetWidth-l.offsetWidth),h<0?h=0:h>s.offsetHeight-l.offsetHeight&&(h=s.offsetHeight-l.offsetHeight);var e=(n.offsetWidth-i.offsetWidth)/(s.offsetWidth-l.offsetWidth),f=(n.offsetHeight-i.offsetHeight)/(s.offsetHeight-l.offsetHeight);l.style.left=d+"px",l.style.top=h+"px",n.style.left=-d*e+"px",n.style.top=-h*f+"px"}}