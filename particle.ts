class Particle {
    particleSize : number;
    x: number;
    y: number;
    velY: number;
    velX: number;
    speed: number;
    friction: number;
    rays: Ray[];

    constructor() {
        this.particleSize = 3;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.velY = 0;
        this.velX = 0;
        this.speed = 2;
        this.friction = 0.6;

        this.rays = [];
        for (let a = 0; a < 360; a += 0.1) {
            this.rays.push(new Ray(this.x, this.y, (a * (Math.PI / 180))));
        }
    }

    move(dir: []) {

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
        } else if (this.x <= this.particleSize) {
            this.x = this.particleSize;
        }

        if (this.y > canvas.height) {
            this.y = canvas.height;
        } else if (this.y <= this.particleSize) {
            this.y = this.particleSize;
        }
    }

    update(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    look(walls: Boundary[], ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.rays.length; i++) {
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    let a = this.x - pt.x;
                    let b = this.y - pt.y;
                    const d = Math.sqrt(a * a + b * b);
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
                ctx.closePath()
            }
        }
    }

    show(ctx: CanvasRenderingContext2D) {
        for (let ray of this.rays) {
            ray.update(this.x, this.y);
            ray.show(ctx);
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.particleSize, 0, 2 * Math.PI);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.closePath()
    }

}