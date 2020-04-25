!function(e){function t(t){for(var i,o,a=t[0],u=t[1],h=t[2],l=0,d=[];l<a.length;l++)o=a[l],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&d.push(s[o][0]),s[o]=0;for(i in u)Object.prototype.hasOwnProperty.call(u,i)&&(e[i]=u[i]);for(c&&c(t);d.length;)d.shift()();return r.push.apply(r,h||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],i=!0,a=1;a<n.length;a++){var u=n[a];0!==s[u]&&(i=!1)}i&&(r.splice(t--,1),e=o(o.s=n[0]))}return e}var i={},s={0:0},r=[];function o(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var a=window.webpackJsonp=window.webpackJsonp||[],u=a.push.bind(a);a.push=t,a=a.slice();for(var h=0;h<a.length;h++)t(a[h]);var c=u;r.push([1481,1]),n()}({1481:function(e,t,n){"use strict";n.r(t);var i,s=n(4),r=n.n(s),o=n(8),a=n.n(o),u=n(27),h=n.n(u),c=n(28),l=n.n(c),d=n(29),v=n.n(d),f=n(44),g=n.n(f),p=n(557),m=n(105),y=n.n(m);!function(e){e.UP="UP",e.DOWN="DOWN",e.LEFT="LEFT",e.RIGHT="RIGHT"}(i||(i={}));var k=function(){function e(t,n,i){r()(this,e),this.dungeon=t,this.x=n,this.y=i}return a()(e,[{key:"move",value:function(e){switch(e){case i.UP:this.up();break;case i.DOWN:this.down();break;case i.LEFT:this.left();break;case i.RIGHT:this.right()}return this.exists()}},{key:"up",value:function(){return this.y-=1,this.exists()}},{key:"down",value:function(){return this.y+=1,this.exists()}},{key:"left",value:function(){return this.x-=1,this.exists()}},{key:"right",value:function(){return this.x+=1,this.exists()}},{key:"set",value:function(e,t){return this.x=e,this.y=t,this.exists()}},{key:"exists",value:function(){return this.dungeon.hasTile(this.x,this.y)}},{key:"getTile",value:function(){return this.dungeon.getTile(this.x,this.y)}}]),e}(),P=function(){function e(t,n,i,s){r()(this,e),this.dungeonTiles=t,this.markers=n,this.layers=i,this.worldWidth=void 0,this.worldHeight=void 0,this.gridWidth=void 0,this.gridHeight=void 0,this.worldWidth=s.widthInPixels,this.worldHeight=s.heightInPixels,this.gridWidth=s.width,this.gridHeight=s.height}return a()(e,[{key:"destroy",value:function(){this.dungeonTiles.forEach((function(e){return e.destroy()})),delete this.dungeonTiles,delete this.markers,this.layers.floor.destroy(),this.layers.objects.destroy(),delete this.layers}},{key:"getMarker",value:function(e){return this.markers[e]}},{key:"getCursor",value:function(e,t){return new k(this,e,t)}},{key:"hasTile",value:function(e,t){return this.dungeonTiles.some((function(n){return n.isGridPosition(e,t)}))}},{key:"getTile",value:function(e,t){var n=this.dungeonTiles.find((function(n){return n.isGridPosition(e,t)}));if(!n)throw new Error("No tile found for ".concat(e,", ").concat(t));return n}},{key:"getWalkableNeighborTile",value:function(e,t,n){var i=this.getCursor(e,t);if(i.move(n),i.exists()){var s=i.getTile();return s.isWalkable()?s:void 0}}},{key:"getDungeonLayer",value:function(e){return this.layers[e]}}]),e}(),w=function e(t,n,i,s,o){r()(this,e),this.name=t,this.gridX=n,this.gridY=i,this.worldX=s,this.worldY=o},T=function(){function e(t,n,i,s,o){r()(this,e),this.gridX=t,this.gridY=n,this.worldX=i,this.worldY=s,this.properties=o,this.enterBehaviors=void 0,this.enterBehaviors=[]}return a()(e,[{key:"destroy",value:function(){delete this.properties}},{key:"isWalkable",value:function(){return this.properties.walkable}},{key:"isObjective",value:function(){return this.properties.objective}},{key:"isGridPosition",value:function(e,t){return e===this.gridX&&t===this.gridY}},{key:"addEnterBehavior",value:function(e){this.enterBehaviors.push(e)}}]),e}(),b=function(){function e(t){r()(this,e),this.scene=t}return a()(e,[{key:"create",value:function(e,t,n,i,s){var r={walkable:s.walkable.reduce((function(e,t){return e&&t}),!0),objective:s.objective.reduce((function(e,t){return e||t}),!1)};return new T(e,t,n,i,r)}},{key:"process",value:function(e,t){}}]),e}(),E=function(){function e(t){r()(this,e),this.scene=t,this.dungeonTileFactory=void 0,this.dungeonTileFactory=new b(t)}return a()(e,[{key:"createDungeon",value:function(e,t,n){var i=this,s=this.scene.add.tilemap(e);s.addTilesetImage("dungeon-tileset","dungeon-spritesheet");var r=this.createLayers(s,t,n),o=this.createDungeonTiles(s,r),a=this.createDungeonMarkers(s,r,t,n),u=new P(o,a,r,s);return o.forEach((function(e){return i.dungeonTileFactory.process(e,u)})),u}},{key:"createLayers",value:function(e,t,n){return{floor:e.createDynamicLayer("floor","dungeon-tileset",t,n),objects:e.createDynamicLayer("objects","dungeon-tileset",t,n)}}},{key:"createDungeonTiles",value:function(e,t){var n=this,i={};return Object.values(t).forEach((function(t){t.forEachTile((function(e){var t,n="".concat(e.x,",").concat(e.y);i[n]=null!==(t=i[n])&&void 0!==t?t:{},Object.entries(e.properties).forEach((function(e){var t,s=y()(e,2),r=s[0],o=s[1];i[n][r]=null!==(t=i[n][r])&&void 0!==t?t:[],i[n][r].push(o)}))}),n,0,0,e.width,e.height,{isNotEmpty:!0})})),Object.entries(i).map((function(e){var i=y()(e,2),s=i[0],r=i[1],o=s.split(",").map(Number),a=y()(o,2),u=a[0],h=a[1],c=t.floor.tileToWorldXY(u,h);return n.dungeonTileFactory.create(u,h,c.x,c.y,r)}))}},{key:"createDungeonMarkers",value:function(e,t,n,i){return e.getObjectLayer("markers").objects.reduce((function(e,s){var r=t.floor.getTileAtWorldXY(s.x+n,s.y+i),o=t.floor.tileToWorldXY(r.x,r.y);return e[s.name]=new w(s.name,r.x,r.y,o.x,o.y),e}),{})}}]),e}(),O=function(){function e(t,n){var i,s;r()(this,e),this.scene=void 0,this.x=void 0,this.y=void 0,this.texture=void 0,this.depth=void 0,this.originX=void 0,this.originY=void 0,this.sprite=void 0,this.scene=t,this.x=n.x,this.y=n.y,this.texture=n.texture,this.depth=n.depth,this.originX=null!==(i=n.originX)&&void 0!==i?i:.5,this.originY=null!==(s=n.originY)&&void 0!==s?s:.5}return a()(e,[{key:"onAdd",value:function(){this.sprite=this.scene.add.sprite(this.x,this.y,this.texture),this.sprite.setDepth(this.depth),this.sprite.setOrigin(this.originX,this.originY)}},{key:"destroy",value:function(){}}]),e}(),x=function(){function e(t,n){r()(this,e),this.gridX=void 0,this.gridY=void 0,this.gridX=n.gridX,this.gridY=n.gridY}return a()(e,[{key:"setGridPosition",value:function(e,t){this.gridX=e,this.gridY=t}},{key:"destroy",value:function(){}}]),e}(),N=n(558),S=function(){function e(t,n,i){r()(this,e),this.scene=void 0,this.data=void 0,this.entity=void 0,this.stateMachine=void 0,this.scene=t,this.data=n,this.entity=i}return a()(e,[{key:"onAdd",value:function(){var e=this;this.stateMachine=new N.a(this.scene,this.entity,this.data.states,this.data.initialState),this.stateMachine.start(),this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE,(function(){return e.updateStateMachine}))}},{key:"destroy",value:function(){var e=this;this.scene.events.off(Phaser.Scenes.Events.POST_UPDATE,(function(){return e.updateStateMachine}))}},{key:"updateStateMachine",value:function(){this.stateMachine.update()}}]),e}(),I=[{id:"idle",transitions:[],onEnter:function(e){e.getComponent(O).sprite.anims.play("hero-idle")}},{id:"moving",transitions:[],onEnter:function(e){e.getComponent(O).sprite.anims.play("hero-run")}}],D={components:[{component:O,data:{texture:"hero",depth:50,originX:0,originY:.5}},x,{component:S,data:{states:I,initialState:I[0]}}]},M=function(e,t,n,s){for(var r=!0,o=e.getComponent(O).sprite,a=e.getComponent(x),u=new Phaser.Math.Vector2(a.gridX,a.gridY),h=s.tweens.timeline({tweens:[{targets:[],duration:0}],paused:!0,onStart:function(){e.getComponent(S).stateMachine.doTransition({to:"moving",onTransition:function(e){var n=e.getComponent(O).sprite;t===i.LEFT?n.flipX=!0:t===i.RIGHT&&(n.flipX=!1)}})},onComplete:function(){e.getComponent(S).stateMachine.doTransition({to:"idle"})}}),c=function(){var e=n.getWalkableNeighborTile(u.x,u.y,t);if(e){var i=new Phaser.Math.Vector2(e.worldX,e.worldY);h.add({targets:o,props:{x:i.x,y:i.y},duration:200,onComplete:function(){a.setGridPosition(e.gridX,e.gridY),e.enterBehaviors.forEach((function(e){return e()}))}}),u.set(e.gridX,e.gridY)}else r=!1};r;)c();return h},L={WIDTH:342,HEIGHT:608},C=function(e){function t(){var e,n;r()(this,t);for(var i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];return(n=h()(this,(e=l()(t)).call.apply(e,[this].concat(s)))).persistence=void 0,n.phecs=void 0,n.levelManager=void 0,n.swipe=void 0,n}return v()(t,e),t}(Phaser.Scene),X=function(e){function t(){var e;return r()(this,t),(e=h()(this,l()(t).call(this,{key:"dungeon"}))).dungeon=void 0,e.hero=void 0,e.levelNumber=void 0,e}return v()(t,e),a()(t,[{key:"init",value:function(){this.phecs.register.prefab("hero",D)}},{key:"create",value:function(e){var t=this;this.add.image(this.scale.width-40,this.scale.height-40,"hud-restart").setScrollFactor(0).setInteractive().on(Phaser.Input.Events.POINTER_DOWN,(function(){t.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(function(){t.scene.restart(e)})),t.cameras.main.fadeOut(500)})),this.levelNumber=e.levelNumber;var n=new E(this);this.dungeon=n.createDungeon(this.levelManager.getLevelKey(this.levelNumber),0,0);var i=this.dungeon.getMarker("hero-start");this.hero=this.phecs.add.prefab("hero",{gridX:i.gridX,gridY:i.gridY},i.worldX,i.worldY),this.swipe.addListener((function(e){t.handleInput(e)}));var s=this.calculateCameraBounds(),r=s.x,o=s.y,a=s.width,u=s.height;this.cameras.main.setBounds(r,o,a,u),this.cameras.main.setBackgroundColor(2429722),this.cameras.main.startFollow(this.hero.getComponent(O).sprite),this.cameras.main.fadeIn(500)}},{key:"handleInput",value:function(e){var t=this;if("moving"!==this.hero.getComponent(S).stateMachine.currentState.id){var n=this.hero.getComponent(x),i=this.dungeon.getCursor(n.gridX,n.gridY);if(i.move(e),i.getTile().isWalkable())M(this.hero,e,this.dungeon,this).play();else if(i.getTile().isObjective()){this.persistence.getDocument("progress").lastCompletedLevelNumber=this.levelNumber,this.persistence.store(),this.levelManager.hasLevel(this.levelNumber+1)?(this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(function(){t.scene.restart({levelNumber:t.levelNumber+1})})),this.cameras.main.fadeOut(500)):console.log("beat all the levels")}}}},{key:"calculateCameraBounds",value:function(){var e=0,t=0,n=this.dungeon.worldWidth,i=this.dungeon.worldHeight;return n<L.WIDTH&&(e-=(L.WIDTH-n)/2),i<L.HEIGHT&&(t-=(L.HEIGHT-i)/2),{x:e,y:t,width:n,height:i}}}]),t}(C),Y=Array.from({length:3},(function(e,t){return t+1})).reduce((function(e,t){var n=String(t).padStart(3,"0");return e[t]="level-".concat(n),e}),{}),H=function(e){function t(e){return r()(this,t),h()(this,l()(t).call(this,e))}return v()(t,e),a()(t,[{key:"hasLevel",value:function(e){return Boolean(Y[e])}},{key:"getLevelKey",value:function(e){return Y[e]}}]),t}(Phaser.Plugins.BasePlugin),W=function(e){function t(){return r()(this,t),h()(this,l()(t).call(this,{key:"preload"}))}return v()(t,e),a()(t,[{key:"preload",value:function(){this.load.image("logo","assets/logo/scooch-dungeon-logo.png"),this.load.bitmapFont("matchup-64","assets/fonts/matchup-64.png","assets/fonts/matchup-64.xml"),this.load.image("hud-restart","assets/images/hud-restart.png"),this.load.image("dungeon-spritesheet","assets/maps/dungeon-spritesheet.png");for(var e=1;e<=3;e++){var t=String(e).padStart(3,"0");this.load.tilemapTiledJSON("level-".concat(t),"assets/levels/".concat(t,".json"))}this.load.spritesheet("hero","assets/characters/hero/spritesheet.png",{frameWidth:32,frameHeight:56}),this.load.animation("hero-animations","assets/characters/hero/animations.json")}},{key:"create",value:function(){this.persistence.read(),this.scene.start("title")}}]),t}(C),j=function(e){function t(){return r()(this,t),h()(this,l()(t).call(this,{key:"title"}))}return v()(t,e),a()(t,[{key:"create",value:function(){var e=this;this.cameras.main.setBackgroundColor(4007227);var t=this.add.image(-300,100,"logo").setScale(.6),n=this.persistence.getDocument("progress"),i=0===n.lastCompletedLevelNumber?"PLAY":"CONTINUE",s=this.addButton(this.cameras.main.centerX,L.HEIGHT+100,i,(function(){return e.scene.start("dungeon",{levelNumber:n.lastCompletedLevelNumber+1})}));this.tweens.timeline({tweens:[{targets:t,props:{x:this.cameras.main.centerX},ease:Phaser.Math.Easing.Quadratic.Out,duration:750},{targets:s,props:{y:300},offset:300,ease:Phaser.Math.Easing.Quadratic.Out,duration:550}]})}},{key:"addButton",value:function(e,t,n,i){var s=this.add.container(e,t).setSize(240,80).setInteractive().on(Phaser.Input.Events.POINTER_DOWN,i),r=this.add.rectangle(0,0,240,80,14306872).setOrigin(.5),o=this.add.rectangle(0,0,230,70,15633710).setOrigin(.5),a=this.add.bitmapText(0,-5,"matchup-64",n).setOrigin(.5);return s.add(r),s.add(o),s.add(a),s}}]),t}(C),_=function(e){function t(e){var n;return r()(this,t),(n=h()(this,l()(t).call(this,e))).documents=void 0,n.documents=[],n}return v()(t,e),a()(t,[{key:"addDocument",value:function(e){this.documents.push(e)}},{key:"getDocument",value:function(e){var t=this.documents.find((function(t){return t.name===e}));if(!t)throw new Error("No persistence document found: ".concat(e));return t}},{key:"store",value:function(){var e=this.documents.reduce((function(e,t){return e[t.name]=t.toJson(),e}),{});window.localStorage.setItem("scooch-dungeon",JSON.stringify(e))}},{key:"read",value:function(){var e=this,t=window.localStorage.getItem("scooch-dungeon")||"{}",n=JSON.parse(t);Object.entries(n).forEach((function(t){var n=y()(t,2),i=n[0],s=n[1],r=e.documents.find((function(e){return e.name===i}));null==r||r.fromJson(s)}))}}]),t}(Phaser.Plugins.BasePlugin),G=function(){function e(){r()(this,e),this.name="progress",this.lastCompletedLevelNumber=0}return a()(e,[{key:"toJson",value:function(){return{levelNumber:this.lastCompletedLevelNumber}}},{key:"fromJson",value:function(e){this.lastCompletedLevelNumber=e.levelNumber}}]),e}(),R=function(e){function t(){return r()(this,t),h()(this,l()(t).call(this,{key:"boot"}))}return v()(t,e),a()(t,[{key:"create",value:function(){this.persistence.addDocument(new G),this.scene.start("preload")}}]),t}(C),B=n(167),F=n.n(B),U=function(e){function t(e,n){var i;return r()(this,t),(i=h()(this,l()(t).call(this,e,n))).listeners=void 0,i.hasSwiped=void 0,i.listeners=[],i.hasSwiped=!1,e.events.on(Phaser.Scenes.Events.START,i.startListening,F()(i)),e.events.on(Phaser.Scenes.Events.SHUTDOWN,i.stopListening,F()(i)),i}return v()(t,e),a()(t,[{key:"addListener",value:function(e){this.listeners.push(e)}},{key:"startListening",value:function(){this.scene.input.on(Phaser.Input.Events.POINTER_DOWN,this.onPointerDown,this),this.scene.input.on(Phaser.Input.Events.POINTER_UP,this.onPointerUp,this),this.scene.input.on(Phaser.Input.Events.POINTER_MOVE,this.onPointerMove,this)}},{key:"stopListening",value:function(){this.listeners=[],this.scene.input.off(Phaser.Input.Events.POINTER_DOWN,this.onPointerDown,this),this.scene.input.off(Phaser.Input.Events.POINTER_UP,this.onPointerUp,this),this.scene.input.off(Phaser.Input.Events.POINTER_MOVE,this.onPointerMove,this)}},{key:"onPointerDown",value:function(){this.hasSwiped=!1}},{key:"onPointerUp",value:function(){this.hasSwiped=!0}},{key:"onPointerMove",value:function(){if(this.scene.input.activePointer.isDown){var e=this.scene.input.activePointer.getDistanceX(),t=this.scene.input.activePointer.getDistanceY(),n=void 0;if(e>100){var s=this.scene.input.activePointer.position.x-this.scene.input.activePointer.prevPosition.x;n=s<0?i.LEFT:i.RIGHT}else if(t>100){var r=this.scene.input.activePointer.position.y-this.scene.input.activePointer.prevPosition.y;n=r<0?i.UP:i.DOWN}n&&!this.hasSwiped&&(this.hasSwiped=!0,this.listeners.forEach((function(e){return e(n)})))}}}]),t}(Phaser.Plugins.ScenePlugin),A=(g.a.Scene,[R,W,j,X]);new g.a.Game({width:L.WIDTH,height:L.HEIGHT,scene:A,scale:{mode:g.a.Scale.FIT,autoCenter:g.a.Scale.CENTER_HORIZONTALLY},render:{pixelArt:!0},plugins:{scene:[{key:"Phecs",plugin:p.a,mapping:"phecs"},{key:"Swipe",plugin:U,mapping:"swipe"}],global:[{key:"LevelManagerPlugin",plugin:H,mapping:"levelManager",start:!0},{key:"PersistencePlugin",plugin:_,mapping:"persistence",start:!0}]}})}});