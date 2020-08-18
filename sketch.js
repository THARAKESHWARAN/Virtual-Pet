var dogImg, happyDog;
var dog;
var database, Foodref
var foodStock = 0;
var state;
var time;
var hour;
var y = 0;

function preload() {
  dogImg = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}


function setup() {
  createCanvas(500, 500);

  dog = new Dog();

  Database();

  hour = hour();

  if (hour % 2 === 0) {
    y++;
  };

}



function draw() {

  background(46, 139, 87);

  textSize(20);
  stroke(255, 255, 255);
  strokeWeight(2);

  if (foodStock < 0) {
    foodStock = 0;
  }else if(foodStock === 0){
    foodStock = 0;
  }
  
  drawSprites();
  dog.display();

  if (dog.state === "hungry") {
    text("You can Feed Your Dog Pressing Up-arrow!", 50, 470);
  }

  if (dog.state === "happy") {
    text("If you need to get food, come back at even hours!", 30, 470);
  }

  text("Food available: " + foodStock, 50, 50);

}

async function Database() {
  database = firebase.database();

  Foodref = await database.ref("food");
  Foodref.on("value", (data) => {
    var read = data.val();
    foodStock = read + y;
  });

}

function updateStock(x) {
  database.ref("/").set({
    food: x
  });
}

function keyPressed() {
  if (keyCode === 38 && dog.state === "hungry") {
    foodStock = foodStock - 1;
    dog.state = "happy";
    updateStock(foodStock);
  }
}




