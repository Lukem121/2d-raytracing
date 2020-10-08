var Particle = /** @class */ (function () {
    function Particle() {
        this.particleSize = 3;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.velY = 0;
        this.velX = 0;
        this.speed = 2;
        this.friction = 0.6;
        this.rays = [];
        for (var a = 0; a < 360; a += 0.1) {
            this.rays.push(new Ray(this.x, this.y, (a * (Math.PI / 180))));
        }
    }
    Particle.prototype.move = function (dir) {
        //Go forwards
        if (keys[87]) {
            if (this.velY > -this.speed) {
                this.velY--;
            }
        }
        //Go backwards
        if (keys[83]) {
            if (this.velY < this.speed) {
                this.velY++;
            }
        }
        //Go left
        if (keys[65]) {
            if (this.velX > -this.speed) {
                this.velX--;
            }
        }
        //Go right
        if (keys[68]) {
            if (this.velX < this.speed) {
                this.velX++;
            }
        }
        this.velY *= this.friction;
        this.y += this.velY;
        this.velX *= this.friction;
        this.x += this.velX;
        if (this.x >= canvas.width) {
            this.x = canvas.width;
        }
        else if (this.x <= this.particleSize) {
            this.x = this.particleSize;
        }
        if (this.y > canvas.height) {
            this.y = canvas.height;
        }
        else if (this.y <= this.particleSize) {
            this.y = this.particleSize;
        }
    };
    Particle.prototype.update = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Particle.prototype.look = function (walls, ctx) {
        for (var i = 0; i < this.rays.length; i++) {
            var ray_1 = this.rays[i];
            var closest = null;
            var record = Infinity;
            for (var _i = 0, walls_1 = walls; _i < walls_1.length; _i++) {
                var wall = walls_1[_i];
                var pt = ray_1.cast(wall);
                if (pt) {
                    var a = this.x - pt.x;
                    var b = this.y - pt.y;
                    var d = Math.sqrt(a * a + b * b);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                ctx.beginPath();
                ctx.strokeStyle = "crimson";
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(closest.x, closest.y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    };
    Particle.prototype.show = function (ctx) {
        for (var _i = 0, _a = this.rays; _i < _a.length; _i++) {
            var ray_2 = _a[_i];
            ray_2.update(this.x, this.y);
            ray_2.show(ctx);
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.particleSize, 0, 2 * Math.PI);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.closePath();
    };
    return Particle;
}());
