class Boundary {

    x1 : number;
    y1 : number;
    x2 : number;
    y2 : number;

    constructor(x1 : number, y1 : number, x2 : number, y2 : number) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
    }
  
    show(ctx : CanvasRenderingContext2D) {
      
        ctx.beginPath();
        ctx.strokeStyle = "hotpink";
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
        ctx.closePath()
    }
  }