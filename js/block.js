import { brickTemp } from "./brickTemp.js";
export class Block extends brickTemp{
constructor(detail){
    super(detail);
    this.score=detail.score;
}
}