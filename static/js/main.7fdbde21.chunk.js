(this["webpackJsonpdrum-machine"]=this["webpackJsonpdrum-machine"]||[]).push([[0],{16:function(e,t,n){e.exports=n(40)},40:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(12),r=n.n(o),s=n(2),c=function(e){var t=e.isActive,n=e.isPlaying,a=e.onClick;return i.a.createElement("div",{style:{height:"16px",minWidth:"16px",margin:"0 8px",borderRadius:"1px",backgroundColor:n?"#1e87f0":t?"#32d296":"#f8f8f8"},onClick:a})},u=function(e){var t=e.trackName,n=e.trackNotes,a=e.lastNotePlayed,o=(e.isPlaying,e.toggleNote);return i.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"10px",padding:"5px",border:"1px solid rgba(255, 255, 255, 0.75)",borderRadius:"4px"}},i.a.createElement("div",{style:{minWidth:"96px"}},t),n.map((function(e,n){return i.a.createElement(c,{key:n,isActive:e,isPlaying:(n+1)%16===a,onClick:function(){return o(t,n)}})})))},l=function(e){var t=e.pattern,n=e.lastNotePlayed,a=e.isPlaying,o=e.toggleNote;return i.a.createElement("div",{className:"uk-margin-small uk-background-secondary uk-light uk-padding"},Object.keys(t).map((function(e){return i.a.createElement(u,{key:e,trackName:e,trackNotes:t[e],lastNotePlayed:n,isPlaying:a,toggleNote:o})})))},h=function(e){var t=e.isPlaying,n=e.onClick;return i.a.createElement("div",{className:"play-button-component"},i.a.createElement("button",{type:"button",className:"uk-button uk-button-primary",onClick:n,onKeyDown:function(e){" "===e.key&&e.preventDefault()}},t?"Stop":"Play"))},m=function(e){var t=e.value,n=e.onChange;return i.a.createElement("div",{className:"tempo-control-component"},i.a.createElement("div",{className:"uk-form-controls"},i.a.createElement("input",{id:"tempo",className:"uk-input",type:"number",placeholder:"Tempo","aria-label":"Tempo",min:20,max:300,step:1,value:t,onChange:function(e){var t=parseFloat(e.target.value);n(t)}})))},d=n(13),g=n(14),p=n(15),f=n.n(p),k=function(){function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{onTempoChange:function(){},onIsPlayingChange:function(){},onNotePlayed:function(){},onPatternChange:function(){},onLoadingDone:function(){}};Object(d.a)(this,e),this.audioContext=new AudioContext,this.unlocked=!1,this.isPlaying=!1,this.startTime=null,this.current16thNote=null,this.tempo=80,this.lookahead=25,this.scheduleAheadTime=.1,this.nextNoteTime=0,this.noteLength=.05,this.timerID=null,this.pattern={kick:[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],snare:[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],tom_low:[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],tom_mid:[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],tom_high:[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],hihat_closed:[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],hihat_open:[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],crash:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]},this.onTempoChange=n.onTempoChange,this.onIsPlayingChange=n.onIsPlayingChange,this.onNotePlayed=n.onNotePlayed,this.onPatternChange=n.onPatternChange,this.onLoadingDone=n.onLoadingDone,this.loading=!0,this.audioData={};for(var a=["kick","snare","tom_low","tom_mid","tom_high","hihat_closed","hihat_open","crash"],i=[],o=function(){var e=s[r];i.push(f.a.get("/drum-machine"+"/clips/".concat(e,".wav"),{responseType:"arraybuffer"}).then((function(e){return t.audioContext.decodeAudioData(e.data)})).then((function(n){t.audioData[e]=n})))},r=0,s=a;r<s.length;r++)o();Promise.all(i).then((function(){t.loading=!1,t.onLoadingDone()}))}return Object(g.a)(e,[{key:"nextNote",value:function(){var e=60/this.tempo;this.nextNoteTime+=.25*e,this.current16thNote++,16===this.current16thNote&&(this.current16thNote=0),this.onNotePlayed(this.current16thNote)}},{key:"scheduleNote",value:function(e,t){for(var n in this.pattern)if(this.pattern[n][e]){var a=this.audioContext.createBufferSource();a.buffer=this.audioData[n],a.connect(this.audioContext.destination),a.start(t)}}},{key:"scheduler",value:function(){for(;this.nextNoteTime<this.audioContext.currentTime+this.scheduleAheadTime;)this.scheduleNote(this.current16thNote,this.nextNoteTime),this.nextNote()}},{key:"setTempo",value:function(e){this.tempo=e,this.onTempoChange(this.tempo)}},{key:"setPattern",value:function(e){this.pattern=e,this.onPatternChange(this.pattern)}},{key:"startStop",value:function(){var e=this;this.unlocked||(this.unlocked=!0,this.audioContext.resume()),this.isPlaying=!this.isPlaying,console.log(this.isPlaying),this.isPlaying?(this.current16thNote=0,this.nextNoteTime=this.audioContext.currentTime+.1,this.timerID=setInterval((function(){return e.scheduler()}),this.lookahead)):(clearInterval(this.timerID),this.timerID=null),this.onIsPlayingChange(this.isPlaying)}}]),e}(),y=function(){var e=Object(a.useRef)(null),t=Object(a.useState)(80),n=Object(s.a)(t,2),o=n[0],r=n[1],c=Object(a.useState)(!1),u=Object(s.a)(c,2),d=u[0],g=u[1],p=Object(a.useState)(null),f=Object(s.a)(p,2),y=f[0],v=f[1],N=Object(a.useState)({}),P=Object(s.a)(N,2),b=P[0],C=P[1],x=Object(a.useState)(!0),E=Object(s.a)(x,2),T=E[0],j=E[1];Object(a.useEffect)((function(){e.current=new k({onTempoChange:function(e){r(e)},onIsPlayingChange:function(e){g(e)},onNotePlayed:function(e){v(e)},onPatternChange:function(e){C(e)},onLoadingDone:function(){j(!1)}}),r(e.current.tempo),g(e.current.isPlaying),v(e.current.current16thNote),C(e.current.pattern)}),[]),Object(a.useEffect)((function(){var e=function(e){" "===e.key&&O()};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}),[]);var O=function(){e.current.startStop()};return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"uk-flex uk-background-muted uk-margin-small uk-flex-middle"},i.a.createElement("div",{className:"uk-padding-small"},"Drum Machine App"),i.a.createElement("div",{className:"uk-flex-1"}),i.a.createElement("div",{className:"uk-padding-small"},i.a.createElement(m,{value:o,onChange:function(t){return e.current.setTempo(t)}})),i.a.createElement("div",{className:"uk-padding-small"},i.a.createElement(h,{isPlaying:d,onClick:O}))),T?i.a.createElement("div",{className:"uk-margin uk-text-center"},i.a.createElement("div",{"uk-spinner":"true"})):i.a.createElement(l,{pattern:b,lastNotePlayed:y,isPlaying:d,toggleNote:function(t,n){var a=Object.assign({},b);a[t][n]=!a[t][n],e.current.setPattern(a)}}))},v=function(){return i.a.createElement("div",{className:"uk-container uk-container-small"},i.a.createElement("div",{className:"uk-margin-auto"},i.a.createElement(y,null)))};n(38),n(39);r.a.render(i.a.createElement(v,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.7fdbde21.chunk.js.map