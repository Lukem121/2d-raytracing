const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX;
let mouseY;
let useMouse : boolean = true;

let walls : Boundary[] = [];
let ray : Ray;
let particle : Particle;
let first = true;
let fx;
let fy;
let keys = [];

function init () {
    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.x;
        mouseY = e.y;
    });
    canvas.addEventListener('click', (e) => {
        addBoundry(e)
    });
    canvas.addEventListener('keydown', (e) => {
        this.keys[e.keyCode] = true;
    })
    canvas.addEventListener('keyup', (e) => {
        keys[e.keyCode] = false;
    })

    //Random Walls
    for(let i = 0; i < 4; i++) {
        let x1 = Math.round(Math.random() * canvas.width);
        let y1 = Math.round(Math.random() * canvas.height);
        let x2 = Math.round(Math.random() * canvas.width);
        let y2 = Math.round(Math.random() * canvas.height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }

    //Canvas walls
    walls.push(new Boundary(0, 0, canvas.width, 0));//Top
    walls.push(new Boundary(canvas.width, 0, canvas.width, canvas.height));//Right
    walls.push(new Boundary(0, canvas.height, canvas.width, canvas.height));//Bottom
    walls.push(new Boundary(0, 0, 0, canvas.height));//Left
    particle = new Particle();
    
    draw();
}

function addBoundry(e) {
    if(first){
        fx = e.x;
        fy = e.y;
        first = false;
    }else{
        walls.push(new Boundary(fx, fy, e.x, e.y));
        first = true;
    }
}

function draw () {
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

    for(let wall of this.walls){
        wall.show(ctx);
    }
    
    //Follow mouse
    if(this.useMouse){
        particle.update(mouseX, mouseY);

    }else{
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
