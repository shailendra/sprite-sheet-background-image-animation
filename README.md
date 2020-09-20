# Sprite Sheet Animation in HTML Using CSS and Javascript
![alt](images/demo-img.png)
<br><br>
```html
//---- H T M L -----------
<div class="box red" id="redBox">
    <div class="padder"></div>
</div>
```

```css
//---- C S S ----------
.box {
    position:relative;
    width:300px;
    height:auto;
    position:relative;
    background:url(../images/spritesheet-img.png);      
}  
```

```javascript
//---- J V A S C R I P T ---------------
var spAimObj = new SpriteSheetAnimator({
    spriteWidth: 733,
    spriteHeight: 489,
    frames: 15,
    col: 4,
    row: 4,
    targetDiv:".box",
    paddingDiv:".padder",
    timeScale:1,
    repeat:0,
    onComplete:function(){
        console.log("onComplete");
    },
    onFrameChange:function(param){
        if(param.curFrame==9){            
        }
    }
})


function play(){ 
    spAimObj.tween.play(); 
};

function pause(){ 
    spAimObj.tween.pause(); 
};

function restart(){ 
    spAimObj.tween.restart(); 
};

function reverse(){ 
    spAimObj.tween.reverse(); 
};

function once(){ 
    spAimObj.tween.repeat(1); 
    spAimObj.tween.restart();
};

function infinity(){ 
    spAimObj.tween.repeat(-1); 
    spAimObj.tween.restart();
};

function timeScale(X){ 
  spAimObj.tween.timeScale(X); 
};


function gotoAndStop(x){
    spAimObj.tween.gotoAndStop(x); 
}
function gotoAndPlay(x){
    spAimObj.tween.gotoAndPlay(x); 
}
```