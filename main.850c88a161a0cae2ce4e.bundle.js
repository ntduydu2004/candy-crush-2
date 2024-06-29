(()=>{"use strict";var e,t={612:(e,t,i)=>{i(440);class s extends Phaser.Scene{constructor(){super({key:"BootScene"})}preload(){this.cameras.main.setBackgroundColor(10016391),this.createLoadingbar(),this.load.on("progress",(e=>{this.progressBar.clear(),this.progressBar.fillStyle(16774867,1),this.progressBar.fillRect(this.cameras.main.width/4,this.cameras.main.height/2-16,this.cameras.main.width/2*e,16)}),this),this.load.on("complete",(()=>{this.progressBar.destroy(),this.loadingBar.destroy()}),this),this.load.pack("preload","./assets/pack.json","preload")}update(){this.scene.start("GameScene")}createLoadingbar(){this.loadingBar=this.add.graphics(),this.loadingBar.fillStyle(6139463,1),this.loadingBar.fillRect(this.cameras.main.width/4-2,this.cameras.main.height/2-18,this.cameras.main.width/2+4,20),this.progressBar=this.add.graphics()}}let a={score:0,highscore:0,gridWidth:8,gridHeight:8,tileWidth:64,tileHeight:72,candyTypes:["cracker","gato","donut","candy"],around:[{x:1,y:1},{x:0,y:1},{x:1,y:0},{x:-1,y:-1},{x:-1,y:0},{x:-1,y:1},{x:0,y:-1},{x:1,y:-1}],direction:[{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}]};class h{constructor(){}static getInstance(){return h.instance||(h.instance=new h),h.instance}init(e){this.scene=e,this.backgroundMusic=e.sound.add("background_music"),this.explosionSound=e.sound.add("explosion_sound"),this.yaySound=e.sound.add("yay_sound"),this.confettiSound=e.sound.add("confetti_sound"),this.swooshSound=e.sound.add("swoosh_sound"),this.discoverySound=e.sound.add("discovery_sound"),this.landingSound=e.sound.add("landing_sound")}playLandingSound(){this.landingSound.isPlaying||this.landingSound.play("",{loop:!1,volume:.5,rate:3.5})}playSwooshSound(){this.swooshSound.isPlaying||this.swooshSound.play("",{loop:!1,volume:.5})}playConfettiSound(){this.confettiSound.play("",{loop:!1,volume:.5})}playDiscoverySound(){this.discoverySound.play("",{loop:!1,volume:.5})}playExplosionSound(){this.explosionSound.play("",{loop:!1,volume:.5,seek:0})}playYaySound(){this.yaySound.play("",{loop:!1,volume:.4,seek:1})}playBackgroundMusic(){this.backgroundMusic.play("",{loop:!0,volume:.1})}}class n{constructor(e,t){this.storage=[],this.returnObjectCallback=e,this.createObjectCallback=t}getObject(){let e=null;return e=this.storage.length>0?this.storage.pop():this.createObjectCallback(),e}returnObject(e){this.returnObjectCallback(e),this.storage.push(e)}}class l extends Phaser.GameObjects.Sprite{constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.tileNum=1,this.setOrigin(.5,.5),this.setInteractive(),this.setDepth(1),this.setScale(.4),this.scene.add.existing(this),this.greenFlame=this.scene.add.particles(0,0,"white",{color:[16119085,38916,38916,38916],colorEase:"quad.out",lifespan:600,angle:{min:-100,max:-80},scale:{start:1,end:0,ease:"sine.out"},speed:100,blendMode:"SCREEN"}).startFollow(this).stop().setDepth(0),this.blueFlame=this.scene.add.particles(0,0,"white",{color:[8481494,2442495],colorEase:"quad.out",lifespan:600,angle:{min:-100,max:-80},scale:{start:1,end:0,ease:"sine.out"},speed:100,blendMode:"SCREEN"}).startFollow(this).stop().setDepth(0),this.redFlame=this.scene.add.particles(0,0,"white",{color:[16667904,16649984],colorEase:"quad.out",lifespan:600,angle:{min:-100,max:-80},scale:{start:1,end:0,ease:"sine.out"},speed:100,blendMode:"SCREEN"}).startFollow(this).stop().setDepth(0),this.specialFlame=this.scene.add.particles(0,0,"white",{color:[9887962,4934223,3486776,263172],colorEase:"quad.out",lifespan:600,angle:{min:-100,max:-80},scale:{start:1,end:0,ease:"sine.out"},speed:{min:50,max:150},blendMode:"SCREEN"}).startFollow(this).stop().setDepth(0)}stopFlame(){this.greenFlame.stop(),this.blueFlame.stop(),this.redFlame.stop(),this.specialFlame.stop()}setTileNumber(e){this.tileNum=e,this.stopFlame(),4==this.tileNum?this.greenFlame.start(20):5==this.tileNum?this.blueFlame.start(20):6==this.tileNum?this.redFlame.start(20):this.tileNum>6&&this.specialFlame.start()}addTileNumber(e){this.tileNum+=e,this.stopFlame(),4==this.tileNum?this.greenFlame.start(20):5==this.tileNum?this.blueFlame.start(20):6==this.tileNum?this.redFlame.start(20):this.tileNum>6&&this.specialFlame.start()}getTileNumber(){return this.tileNum}}var r;!function(e){e[e.NONE=0]="NONE",e[e.CIRCLE=1]="CIRCLE",e[e.SQUARE=2]="SQUARE",e[e.OCTAGON=3]="OCTAGON",e[e.TRIANGLE=4]="TRIANGLE",e[e.STAR=5]="STAR"}(r||(r={}));class o{constructor(){this.circle=new Phaser.Geom.Circle(250,300,200),this.square=new Phaser.Geom.Rectangle(50,100,400,400),this.triangle=new Phaser.Geom.Triangle(50,500,250,200,450,500),this.octagon=new Phaser.Curves.Path(150,100),this.octagon.lineTo(350,100),this.octagon.lineTo(450,200),this.octagon.lineTo(450,400),this.octagon.lineTo(350,500),this.octagon.lineTo(150,500),this.octagon.lineTo(50,400),this.octagon.lineTo(50,200),this.octagon.lineTo(150,100),this.star=new Phaser.Curves.Path(250,50);for(let e=0;e<5;e++){let t=Math.PI/2+2*Math.PI*e/5,i=250+200*Math.cos(t),s=250-200*Math.sin(t);this.star.lineTo(i,s),t+=Math.PI/5,i=250+95*Math.cos(t),s=250-95*Math.sin(t),this.star.lineTo(i,s)}this.star.closePath(),this.pathType=r.NONE,this.currentProgress=0}setPath(e){this.pathType=e}getPoints(e){switch(this.pathType){case r.CIRCLE:return this.circle.getPoints(e.length);case r.SQUARE:return this.square.getPoints(e.length);case r.TRIANGLE:return this.triangle.getPoints(e.length);case r.OCTAGON:{let t=1/e.length,i=[];for(let s=0;s<e.length;s++){let e=this.octagon.getPoint(t*s);i.push(new Phaser.Geom.Point(e.x,e.y))}return i}case r.STAR:{let t=1/e.length,i=[];for(let s=0;s<e.length;s++){let e=this.star.getPoint(t*s);i.push(new Phaser.Geom.Point(e.x,e.y))}return i}}return[]}update(e,t,i){if(this.pathType==r.NONE)return;this.currentProgress+=4e-4*i,this.currentProgress>=1&&(this.currentProgress-=1);let s=this.currentProgress,a=1/e.length;for(let t=0;t<e.length;t++){let i=s+t*a;switch(i>=1&&(i-=1),this.pathType){case r.CIRCLE:{const s=this.circle.getPoint(i);e[t].setPosition(s.x,s.y);break}case r.SQUARE:{const s=this.square.getPoint(i);e[t].setPosition(s.x,s.y);break}case r.OCTAGON:{const s=this.octagon.getPoint(i);e[t].setPosition(s.x,s.y);break}case r.TRIANGLE:{const s=this.triangle.getPoint(i);e[t].setPosition(s.x,s.y);break}case r.STAR:{const s=this.star.getPoint(i);e[t].setPosition(s.x,s.y);break}}}}}class c{constructor(e,t,i,s){this.soundManager=h.getInstance(),this.activeTweens=0,this.scene=e,this.row=t,this.column=i,this.explosions=[],this.idleTileTween=[];for(let e=0;e<t;e++){this.explosions[e]=[];for(let t=0;t<i;t++)this.explosions[e][t]=this.scene.add.particles(0,0,"white_flare",{color:[16777141,16768966,16299697,16288160],colorEase:"sine.out",speed:100,lifespan:500,quantity:10,scale:{start:.2,end:0},emitting:!1,emitZone:{type:"edge",source:new Phaser.Geom.Circle(s[e][t].x,s[e][t].y,20),quantity:10},duration:200})}this.cross=[],this.verticalCross=[];for(let e=0;e<t;e++){this.cross[e]=[],this.verticalCross[e]=[];for(let t=0;t<i;t++)this.cross[e][t]=this.scene.add.sprite(t*a.tileWidth+a.tileWidth/2,e*a.tileHeight+a.tileHeight/2,"cross").setAlpha(0).setDepth(3),this.cross[e][t].displayHeight=a.tileHeight,this.verticalCross[e][t]=this.scene.add.sprite(t*a.tileWidth+a.tileWidth/2,e*a.tileHeight+a.tileHeight/2,"cross_vertical").setAlpha(0).setDepth(3),this.verticalCross[e][t].displayWidth=a.tileWidth}this.firstTileHint=this.scene.add.rectangle(0,0,a.tileWidth,a.tileHeight,16119085).setAlpha(0).setOrigin(.5).setDepth(-1),this.secondTileHint=this.scene.add.rectangle(0,0,a.tileWidth,a.tileHeight,16119085).setAlpha(0).setOrigin(.5).setDepth(-1),this.tileHintsTween=this.scene.add.tween({targets:[this.firstTileHint,this.secondTileHint],alpha:1,angle:360,scale:.7,yoyo:!0,repeat:-1,duration:1e3,ease:"back.out"}).pause(),this.leftConfetti=this.scene.add.particles(-50,600,"confetti",{frame:["1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],alpha:{min:75,max:100},lifespan:4e3,rotate:{onEmit:()=>Phaser.Math.RND.between(0,180),onUpdate:(e,t,i,s)=>s+3*i},angle:{min:-70,max:-35},speed:{onEmit:e=>{let t=2*-e.angle-600;return Phaser.Math.RND.between(t-500,t+200)}},scale:{start:.2,end:0},accelerationX:{onEmit:()=>-800,onUpdate:(e,t,i,s)=>e.velocityX>=100?-800:0},accelerationY:{onEmit:()=>800,onUpdate:(e,t,i,s)=>e.velocityY<=-100?800:0},quantity:1,gravityY:400,duration:2e3}).setDepth(5).stop(),this.rightConfetti=this.scene.add.particles(570,600,"confetti",{frame:["1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],alpha:{min:75,max:100},lifespan:4e3,rotate:{onEmit:()=>Phaser.Math.RND.between(0,180),onUpdate:(e,t,i,s)=>s+3*i},angle:{min:-145,max:-110},speed:{onEmit:e=>{let t=2*e.angle+800;return Phaser.Math.RND.between(t-200,t+500)}},scale:{start:.2,end:0},accelerationX:{onEmit:()=>800,onUpdate:(e,t,i,s)=>e.velocityX<=100?800:0},accelerationY:{onEmit:()=>800,onUpdate:(e,t,i,s)=>e.velocityY<=-100?800:0},quantity:1,gravityY:400,duration:2e3}).stop().setDepth(5),this.path=new o}setPath(e){this.path.setPath(e)}setPositionsOnPath(e){let t=this.path.getPoints(e);for(let i=0;i<e.length;i++)e[i].setDepth(1+.001*i),this.activeTweens++,this.scene.add.tween({targets:e[i],x:t[i].x,y:t[i].y,ease:"quad.out",duration:500,onComplete:()=>{this.activeTweens--}})}update(e,t,i){0==this.activeTweens&&this.path.update(e,t,i)}startSelectionTween(e){this.selectionTween&&!this.selectionTween.isDestroyed()&&this.selectionTween.destroy(),this.selectionTween=this.scene.add.tween({targets:e,duration:2e3,repeat:-1,angle:360,ease:"sine.out"})}removeSelectionTween(e){this.selectionTween.isPlaying()&&this.selectionTween.destroy(),this.scene.add.tween({targets:e,duration:100,ease:"linear",yoyo:!1,angle:0})}startConfettiEffect(){this.leftConfetti.start(),this.rightConfetti.start(),this.soundManager.playConfettiSound(),this.soundManager.playYaySound()}startCrossLineEffect(e,t){this.cross[t][e].setAlpha(1).scaleX=1,this.verticalCross[t][e].setAlpha(1).scaleY=1,this.scene.add.tween({targets:this.cross[t][e],scaleX:2.5,alpha:0,duration:500}),this.scene.add.tween({targets:this.verticalCross[t][e],scaleY:2.5,alpha:0,duration:500})}explode(e,t){this.explosions[t][e].start(),this.soundManager.playExplosionSound()}shake(){this.scene.cameras.main.shake(200,.03)}renderHint(e,t,i,s){this.firstTileHint.setPosition(e,t),this.secondTileHint.setPosition(i,s),this.tileHintsTween.restart()}removeHint(){this.tileHintsTween.isPlaying()&&this.tileHintsTween.pause(),this.firstTileHint.setAlpha(0),this.secondTileHint.setAlpha(0)}startIdleTileTween(e){this.idleTileTween=[];for(let t=0;t<this.row;t++){this.idleTileTween[t]=[];for(let i=0;i<this.column;i++)this.idleTileTween[t].push(this.scene.add.tween({targets:e[t][i],delay:50*(i+t),duration:300,scale:.2,repeat:-1,repeatDelay:5e3,yoyo:!0}))}}removeIdleTileTween(e){if(0!==this.idleTileTween.length)for(let t=0;t<this.row;t++)for(let i=0;i<this.column;i++)this.idleTileTween[t][i].isDestroyed()||(this.idleTileTween[t][i].destroy(),this.scene.add.tween({targets:e[t][i],scale:.4,duration:100,yoyo:!1,ease:"linear"}))}}class d extends Phaser.GameObjects.Container{constructor(e){super(e,260,650),this.scene.add.existing(this),this.barRect=this.scene.add.rectangle(0,0,500,30).setStrokeStyle(1,16777215),this.progressRect=this.scene.add.rectangle(0,0,496,26,6536190),this.progressRect.width=248,this.particles=this.scene.add.particles(0,0,"white_flare",{lifespan:500,quantity:20,y:{min:-12,max:12},angle:{min:165,max:195},speed:{min:50,max:100},scale:{start:.1,end:0}}),this.add(this.barRect),this.add(this.progressRect),this.add(this.particles)}setProgress(e){this.scene.add.tween({targets:this.progressRect,width:496*e,ease:"linear",duration:500}),this.scene.add.tween({targets:this.particles,x:this.progressRect.x-248+496*e,ease:"linear",duration:500})}}class g{constructor(e){this.scene=e,this.progressBar=new d(this.scene),this.scoreMax=5e3,this.reset()}reset(){this.score=0,this.scoreMax+=100,this.progressBar.setProgress(0)}addScore(e){this.score+=50*e,this.score=Math.min(this.score,this.scoreMax),this.progressBar.setProgress(this.score/this.scoreMax)}reachedMaxScore(){return this.score==this.scoreMax}}class f{constructor(e,t,i){this.tileDown=e=>{let t=Math.floor(e.y/a.tileHeight),i=Math.floor(e.x/a.tileWidth);if(this.canMove)if(this.firstSelectedTile){if(this.effectManager.removeSelectionTween(this.firstSelectedTile),this.firstSelectedTile===this.tileGrid[t][i])return void(this.firstSelectedTile=void 0);this.secondSelectedTile=this.tileGrid[t][i],Math.abs(this.firstSelectedTile.x-this.secondSelectedTile.x)/a.tileWidth+Math.abs(this.firstSelectedTile.y-this.secondSelectedTile.y)/a.tileHeight==1?(this.checkNum=0,this.canMove=!1,this.scene.time.removeAllEvents(),this.effectManager.removeHint(),this.effectManager.removeIdleTileTween(this.tileGrid),this.swapTiles()):(this.firstSelectedTile=this.tileGrid[t][i],this.secondSelectedTile=void 0,this.effectManager.startSelectionTween(this.firstSelectedTile))}else this.firstSelectedTile=this.tileGrid[t][i],this.effectManager.startSelectionTween(this.firstSelectedTile)},this.checkNum=0,this.scene=e,this.row=t,this.column=i,this.canMove=!0,this.isShaking=!1,this.isZooming=!1,this.scoreManager=new g(e),this.objectManager=new n((e=>{e.x=-100,e.y=-100,e.setTexture(""),e.setTileNumber(1),e.stopFlame()}),(()=>new l({scene:this.scene,x:-100,y:-100,texture:""}))),this.tilesArr=[],this.tileGrid=[],this.visited=new Array(this.row).fill(null).map((()=>new Array(this.column).fill(!1)));for(let e=0;e<t;e++){this.tileGrid[e]=[];for(let t=0;t<i;t++)this.tileGrid[e][t]=this.createTile(t,e)}this.effectManager=new c(e,t,i,this.tileGrid),this.firstSelectedTile=void 0,this.secondSelectedTile=void 0,this.scene.input.on("gameobjectdown",this.tileDown),this.checkMatches()}update(e,t){this.effectManager.update(this.tilesArr,e,t)}celebrate(){this.scene.time.removeAllEvents(),this.effectManager.removeHint(),this.effectManager.removeIdleTileTween(this.tileGrid),this.getShuffledTileArray(),this.effectManager.setPath(Phaser.Math.RND.between(1,5)),this.effectManager.setPositionsOnPath(this.tilesArr),this.effectManager.startConfettiEffect(),this.scene.time.delayedCall(5e3,(()=>{this.effectManager.setPath(r.NONE),this.returnToInitialPosition()}))}returnToInitialPosition(){this.scoreManager.reset();for(let e=0;e<this.row;e++)for(let t=0;t<this.column;t++)this.scene.add.tween({targets:this.tileGrid[e][t],x:t*a.tileWidth+a.tileWidth/2,y:e*a.tileHeight+a.tileHeight/2,ease:"expo.inout",delay:5*(e*this.column+t),duration:500});this.checkMatches()}releaseTile(e){this.objectManager.returnObject(e)}checkValid(e,t){return 0<=e&&e<this.column&&0<=t&&t<this.row&&void 0!==this.tileGrid[t][e]&&!this.visited[t][e]}createTile(e,t){let i=a.candyTypes[Phaser.Math.RND.between(0,a.candyTypes.length-1)],s=this.objectManager.getObject();return s.setPosition(e*a.tileWidth+a.tileWidth/2,t*a.tileHeight+a.tileHeight/2),s.setTexture(i),s}renderHint(){const e=this.getHints();let t=this.tileGrid[e.firstY][e.firstX].x,i=this.tileGrid[e.firstY][e.firstX].y,s=this.tileGrid[e.secondY][e.secondX].x,a=this.tileGrid[e.secondY][e.secondX].y;this.effectManager.renderHint(t,i,s,a)}getHints(){let e=[];for(let t=0;t<this.row;t++)for(let i=0;i<this.column;i++){let s=this.tileGrid[t][i].texture.key;this.visited[t][i]=!0,this.checkExistMatch(i+1,t,s)&&e.push({firstX:i,firstY:t,secondX:i+1,secondY:t}),this.checkExistMatch(i-1,t,s)&&e.push({firstX:i,firstY:t,secondX:i-1,secondY:t}),this.checkExistMatch(i,t+1,s)&&e.push({firstX:i,firstY:t,secondX:i,secondY:t+1}),this.checkExistMatch(i,t-1,s)&&e.push({firstX:i,firstY:t,secondX:i,secondY:t-1}),this.visited[t][i]=!1}return 0==e.length?{firstX:-1,firstY:-1,secondX:-1,secondY:-1}:e[Phaser.Math.RND.between(0,e.length-1)]}getShuffledTileArray(){this.tilesArr=[];for(let e=0;e<this.row;e++)for(let t=0;t<this.column;t++)this.tilesArr.push(this.tileGrid[e][t]);this.tilesArr.sort((()=>Math.random()-.5))}checkExistMatch(e,t,i){if(!this.checkValid(e,t))return!1;let s=1;for(let a=e-1;a>=0&&this.checkValid(a,t)&&this.tileGrid[t][a].texture.key===i;a--)s++;for(let a=e+1;a<this.column&&this.checkValid(a,t)&&this.tileGrid[t][a].texture.key===i;a++)s++;if(s>=3)return!0;s=1;for(let a=t-1;a>=0&&this.checkValid(e,a)&&this.tileGrid[a][e].texture.key===i;a--)s++;for(let a=t+1;a<this.row&&this.checkValid(e,a)&&this.tileGrid[a][e].texture.key===i;a++)s++;return s>=3}swapTiles(){if(this.firstSelectedTile&&this.secondSelectedTile){let e={x:this.firstSelectedTile.x,y:this.firstSelectedTile.y},t={x:this.secondSelectedTile.x,y:this.secondSelectedTile.y};this.tileGrid[(e.y-a.tileHeight/2)/a.tileHeight][(e.x-a.tileWidth/2)/a.tileWidth]=this.secondSelectedTile,this.tileGrid[(t.y-a.tileHeight/2)/a.tileHeight][(t.x-a.tileWidth/2)/a.tileWidth]=this.firstSelectedTile,this.scene.add.tween({targets:this.firstSelectedTile,x:this.secondSelectedTile.x,y:this.secondSelectedTile.y,ease:"expo.inout",duration:400,repeat:0,yoyo:!1,onStart:()=>{h.getInstance().playSwooshSound()}}),this.scene.add.tween({targets:this.secondSelectedTile,x:this.firstSelectedTile.x,y:this.firstSelectedTile.y,ease:"expo.inout",duration:400,repeat:0,yoyo:!1,onComplete:()=>{this.checkMatches()}}),this.firstSelectedTile=this.tileGrid[(e.y-a.tileHeight/2)/a.tileHeight][(e.x-a.tileWidth/2)/a.tileWidth],this.secondSelectedTile=this.tileGrid[(t.y-a.tileHeight/2)/a.tileHeight][(t.x-a.tileWidth/2)/a.tileWidth]}}fillTiles(){let e=0;for(let t=0;t<this.column;t++){let i=0;for(let e=this.row-1;e>=0;e--){if(void 0===this.tileGrid[e][t]){i++;continue}let s=this.tileGrid[e][t];this.tileGrid[e][t]=void 0,this.tileGrid[e+i][t]=s,this.effectManager.activeTweens++,this.scene.add.tween({targets:s,y:(e+i)*a.tileHeight+a.tileHeight/2,ease:"bounce",duration:400,delay:100,onStart:()=>{h.getInstance().playLandingSound()},onComplete:()=>{this.effectManager.activeTweens--,0==this.effectManager.activeTweens&&this.checkMatches()}})}for(let e=-1;e>=-i;e--){let s=this.createTile(t,e);this.tileGrid[e+i][t]=s,this.effectManager.activeTweens++,this.scene.add.tween({targets:s,y:(e+i)*a.tileHeight+a.tileHeight/2,ease:"bounce",duration:400,repeat:0,delay:100,yoyo:!1,onStart:()=>{h.getInstance().playLandingSound()},onComplete:()=>{this.effectManager.activeTweens--,0==this.effectManager.activeTweens&&this.checkMatches()}})}e+=i}this.tileUp()}tileUp(){this.firstSelectedTile=void 0,this.secondSelectedTile=void 0}handleExplosionChain(e,t,i){const s=50;let h=this.tileGrid[t][e].getTileNumber(),n=this.tileGrid[t][e].texture.key;if(this.scoreManager.addScore(h),this.tileGrid[t][e]=void 0,1!=h)if(this.isShaking=!0,4==h)for(let h=0;h<8;h++){let n=t+a.around[h].y,l=e+a.around[h].x;if(!this.checkValid(l,n))continue;let r=this.tileGrid[n][l];this.effectManager.activeTweens++,this.scene.add.tween({targets:r,duration:i+s,x:r.x,onComplete:()=>{this.effectManager.explode(l,n),5==r.getTileNumber()&&this.effectManager.startCrossLineEffect(l,n),this.effectManager.activeTweens--,this.releaseTile(r),0==this.effectManager.activeTweens&&(this.isShaking&&(this.effectManager.shake(),this.isShaking=!1),this.fillTiles())}}),this.visited[n][l]=!0,this.handleExplosionChain(l,n,i+s)}else if(5==h){for(let a=0;a<this.row;a++){if(!this.checkValid(e,a))continue;let h=this.tileGrid[a][e];this.effectManager.activeTweens++,this.scene.add.tween({targets:h,duration:i+Math.abs(t-a)*s,x:h.x,onComplete:()=>{this.effectManager.explode(e,a),5==h.getTileNumber()&&this.effectManager.startCrossLineEffect(e,a),this.effectManager.activeTweens--,this.releaseTile(h),0==this.effectManager.activeTweens&&(this.isShaking&&(this.effectManager.shake(),this.isShaking=!1),this.fillTiles())}}),this.visited[a][e]=!0,this.handleExplosionChain(e,a,i+Math.abs(t-a)*s)}for(let a=0;a<this.column;a++){if(!this.checkValid(a,t))continue;let n=this.tileGrid[t][a];this.effectManager.activeTweens++,this.scene.add.tween({targets:h,duration:i+Math.abs(e-a)*s,x:n.x,onComplete:()=>{this.effectManager.explode(a,t),this.effectManager.activeTweens--,this.releaseTile(n),0==this.effectManager.activeTweens&&(this.isShaking&&(this.effectManager.shake(),this.isShaking=!1),this.fillTiles())}}),this.visited[t][a]=!0,this.handleExplosionChain(a,t,i+Math.abs(e-a)*s)}}else if(6==h){for(let a=0;a<this.row;a++)for(let h=0;h<this.column;h++)if(this.checkValid(h,a)&&n===this.tileGrid[a][h].texture.key){let n=this.tileGrid[a][h];this.tileGrid[a][h]=void 0,this.effectManager.activeTweens++,this.scene.add.tween({targets:n,x:n.x,duration:i+(Math.abs(t-a)+Math.abs(e-h))*s,onComplete:()=>{this.effectManager.explode(h,a),this.effectManager.activeTweens--,this.scoreManager.addScore(n.getTileNumber()),this.releaseTile(n),0==this.effectManager.activeTweens&&(this.isShaking&&(this.effectManager.shake(),this.isShaking=!1),this.fillTiles())}}),this.visited[a][h]=!0}}else if(h>6){let h=0,n=1,l=1,r=e,o=t,c=new Map;for(c.set(`${e},${t}`,!0);n<this.row*this.column;){let e=(h+1)%4,t=r+a.direction[e].x,d=o+a.direction[e].y;if(c.has(`${t},${d}`)?(t=r+a.direction[h].x,d=o+a.direction[h].y):h=e,0<=t&&t<this.column&&0<=d&&d<this.row&&(n++,this.checkValid(t,d))){let e=this.tileGrid[d][t];this.tileGrid[d][t]=void 0,this.effectManager.activeTweens++,this.scene.add.tween({targets:e,x:e.x,duration:i+l*s/3,onComplete:()=>{this.effectManager.explode(t,d),this.effectManager.activeTweens--,this.scoreManager.addScore(e.getTileNumber()),this.releaseTile(e),0==this.effectManager.activeTweens&&(this.isShaking&&(this.effectManager.shake(),this.isShaking=!1),this.fillTiles())}}),this.visited[d][t]=!0,l++}r=t,o=d,c.set(`${t},${d}`,!0)}}}checkMatches(){if(this.checkNum++,this.firstSelectedTile&&"special"===this.firstSelectedTile.texture.key){let e=this.firstSelectedTile;this.effectManager.activeTweens++;let t=(this.firstSelectedTile.x-a.tileWidth/2)/a.tileWidth,i=(this.firstSelectedTile.y-a.tileHeight/2)/a.tileHeight;return this.scene.add.tween({targets:e,onComplete:()=>{this.effectManager.explode(t,i),this.releaseTile(e),this.effectManager.activeTweens--,0==this.effectManager.activeTweens&&(this.isShaking&&(this.effectManager.shake(),this.isShaking=!1),this.fillTiles())}}),this.visited[i][t]=!0,void this.handleExplosionChain(t,i,0)}if(this.secondSelectedTile&&"special"===this.secondSelectedTile.texture.key){let e=this.secondSelectedTile;this.effectManager.activeTweens++;let t=(this.secondSelectedTile.x-a.tileWidth/2)/a.tileWidth,i=(this.secondSelectedTile.y-a.tileHeight/2)/a.tileHeight;return this.scene.add.tween({targets:e,onComplete:()=>{this.effectManager.explode(t,i),this.releaseTile(e),this.effectManager.activeTweens--,0==this.effectManager.activeTweens&&(this.isShaking&&(this.effectManager.shake(),this.isShaking=!1),this.fillTiles())}}),this.visited[i][t]=!0,void this.handleExplosionChain(t,i,0)}for(let e=0;e<this.row;e++)for(let t=0;t<this.column;t++)this.visited[e][t]=!1;for(let e=0;e<this.row;e++)for(let t=0;t<this.column;t++){if(!this.checkValid(t,e))continue;let i=0,s=0,n=[],l=t-1;for(;this.checkValid(l,e)&&this.tileGrid[e][l].texture.key===this.tileGrid[e][t].texture.key;)i++,n.push(this.tileGrid[e][l]),l--;for(l=t+1;this.checkValid(l,e)&&this.tileGrid[e][l].texture.key===this.tileGrid[e][t].texture.key;)i++,n.push(this.tileGrid[e][l]),l++;if(i<2)continue;for(l=e-1;this.checkValid(t,l)&&this.tileGrid[l][t].texture.key===this.tileGrid[e][t].texture.key;)s++,n.push(this.tileGrid[l][t]),l--;for(l=e+1;this.checkValid(t,l)&&this.tileGrid[l][t].texture.key===this.tileGrid[e][t].texture.key;)s++,n.push(this.tileGrid[l][t]),l++;if(s<2)continue;let r=0;for(let e=0;e<n.length;e++)r+=n[e].getTileNumber();this.tileGrid[e][t].addTileNumber(r);let o=0;for(let i=0;i<n.length;i++){let s=n[i],l=(s.x-a.tileWidth/2)/a.tileWidth,r=(s.y-a.tileHeight/2)/a.tileHeight;this.effectManager.activeTweens++,o++,this.scene.add.tween({targets:s,duration:200,x:t*a.tileWidth+a.tileWidth/2,y:e*a.tileHeight+a.tileHeight/2,ease:"linear",onStart:()=>{h.getInstance().playSwooshSound()},onComplete:()=>{this.effectManager.activeTweens--,o--,this.releaseTile(s),0==o&&this.checkValid(t,e)&&this.tileGrid[e][t].getTileNumber()>6&&this.convertToSpecial(t,e),0==this.effectManager.activeTweens&&this.fillTiles()}}),this.tileGrid[r][l]=void 0,this.visited[r][l]=!0}}for(let e=0;e<this.row;e++)for(let t=0;t<this.column;t++){if(!this.checkValid(t,e))continue;let i=0,s=t;for(let a=t;a<this.column&&this.checkValid(a,e)&&this.tileGrid[e][t].texture.key===this.tileGrid[e][a].texture.key;a++)i++,this.tileGrid[e][a]!==this.firstSelectedTile&&this.tileGrid[e][a]!==this.secondSelectedTile||(s=a);if(3==i)for(let i=t;i<t+3;i++){if(!this.checkValid(i,e))continue;let t=this.tileGrid[e][i];this.effectManager.activeTweens++,this.scene.add.tween({targets:t,onComplete:()=>{this.effectManager.explode(i,e),5==t.getTileNumber()&&this.effectManager.startCrossLineEffect(i,e),this.effectManager.activeTweens--,this.releaseTile(t),0==this.effectManager.activeTweens&&(this.isShaking&&(this.effectManager.shake(),this.isShaking=!1),this.fillTiles())}}),this.visited[e][i]=!0,this.handleExplosionChain(i,e,0)}else if(i>3){let n=0;for(let a=t;a<t+i;a++)a!=s&&(n+=this.tileGrid[e][a].getTileNumber());this.tileGrid[e][s].addTileNumber(n);let l=0;for(let n=t;n<t+i;n++){if(n==s)continue;let t=this.tileGrid[e][n];this.tileGrid[e][n]=void 0,this.effectManager.activeTweens++,l++,this.scene.add.tween({targets:t,ease:"quad.out",duration:200,x:s*a.tileWidth+a.tileWidth/2,repeat:0,yoyo:!1,delay:100,onStart:()=>{h.getInstance().playSwooshSound()},onComplete:()=>{this.effectManager.activeTweens--,l--,this.releaseTile(t),0==l&&this.checkValid(s,e)&&this.tileGrid[e][s].getTileNumber()>6&&this.convertToSpecial(s,e),0==this.effectManager.activeTweens&&this.fillTiles()}})}}}for(let e=0;e<this.column;e++)for(let t=0;t<this.row;t++){if(!this.checkValid(e,t))continue;let i=0,s=t;for(let a=t;a<this.row&&this.checkValid(e,a)&&this.tileGrid[t][e].texture.key===this.tileGrid[a][e].texture.key;a++)i++,this.tileGrid[a][e]!==this.firstSelectedTile&&this.tileGrid[a][e]!==this.secondSelectedTile||(s=a);if(3==i)for(let i=t;i<t+3;i++){if(!this.checkValid(e,i))continue;let t=this.tileGrid[i][e];this.effectManager.activeTweens++,this.scene.add.tween({targets:t,onComplete:()=>{this.effectManager.explode(e,i),5==t.getTileNumber()&&this.effectManager.startCrossLineEffect(e,i),this.releaseTile(t),this.effectManager.activeTweens--,0==this.effectManager.activeTweens&&(this.isShaking&&(this.effectManager.shake(),this.isShaking=!1),this.fillTiles())}}),this.visited[i][e]=!0,this.handleExplosionChain(e,i,0)}else if(i>3){let n=0;for(let a=t;a<t+i;a++)a!=s&&(n+=this.tileGrid[a][e].getTileNumber());this.tileGrid[s][e].addTileNumber(n);let l=0;for(let n=t;n<t+i;n++){if(n==s)continue;let t=this.tileGrid[n][e];this.tileGrid[n][e]=void 0,this.effectManager.activeTweens++,l++,this.scene.add.tween({targets:t,ease:"quad.out",duration:200,y:s*a.tileHeight+a.tileHeight/2,repeat:0,yoyo:!1,delay:100,onStart:()=>{h.getInstance().playSwooshSound()},onComplete:()=>{this.effectManager.activeTweens--,l--,this.releaseTile(t),0==l&&this.checkValid(e,s)&&this.tileGrid[s][e].getTileNumber()>6&&this.convertToSpecial(e,s),0==this.effectManager.activeTweens&&this.fillTiles()}})}}}if(0==this.effectManager.activeTweens){if(!this.firstSelectedTile&&!this.secondSelectedTile){if(this.scoreManager.reachedMaxScore())return void this.celebrate();this.scene.time.delayedCall(5e3,(()=>{this.renderHint()})),this.scene.time.delayedCall(5e3,(()=>{this.effectManager.startIdleTileTween(this.tileGrid)}))}this.swapTiles(),this.tileUp(),this.checkNum>=2&&(this.canMove=!0)}}convertToSpecial(e,t){this.effectManager.activeTweens++;let i=this.tileGrid[t][e],s=i.depth;i.setDepth(10),this.isZooming?this.scene.tweens.chain({targets:i,tweens:[{angle:360,scale:0,duration:300},{texture:["special"],duration:0},{scale:.6,angle:30,duration:500,x:e*a.tileWidth+a.tileWidth/2+20,y:t*a.tileHeight+a.tileHeight/2-50},{delay:300,scale:.4,angle:0,duration:100,x:e*a.tileWidth+a.tileWidth/2,y:t*a.tileHeight+a.tileHeight/2,onComplete:()=>{i.setDepth(s),this.effectManager.activeTweens--,0==this.effectManager.activeTweens&&this.fillTiles()}}]}):(this.isZooming=!0,this.scene.tweens.chain({targets:i,tweens:[{targets:this.scene.cameras.main,y:250,height:200,ease:"expo.out",rotation:-.3,zoom:1.2,scrollX:e*a.tileWidth+a.tileWidth/2-240,scrollY:t*a.tileHeight+a.tileHeight/2-105},{angle:360,scale:0,duration:300},{texture:["special"],duration:0,onComplete:()=>{h.getInstance().playDiscoverySound()}},{scale:.6,angle:30,duration:500,x:e*a.tileWidth+a.tileWidth/2+20,y:t*a.tileHeight+a.tileHeight/2-50},{delay:300,scale:.4,angle:0,duration:100,x:e*a.tileWidth+a.tileWidth/2,y:t*a.tileHeight+a.tileHeight/2},{targets:this.scene.cameras.main,y:0,height:700,ease:"expo.out",rotation:0,zoom:1,scrollX:0,scrollY:0,onComplete:()=>{this.isZooming=!1,i.setDepth(s),this.effectManager.activeTweens--,0==this.effectManager.activeTweens&&this.fillTiles()}}]}))}}class u extends Phaser.Scene{constructor(){super({key:"GameScene"})}init(){this.soundManger=h.getInstance(),this.soundManger.init(this),this.background=this.add.sprite(-200,-200,"bg").setDepth(-2).setOrigin(0),this.backgroundAlpha=this.add.rectangle(-200,-200,1e3,1e3,0).setDepth(-1.5).setAlpha(.5).setOrigin(0),this.cameras.main.setBackgroundColor(2447710),this.playingZone=this.add.zone(0,0,a.gridWidth*a.tileWidth,a.gridHeight*a.tileHeight).setDepth(1).setInteractive(),this.tileGrid=new f(this,a.gridHeight,a.gridWidth)}create(){this.soundManger.playBackgroundMusic()}update(e,t){this.tileGrid.update(e,t)}}const p={title:"Candy crush",url:"https://github.com/digitsensitive/phaser3-typescript",version:"0.0.1",width:520,height:700,type:Phaser.AUTO,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},parent:"game",scene:[s,u],backgroundColor:"#000000",render:{pixelArt:!1,antialias:!0}};class T extends Phaser.Game{constructor(e){super(e)}}window.addEventListener("load",(()=>{new T(p)}))}},i={};function s(e){var a=i[e];if(void 0!==a)return a.exports;var h=i[e]={exports:{}};return t[e].call(h.exports,h,h.exports,s),h.exports}s.m=t,e=[],s.O=(t,i,a,h)=>{if(!i){var n=1/0;for(c=0;c<e.length;c++){for(var[i,a,h]=e[c],l=!0,r=0;r<i.length;r++)(!1&h||n>=h)&&Object.keys(s.O).every((e=>s.O[e](i[r])))?i.splice(r--,1):(l=!1,h<n&&(n=h));if(l){e.splice(c--,1);var o=a();void 0!==o&&(t=o)}}return t}h=h||0;for(var c=e.length;c>0&&e[c-1][2]>h;c--)e[c]=e[c-1];e[c]=[i,a,h]},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={792:0};s.O.j=t=>0===e[t];var t=(t,i)=>{var a,h,[n,l,r]=i,o=0;if(n.some((t=>0!==e[t]))){for(a in l)s.o(l,a)&&(s.m[a]=l[a]);if(r)var c=r(s)}for(t&&t(i);o<n.length;o++)h=n[o],s.o(e,h)&&e[h]&&e[h][0](),e[h]=0;return s.O(c)},i=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var a=s.O(void 0,[96],(()=>s(612)));a=s.O(a)})();