export class gameFinish {
    constructor(canvas) {
        this.canvas = canvas;
        this.gameover = false;
    }
    draw(ctx,score) {
        if (this.gameover) {
            ctx.fillStyle="rgba(0,0,0,0.5)";
            ctx.strokeStyle="white"
            ctx.beginPath();
            ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
            ctx.stroke();
            ctx.closePath();

            ctx.fillStyle="rgba(0,0,0,0.8)";
            ctx.strokeStyle="white"
            ctx.beginPath();
            ctx.fillRect(this.canvas.width*1/5,this.canvas.width*1/10,this.canvas.width*3/5,this.canvas.height*7/10);
            ctx.stroke();
            ctx.closePath();

            ctx.fillStyle="white"
            ctx.strokeStyle="red"
            ctx.textAlign = 'center';
            ctx.font = '40px Arial';
            ctx.lineWidth=10
            ctx.strokeText("Game Over", this.canvas.width/2,this.canvas.height/2);
            ctx.fillText("Game Over", this.canvas.width/2,this.canvas.height/2);
            ctx.strokeText(`SCORE : ${score}`, this.canvas.width/2,this.canvas.height/2-100);
            ctx.fillText(`SCORE : ${score}`, this.canvas.width/2,this.canvas.height/2-100);

            let btn=document.getElementById('replay');
            btn.style.visibility="visible";
            btn.addEventListener('click',function(){
                location.reload();
            })
        }
       
    }
}