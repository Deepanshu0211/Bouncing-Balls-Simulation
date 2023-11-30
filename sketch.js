const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world, ground, balls;

function setup() {
  createCanvas(800, 400);
  engine = Engine.create();
  world = engine.world;

  var ground_options = {
    isStatic: true,
  };
  ground = Bodies.rectangle(400, 390, 800, 20, ground_options);
  World.add(world, ground);

  balls = [];
  for (let i = 0; i < 10; i++) {
    var ball_options = {
      restitution: 1,
    };
    var x = random(50, 750);
    var y = random(0, 200);
    var ball = Bodies.circle(x, y, 20, ball_options);
    balls.push(ball);
    World.add(world, ball);
  }
}

function draw() {
  background(0);
  Engine.update(engine);

  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, 800, 20);
  ellipseMode(RADIUS);

  for (let i = 0; i < balls.length; i++) {
    fill(random(0, 255), random(0, 255), random(0, 255));
    ellipse(balls[i].position.x, balls[i].position.y, 20, 20);

    // Bounce off the edges
    if (
      balls[i].position.x + 20 >= width ||
      balls[i].position.x - 20 <= 0
    ) {
      balls[i].velocity.x *= -1;
    }

    // Bounce off the top and bottom edges
    if (
      balls[i].position.y + 20 >= height ||
      balls[i].position.y - 20 <= 0
    ) {
      balls[i].velocity.y *= -1;
    }
  }

  drawSprites();
}
