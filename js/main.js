import { game } from "./game.js";
import {Sound} from "./sound.js"
onload=()=>{
let con=document.getElementById("container");
let canvas=document.createElement("canvas");
canvas.width=innerWidth*2/3;
canvas.height=innerHeight*9/10;
con.append(canvas);
let button=document.createElement('button');
button.innerHTML='CLICK HERE <br> TO <br> START GAME';
button.id="btn";
con.append(button);
let button1=document.createElement('button');
button1.innerText='Play Again';
button1.id="replay";
button1.style.visibility='hidden'
con.append(button1);

let sound=new Sound();
let begin=new game(canvas);
button.addEventListener('click',function(){
    motion();
    sound.loading.pause();
    sound.opening.play();
});
begin.start();
// motion();
sound.loading.play();
sound.loading.muted=false;

addEventListener('keydown',begin.keypress.bind(begin));
addEventListener('keyup',begin.keyrelease.bind(begin));
function motion(){
    button.style.visibility='hidden';
    canvas.style.border='5px solid rgb(218, 255, 7)';
    begin.update();
    begin.draw();
    requestAnimationFrame(motion);
}
}
