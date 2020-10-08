var Boundary = /** @class */ (function () {
    function Boundary(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    Boundary.prototype.show = function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "hotpink";
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
        ctx.closePath();
    };
    return Boundary;
}());
