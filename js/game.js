class Game {
  constructor() {
    // Get all Game Screens.
    // gameScreen and gameEndScreen are initially not displayed.
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");

    // I am going to create a player in the future. For this moment of the code-along, I'll leave it to null.
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/car.png"
    );

    // Style for the Game Board
    this.height = 600;
    this.width = 500;

    // Obstacles
    this.obstacles = [];

    // Score
    this.score = 0;

    // Lives
    this.lives = 3;

    // Variable to Check If I'm in the Process of Creating an Obstacle
    this.isPushingObstacle = false;

    // Variable to Check if the Game is Over
    this.gameIsOver = false;

    this.soundtrack = null;
  }

  start() {
    //Sets the height and width of the game screen.
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    //Hides the start screen.
    this.startScreen.style.display = "none";

    //Shows the game screen.
    this.gameScreen.style.display = "block";

    this.soundtrack = document.getElementById('soundtrack');

    this.soundtrack.play();

    //Starts the game loop
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    /* Score, Lives ScoreBoard */
    let score = document.getElementById("score");
    let lives = document.getElementById("lives");

    /* Every Frame of the Game, I want to check if the car is moving */
    this.player.move();

    // Iterate over the obstacles array and make them move
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();

        this.obstacles.splice(i, 1);

        this.lives--;
      } else if (obstacle.top > this.height) {
        this.score++;

        // Remove the Obstacle HTML Element from the HTML.
        obstacle.element.remove();

        // Remove the Obstacle from the Game Class'obstacles array.
        this.obstacles.splice(i, 1);
      }
    }

    if (this.lives === 0) {
      this.endGame();
    }

    // If there are no obstacles, push a new one after 1second and half.
    else if (!this.obstacles.length && !this.isPushingObstacle) {
      this.isPushingObstacle = true;
      setTimeout(() => {
        this.obstacles.push(new Obstacle(this.gameScreen));
        this.isPushingObstacle = false;
      }, 1500);
    }

    score.innerHTML = this.score;
    lives.innerHTML = this.lives;
  }

  endGame() {
    // Change the gameIsOver status. If it's true, remember that this is going to break the animation loop.
    this.gameIsOver = true;

    // Remove Player from the HTML
    this.player.element.remove();

    // Remove all Obstacles
    this.obstacles.forEach((obstacle, index) => {
      // Remove the Obstacle from JS
      this.obstacles.splice(index, 1);

      // Remove the Obstacle from HTML
      obstacle.element.remove();
    });

    // Hide the Current Game Screen...
    this.gameScreen.style.display = "none";

    // In order, to display the Game End Screen.
    this.gameEndScreen.style.display = "block";

    const highestScore = localStorage.getItem("highestScore");

    if(highestScore && this.score > highestScore){
      localStorage.setItem("highestScore", this.score);
    }
  }
}