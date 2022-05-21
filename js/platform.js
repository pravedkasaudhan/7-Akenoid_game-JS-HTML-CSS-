import { brickTemp } from "./brickTemp.js";
export class platform extends brickTemp{
    constructor(rect) {
        super(rect);
        this.maxmove = rect.maxmove - rect.width;
        this.speed = 0;
        this.maxspeed = 5;
        this.direction = '';
    }
    move(dir) {
        this.direction = dir;
        // console.log("start", this.direction);
    }
    stop() {
        this.direction = '';
        // console.log("stop");
    }


    update() {
        // console.log("moving paddle");
        if (this.direction === "left") {
            if (this.x > 0) {
                // console.log("moved left")
                this.speed = -this.maxspeed;
                this.x += this.speed;
            }
            // else{
            //     this.speed=0;
            // }
        }
        if (this.direction === "right") {
            if (this.x < this.maxmove) {
                // console.log('moved right  ', this.maxmove)
                this.speed = this.maxspeed;
                this.x += this.speed;
            }
            // else{
            //     this.speed=0;
            // }
        }
        // console.log(this.x,this.speed)
        // this.x+=this.speed;
    }
    
}