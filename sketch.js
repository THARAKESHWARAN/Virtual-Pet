var dogImg, happyDog;
var dog;
var database, Foodref
var Food = 0;
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
  }

}


function draw() {

  background(46, 139, 87);

  textSize(20);
  stroke(255, 255, 255);
  strokeWeight(2);

  if (Food < 0) {
    Food = 0;
  }else if(Food > 19){
    Food = 20;
  }

  execution();

  if (dog.state === "hungry"){ 
    text("You can Feed Your Dog Pressing Up-arrow!", 50, 470);
  }

  if (dog.state === "happy") {
    text("If you need to get food, come exacty at even times!", 30, 470);
  }

  if (Food > -1) {
    text("Food available: " + Food, 50, 50);
  }

}

async function Database() {
  database = firebase.database();

  Foodref = await database.ref("food");
  Foodref.on("value", (data) => {
    var read = data.val();
    Food = read;
  });

}

function updateStock(x) {
  x = Food+y;
  if (Food) {
    database.ref("/").set({
      food: x
    });
  }
}

async function FetchTime() {

  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJson = await response.json();

  var dateTime = responseJson.datetime;
  hour = dateTime.slice(11, 19);

}

function keyPressed() {
  if (keyCode === 38 && dog.state === "hungry") {
    Food = Food - 1;
    dog.stomach = dog.stomach + 1;
    dog.state = "happy";
  }
}

function execution() {
  drawSprites();
  dog.display();
  updateStock();
  FetchTime();
}




