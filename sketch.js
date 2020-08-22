var dogImg, happyDog;
var dog;
var database, Foodref
var foodStock = 0;
var time;
var hour;
var y = 0;
var LastFed = null;
var lastAdd = "no";
var i;

function preload() {
  dogImg = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}


function setup() {
  createCanvas(500, 500);

  dog = new Dog();

  dog.state = "hungry";

  Database();

}



function draw() {

  background(46, 139, 87);

  textSize(20);
  stroke(255, 255, 255);
  strokeWeight(2);

  if (foodStock < 0) {
    foodStock = 0;
  } else if (foodStock > 20) {
    foodStock = 20;
  }

  var minut = minute();

  if (dog.state === "happy") {
    if (LastFed + 2 === minut) {
      dog.state = "hungry";
      lastAdd = "no";
    }
  } else {

  }

  drawSprites();

  if (lastAdd === "no" && foodStock !== 0) {
    addFood();
  }

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
    foodStock = data.val();
    updateStock(foodStock);
  });

}

function updateStock(x) {
  database.ref("/").update({
    food: x
  });
}

function keyPressed() {
  if (keyCode === 38 && dog.state === "hungry") {
    foodStock = foodStock - 1;
    dog.state = "happy";
    lastFed();
    updateStock(foodStock);
  }
}

function addFood() {
  var hr = hour();

  if (hr % 2 === 0) {
    y++
    foodStock = foodStock + y;
  }

  updateStock(foodStock);

  lastAdd = "yes";

}

function lastFed() {
  var min = minute();
  LastFed = min;
}




