(function () {
    var SpriteSheetAnimator = function (param) {
        this.initialize(param);
    };
    var p = SpriteSheetAnimator.prototype
    p.initialize = function (param) {
        //--- NOTE --------
        // as per frame animation 
        // Frame 1 is equal to Frame 0 in coding
        //--------------------------------------------------
        var This = this;
        // this.spriteWidth     Sprite Sheet image width
        // this.spriteHeight    Sprite Sheet image height
        // this.frames          Number of frame in sprite sheet
        // this.col             Number of Column in Sprite
        // this.row             Number of Row in Sprite
        // this.targetDiv       Where you want to play animation
        // this.paddingDiv      with the help of this div we can control height of targetDiv.
        // this.timeScale       Animation Speed. default value is 1
        // this.repeat          repeat animation, default is 0, will play once
        //
        this.timeScale = 1;
        this.repeat = 0;
        for (const key in param) {
            if (param.hasOwnProperty(key)) {
                this[key] = param[key];
            }
        }
        this.frameWidth = this.spriteWidth / this.col;
        this.frameHeight = this.spriteHeight / this.row;
        this.paddingBottom = this.frameHeight / this.frameWidth * 100;
        this.tempFrame = 0;
        this.curFrame = 0;
        //
        //
        this.tween = gsap.to(this, 1, {
            tempFrame: this.frames-1,
            ease: SteppedEase.config(this.frames-1),
            onUpdate: function () {
                if (This.tempFrame !== This.curFrame) {
                    This.curFrame = This.tempFrame;
                    This.onUpdate();
                }
            },
            repeat: this.repeat,
            paused:true,
            onComplete:function(){
                if(This.onComplete){
                    This.onComplete();
                }
            }
        })
        this.tween.timeScale(this.timeScale);
        this.tween.gotoAndStop = function(frame){This.gotoAndStop(frame);};
        this.tween.gotoAndPlay = function(frame){This.gotoAndPlay(frame);};
            
        //
        this.updateUI();
    };
    p.gotoAndStop = function(frame){
        frame -=1;
        var progress = frame/this.frames;
        //console.log(progress);
        this.tween.progress(progress);
        this.tween.pause();
    }
    p.gotoAndPlay = function(frame){
        frame -=1;
        var progress = frame/this.frames;
        //console.log(progress);
        this.tween.progress(progress);
        this.tween.play();
    }
    p.updateUI = function(){
        if(this.paddingDiv && this.paddingDiv!=""){
            gsap.set(this.paddingDiv, {width:"100%", height:"auto", paddingBottom:this.paddingBottom+"%"})
        }
        gsap.set(this.targetDiv,{
            backgroundSize:(this.col*100)+"% auto"
        })
    }
    p.onUpdate = function () {
        //console.log(this.curFrame);
        var tempCol = this.curFrame%this.col;
        var tempRow = Math.floor(this.curFrame/this.col);
        var posX = -tempCol*100;
        var posY = -tempRow*100;
        var backgroundPosition = posX+"% "+posY+"";
        //console.log(backgroundPosition);
        gsap.set(this.targetDiv,{
            backgroundPosition: backgroundPosition,
        });
        if(this.onFrameChange){
            this.onFrameChange();
        }
    }
    window.SpriteSheetAnimator = SpriteSheetAnimator;
}());