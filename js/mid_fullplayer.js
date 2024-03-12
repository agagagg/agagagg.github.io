var audio=document.createElement('audio');var playerContext=false;var screenW=1920;var screenH=1080;var spectrumData=[];audio.setAttribute('src','');audio.volume=(grVol);audio.crossOrigin='anonymous';function playerContextSet(){if(getCookie("grVis")!=="false"){var context=new(window.AudioContext||window.webkitAudioContext)();context.crossOrigin='anonymous';var ctx=$("#eq_canvas").get()[0].getContext("2d");var source=context.createMediaElementSource(audio);var javascriptNode=context.createScriptProcessor(256,1,1);javascriptNode.connect(context.destination);var analyser=context.createAnalyser();source.connect(analyser);analyser.connect(context.destination);analyser.smoothingTimeConstant=0.9;analyser.fftSize=2048;var sourceNode=context.createBufferSource();sourceNode.connect(analyser);analyser.connect(javascriptNode);var gradient=ctx.createLinearGradient(0,0,0,1080);gradient.addColorStop(0,'#00ffee');gradient.addColorStop(0.25,'#aa00ff');gradient.addColorStop(0.5,'#ff00dd');gradient.addColorStop(0.75,'#aa00ff');gradient.addColorStop(1,'#00ffee');javascriptNode.onaudioprocess=function(){spectrumData=new Uint8Array(analyser.frequencyBinCount);analyser.getByteFrequencyData(spectrumData);}
window.requestAnimationFrame(drawSpectrum);function drawSpectrum(){if(getCookie("grVis")!=="false"){var array=spectrumData;ctx.clearRect(0,0,2560,1440);ctx.fillStyle=gradient;for(var i=0;i<(array.length);i++){var value=(array[i]*3);ctx.fillRect(i*4,((1080-value)/2),2,value);}
window.requestAnimationFrame(drawSpectrum);}}
playerContext=true;}}
function toggleStream(src){if(audio.currentTime>0&&!audio.ended){stopStream(false,src);}else{playStream(src);}}
function playStream(src){if(playerContext==false){playerContextSet();}
if(audio.currentTime==0){audio.setAttribute('src',src);audio.play();}
else{stopStream(true,src);}}
function stopStream(restart,src){audio.pause();audio.setAttribute('src','');audio.load();audio.currentTime=0;if(restart){playStream(src);}}
function adjustVolume(vol){audio.volume=vol;setCookie("grvolume",vol,90);}
function toggleVis(){if(getCookie("grVis")!=="false"){setCookie("grVis","false",90);}else{setCookie("grVis","true",90);}
location.reload();}