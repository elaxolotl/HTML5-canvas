var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init()
})
var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 40;
var minRadius = 10;
var colorArray=["#D9043D", "#033E8C", "#F2B705", "#F28705", "#D90404"]
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y
})
var c = canvas.getContext('2d')
function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle=this.color
        c.stroke()
        c.lineWidth=5
        c.fill()
    }
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx;
        this.y += this.dy;
        //interactive component
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius<maxRadius){
                this.radius +=1;
            }
        }
        else if (this.radius>minRadius) {
            this.radius -=1;
        }
        this.draw()
    }
}
var circleArray = [];
function init(){
    circleArray = [];
    for (var i = 0; i < 300; i++) {
        var radius = Math.random()*10;
        var x = Math.random() * (innerWidth - 2 * radius) + radius;
        var y = Math.random() * (innerHeight - 2 * radius) + radius;
        var dx = Math.random() < 0.5 ? -1 : 1;
        var dy = Math.random() < 0.5 ? -1 : 1;
        var color= colorArray[Math.floor(Math.random()*colorArray.length)]
        circleArray.push(new Circle(x, y, dx, dy, radius, color));
    
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
}

animate();
init();