let pos = 0;
const pacArray = [
    ['./PacMan1.png', './PacMan2.png'],
    ['./PacMan3.png', './PacMan4.png'],
];
let direction = 0;
var focus = 0;
const pacMen = [];

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale,
    };
}

function makePac() {
    let velocity = setToRandom(10);
    let position = setToRandom(200);
    let direction = {
        x: 0,
        y: 0
    }
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = pacArray[0][0];
    newimg.width = 100;
    newimg.style.left = position.x.toString() + "px";
    newimg.style.top = position.y.toString() + "px";
    game.appendChild(newimg);
    return {
        position,
        velocity,
        newimg,
        direction
    };
}

setInterval(()=>{focus = (focus + 1) % 2;}, 200);

function update() {
    pacMen.forEach((item) => {
        checkCollisions(item);
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        item.newimg.style.left = item.position.x + "px";
        item.newimg.style.top = item.position.y + "px";
        item.newimg.src = pacArray[item.direction.x][focus];
    });
    setTimeout(update, 20);
}

function checkCollisions(item) {
    if (item.direction.x === 0 && item.position.x + item.velocity.x + item.newimg.width >= window.innerWidth) {
        item.velocity.x = -item.velocity.x;
        item.direction.x = 1;
        console.log(item.direction.x);
    } else if ( item.direction.x === 1 && item.position.x + item.velocity.x < 0) {
        item.velocity.x = -item.velocity.x;
        item.direction.x = 0;
        console.log(item.direction.x);
    }
    if (item.direction.y === 0 && item.position.y + item.velocity.y + item.newimg.height > window.innerHeight) {
        item.velocity.y = -item.velocity.y;
        item.direction.y = 1;
        console.log(item.direction.y);
    } else if (item.direction.y === 1 && item.position.y + item.velocity.y < 0) {
        item.velocity.y = -item.velocity.y;
        item.direction.y = 0;
        console.log(item.direction.y);
    }
}

function makeOne() {
    pacMen.push(makePac());
}