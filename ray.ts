class Ray {
    x : number;
    y : number;
    dirX : number;
    dirY : number;
    
    constructor(x : number, y : number, angle : number) {
      this.x = x;
      this.y = y;
      this.dirX = Math.cos(angle);
      this.dirY = Math.sin(angle);
    }

    update (x, y){
      this.x = x;
      this.y = y;
    }

    lookAt(x, y) {
      this.dirX = x - this.x;
      this.dirY = y - this.y;
      this.dirX = (this.dirX - 0) / (1 - 0);
      this.dirY = (this.dirY - 0) / (1 - 0);
    }
  
    show(ctx : CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = "hotpink";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.dirX * 10, this.y + this.dirY * 10);
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath()
    }

    cast(wall : Boundary) {
      // Refrence https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

      const x1 = wall.x1;
      const y1 = wall.y1;
      const x2 = wall.x2;
      const y2 = wall.y2;

      const x3 = this.x;
      const y3 = this.y;

      const x4 = this.x + this.dirX;
      const y4 = this.y + this.dirY;

      //Calculate denominator
      const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (den == 0) {
        //If denominator is 0 it means lines are parralel 
        return;
      }

      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
      const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

      if (t > 0 && t < 1 && u > 0) {
        const pt = {
          x: x1 + t * (x2 - x1),
          y: y1 + t * (y2 - y1)
        };
        
        return pt;

      } else {
        return;
      }

    }
  }