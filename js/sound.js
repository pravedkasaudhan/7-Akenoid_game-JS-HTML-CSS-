export class Sound{
    constructor(){
        this.brickhit=new Audio();
        this.paddlehit=new Audio();
        this.wallhit=new Audio();
        this.opening=new Audio();
        this.balldrop=new Audio();
        this.levelchange=new Audio();
        this.loading=new Audio();
        this.gameend=new Audio();
        this.load();
    }
    load(){
        this.brickhit.src="./sounds/s1.wav";
        this.paddlehit.src="./sounds/s2.mp3";
        this.wallhit.src="./sounds/s3.wav";
        this.opening.src="./sounds/opening.wav"; 
        this.balldrop.src="./sounds/balldrop.wav"; 
        this.levelchange.src="./sounds/level.wav"; 
        this.loading.src="./sounds/loading.wav"; 
        this.gameend.src="./sounds/gameover.wav"; 
       
    }
}