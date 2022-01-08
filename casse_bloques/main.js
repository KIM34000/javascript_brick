var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 5; //남은 생명 수
var bricks = [];
var ballColor = "#0095DD";

for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  }
  else if (e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  }
  else if (e.keyCode == 37) {
    leftPressed = false;
  }
}
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
 // if (relativeX > 0 && relativeX < canvas.width) {
  if (relativeX > (0 + (paddleWidth / 2)) && relativeX < (canvas.width - paddleWidth / 2)) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          ballColor = getRandomColor();
          dy = -dy;
          b.status = 0;
          //score each one point
          // score ++;
          //score each 5 points
          score = score + 5;
          if (score == brickRowCount * brickColumnCount * 5) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();
  drawLives();


  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    ballColor = getRandomColor();
    dx = -dx;
  }
  if (y + dy < ballRadius) {

    dy = -dy;
  }
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      ballColor = getRandomColor();
      dy = -dy;
    }
    else {
    lives--;
    if (!lives) {
      alert("GAME OVER "+ " YOU GOT A SCORE OF " + score);
      document.location.reload();
      // clearInterval(interval); // Needed for Chrome to end game
    }
    else {
      x = canvas.width / 2;
      y = canvas.height - 30;
      dx = 3;
      dy = -3;
      paddleX = (canvas.width - paddleWidth) / 2;
    }
  }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}
//change the color of ball
function getRandomColor() {
  var letters = 'ABCDE'.split('');
  var color = '#';
  for (var i = 0; i < 3; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

draw();

//squere
// ctx.beginPath();
// ctx.rect(50, 80, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();
// //circle
// ctx.beginPath();
// ctx.arc(250, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();
// //outline
// ctx.beginPath();
// ctx.rect(160, 30, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();

// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");
// var ballRadius = 10;
// var x = canvas.width/2;
// var y = canvas.height-30;
// var dx = 2;
// var dy = -2;
// var paddleHeight = 10;
// var paddleWidth = 75;
// var paddleX = (canvas.width-paddleWidth)/2;
// var rightPressed = false;
// var leftPressed = false;
// var speed = 20;
// var brickRowCount = 3;
// var brickColumnCount = 5;
// var brickWidth = 75;
// var brickHeight = 20;
// var brickPadding = 10;
// var brickOffsetTop = 30;
// var brickOffsetLeft = 30;


// var bricks = [];
// for(var c=0; c<brickColumnCount; c++) {
//     bricks[c] = [];
//     for(var r=0; r<brickRowCount; r++) {
//         bricks[c][r] = { x: 0, y: 0 };
//     }
// }

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

// function keyDownHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = true;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = true;
//     }
// }

// function keyUpHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = false;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = false;
//     }
// }

// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }
// function drawPaddle() {
//     ctx.beginPath();
//     ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }
// function drawBricks() {
//     for(var c=0; c<brickColumnCount; c++) {
//         for(var r=0; r<brickRowCount; r++) {
//             var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
//             var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
//             bricks[c][r].x = brickX;
//             bricks[c][r].y = brickY;
//             ctx.beginPath();
//             ctx.rect(brickX, brickY, brickWidth, brickHeight);
//             ctx.fillStyle = "#0095DD";
//             ctx.fill();
//             ctx.closePath();
//         }
//     }
// }
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//     drawPaddle();

//     if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//     }
//     if(y + dy < ballRadius) {
//         dy = -dy;
//     }
//     else if(y + dy > canvas.height-ballRadius) {
//         if(x > paddleX && x < paddleX + paddleWidth) {
//             dy = -dy;
//             //spped when hit peddle
//             clearInterval(interval);
//             speed = speed-19;
//             interval = setInterval(draw, speed);
//         }
//         else {
//             alert("GAME OVER");
//             document.location.reload();
//             clearInterval(interval); // Needed for Chrome to end game
//         }
//     }

//     if(rightPressed && paddleX < canvas.width-paddleWidth) {
//         paddleX += 7;
//     }
//     else if(leftPressed && paddleX > 0) {
//         paddleX -= 7;
//     }

//     x += dx;
//     y += dy;
// }

// var interval = setInterval(draw, speed);



// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();

//     if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//         ctx.fillStyle = getRandomColor();
//         dx = -dx;
//     }
//     if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
//         ctx.fillStyle = getRandomColor();
//         dy = -dy;
//     }

//     x += dx;
//     y += dy;
// }
// function getRandomColor() {    
//         var letters = 'ABCDE'.split('');
//         var color = '#';
//         for (var i = 0; i < 3; i++) {
//             color += letters[Math.floor(Math.random() * letters.length)];
//         }
//         return color;
//     }

//exaple for change the color of ball--------------------------------------------------------------------
// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");
// var ballRadius = 10;
// var x = canvas.width/2;
// var y = canvas.height-30;
// var dx = 2;
// var dy = -2;
// ctx.fillStyle = "#0095DD";
// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI*2);

//     ctx.fill();
//     ctx.closePath();
// }

// function draw() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       drawBall();

//       if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//           ctx.fillStyle = getRandomColor();
//           dx = -dx;
//       }
//       if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
//           ctx.fillStyle = getRandomColor();
//           dy = -dy;
//       }

//       x += dx;
//       y += dy;
//   }
//   function getRandomColor() {    
//           var letters = 'ABCDE'.split('');
//           var color = '#';
//           for (var i = 0; i < 3; i++) {
//               color += letters[Math.floor(Math.random() * letters.length)];
//           }
//           return color;
//       }

// setInterval(draw, 10);