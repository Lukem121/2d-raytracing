var Ray = /** @class */ (function () {
    function Ray(x, y, angle) {
        this.x = x;
        this.y = y;
        this.dirX = Math.cos(angle);
        this.dirY = Math.sin(angle);
    }
    Ray.prototype.update = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Ray.prototype.lookAt = function (x, y) {
        this.dirX = x - this.x;
        this.dirY = y - this.y;
        this.dirX = (this.dirX - 0) / (1 - 0);
        this.dirY = (this.dirY - 0) / (1 - 0);
    };
    Ray.prototype.show = function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "hotpink";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.dirX * 10, this.y + this.dirY * 10);
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
    };
    Ray.prototype.cast = function (wall) {
        // Refrence https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
        var x1 = wall.x1;
        var y1 = wall.y1;
        var x2 = wall.x2;
        var y2 = wall.y2;
        var x3 = this.x;
        var y3 = this.y;
        var x4 = this.x + this.dirX;
        var y4 = this.y + this.dirY;
        //Calculate denominator
        var den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
            //If denominator is 0 it means lines are parralel 
            return;
        }
        var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        var u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0) {
            var pt = {
                x: x1 + t * (x2 - x1),
                y: y1 + t * (y2 - y1)
            };
            return pt;
        }
        else {
            return;
        }
    };
    return Ray;
}());
