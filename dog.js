class Dog {

    constructor() {
        this.body = createSprite(width - 150, height / 2, 0, 0);
        this.body.addImage("dog", dogImg);
        this.body.addImage("happyDog", happyDog);
        this.body.scale = 0.5;
        this.state = "hungry";
    }

    display() {
        if (this.state === "hungry") {
            text("Feed Your Dog, IT'S HUNGRY!", 100, 440);
            this.body.changeImage("dog");
        }

        if (this.state === "happy") {
            this.body.scale = 0.6;
            this.body.x = width - 200;
            this.body.changeImage("happyDog");
            text("Your Dog Is Happy!", 150, 440);
        }
    }
}
