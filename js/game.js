import { platform } from "./platform.js";
import { ball } from "./ball.js";
import { gameFinish } from "./Gameover.js";
import { blocksSet } from "./blocksInfo.js";
import { Block } from "./block.js";
import { Sound } from "./sound.js";

export class game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.level=1;
        this.lives = 3;
        this.score = 0;
        this.playing = true;
        this.levelend=2
        
    }
    start() {
       
        this.sound=new Sound();
        // this.sound.load();
        
        this.blockCollection = []
        blocksSet[this.level-1].forEach((blockSet, index) => {
            for (let r = 0; r < blockSet.rows; r++) {
                for (let c = 0; c < blockSet.columns; c++) {
                    let block = new Block(
                        {
                            x: blockSet.x + (c * (blockSet.width + blockSet.padding)),
                            y: blockSet.y + (r * (blockSet.height + blockSet.padding)),
                            width: blockSet.width,
                            height: blockSet.height,
                            color: blockSet.color,
                            score: blockSet.score
                        }
                    )
                    this.blockCollection.push(block);
                }
            }
        })
        this.paddle = new platform(
            {
                x: this.canvas.width / 2,
                y: this.canvas.height - 50,
                width: 150,
                height: 15,
                maxmove: this.canvas.width,
                color: "red"
            }
        )
        this.ball = new ball(
            {
                x: this.canvas.width / 2,
                y: this.canvas.height - 60,
                radius: 10,
                maxX: this.canvas.width,
                maxY: this.canvas.height,
                color: "yellow"
            }
        )
        this.gameover = new gameFinish(this.canvas);
    }
    keypress(ev) {
        // console.log(ev);
        // console.log("key pressed");
        if (this.ball.moving) {
            switch (ev.code) {
                case "ArrowLeft":
                    this.paddle.move('left');
                    break;
                case "ArrowRight":
                    this.paddle.move('right');
                    break;
            }
        }
    }
    keyrelease(ev) {
        //  console.log('key released');
        switch (ev.code) {
            case "ArrowLeft":
            case "ArrowRight":
                this.paddle.stop();
                break;
            case "Space":
                if(!this.ball.moving){
                    this.ball.moving = true;
                this.ball.bounce();
                }
                break;
        }
    }
    reset() {
        this.paddle.x = this.canvas.width / 2 - this.paddle.width / 2
        this.paddle.y = this.canvas.height - 50;
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height - 60;
        this.ball.living = true;
        this.paddle.living = true;
        this.playing = true;
        this.sound.opening.play();
    }
    update() {
         if(!this.playing || this.gameover.gameover){
             return;
         }
         
        this.paddle.update();
        this.ball.update();
        if (this.paddle.hitandturn(this.ball)) {
            //  console.log("hit occured");
            this.ball.turnUp();
            // this.ball.color = `rgb(${Math.random() * 250},${Math.random() * 150},${Math.random() * 250})`;
            this.sound.paddlehit.play();
        }
        this.blockCollection.forEach(block => {
            if (block.living && block.hitandturn(this.ball)) {
                this.ball.turnUp();
                block.living = false;
                this.score += block.score;
                this.sound.brickhit.play();
            }
        })
        let flag=false;
        this.blockCollection.forEach(block => {
            if(block.living)
            flag=true;
        })
        if(flag==false){
        this.level++;
        if(this.level>this.levelend){
            console.log(this.level,'level ended');
            this.gameover.gameover=true;
            this.sound.gameend.play();
            return;
        }
        this.sound.levelchange.play();
        this.start();
        }
        if (!this.ball.living) {
            // this.gameover.gameover=true;
            // if(this.lives>0)
            // setTimeout(()=>this.lives--,5000);
            this.lives--;
            if (this.lives == 0 ) {
                this.gameover.gameover = true;
                this.sound.gameend.play();
                return;
            }
            this.paddle.living = false;
            this.playing = false;
            // this.reset();
            setTimeout(this.reset.bind(this), 5000);
        }
       
    }
    draw() {
        let ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let bg=new Image();
        bg.src="./bg.jpg";
        ctx.globalAlpha = 0.3;
        ctx.drawImage(bg,0,0,this.canvas.width,this.canvas.height);
        ctx.globalAlpha = 1.0;
        if (!this.gameover.gameover) {
            ctx.fillStyle = "yellow";
            ctx.font = "20px Arial Bold"
            ctx.fillText(`Lives Left : ${this.lives}`, 15, 23);
          
            ctx.fillStyle = "red";
            ctx.font = "30px Arial Bold"
            ctx.fillText(`LEVEL : ${this.level}`, this.canvas.width/2-50, 28);
            
            ctx.fillStyle = "yellow";
            ctx.font = "20px Arial Bold"
            ctx.fillText(`SCORE : ${this.score}`, this.canvas.width - 120, 23);
            
            this.ball.draw(ctx);
            this.blockCollection.forEach(block => block.draw(ctx));
            this.paddle.draw(ctx);
        }
        this.gameover.draw(ctx,this.score);
    }
}