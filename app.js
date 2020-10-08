var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mouseX;
var mouseY;
var useMouse = true;
var walls = [];
var ray;
var particle;
var first = true;
var fx;
var fy;
var keys = [];
function init() {
    var _this = this;
    canvas.addEventListener('mousemove', function (e) {
        mouseX = e.x;
        mouseY = e.y;
    });
    canvas.addEventListener('click', function (e) {
        addBoundry(e);
    });
    canvas.addEventListener('keydown', function (e) {
        _this.keys[e.keyCode] = true;
    });
    canvas.addEventListener('keyup', function (e) {
        keys[e.keyCode] = false;
    });
    //Random Walls
    for (var i = 0; i < 4; i++) {
        var x1 = Math.round(Math.random() * canvas.width);
        var y1 = Math.round(Math.random() * canvas.height);
        var x2 = Math.round(Math.random() * canvas.width);
        var y2 = Math.round(Math.random() * canvas.height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
    //Canvas walls
    walls.push(new Boundary(0, 0, canvas.width, 0)); //Top
    walls.push(new Boundary(canvas.width, 0, canvas.width, canvas.height)); //Right
    walls.push(new Boundary(0, canvas.height, canvas.width, canvas.height)); //Bottom
    walls.push(new Boundary(0, 0, 0, canvas.height)); //Left
    particle = new Particle();
    draw();
}
function addBoundry(e) {
    if (first) {
        fx = e.x;
        fy = e.y;
        first = false;
    }
    else {
        walls.push(new Boundary(fx, fy, e.x, e.y));
        first = true;
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Verdana";
    ctx.lineWidth = 1;
    // Create gradient
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "magenta");
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(1.0, "red");
    // Fill with gradient
    ctx.strokeStyle = gradient;
    ctx.strokeText("Click to add new walls!", 10, 50);
    for (var _i = 0, _a = this.walls; _i < _a.length; _i++) {
        var wall = _a[_i];
        wall.show(ctx);
    }
    //Follow mouse
    if (this.useMouse) {
        particle.update(mouseX, mouseY);
    }
    else {
        particle.move(this.keys);
    }
    particle.show(ctx);
    particle.look(walls, ctx);
    // ray.show(ctx);
    // ray.lookAt(mouseX, mouseY);
    // let pt = ray.cast(wall);
    // if(pt){
    //     ctx.beginPath();
    //     ctx.arc(pt.x, pt.y, 5, 0, 2 * Math.PI);
    //     ctx.stroke();
    // }
    requestAnimationFrame(draw);
}
init();
