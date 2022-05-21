import { Sound } from "./sound.js";
export class ball {
    constructor(circle) {
        this.x = circle.x;
        this.y = circle.y;
        this.radius = circle.radius;
        this.color = circle.color;
        this.maxX = circle.maxX - circle.radius;
        this.maxY = circle.maxY - circle.radius;
        this.speedX = 0;
        this.speedY = 0;
        this.living = true;
        this.moving = false
        this.sound = new Sound();
    }
    bounce() {
        // this.speedX=10;
        // this.speedY=-(Math.random()*10);
        if (this.moving) {
            this.speedX = 3;
            this.speedY = -3;
        }
    }
    turnUp() {
        this.speedY = -this.speedY;
    }
    update() {
        if (this.moving) {
            if (this.x < this.radius || this.x > this.maxX) {
                this.speedX = -this.speedX;
                this.sound.wallhit.play();
            }
            if (this.y < this.radius) {
                this.speedY = -this.speedY;
                this.sound.wallhit.play();
            }
            if (this.y > this.maxY) {
                this.speedY = 0;
                this.speedX = 0;
                this.living = false;
                this.moving = false;
                this.sound.balldrop.play();
            }
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
    draw(ctx) {
        // console.log("circle drawn");
        if (this.living) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.stroke();
            ctx.fill();
        }
    }
}