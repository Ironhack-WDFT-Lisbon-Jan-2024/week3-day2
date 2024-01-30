class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    // gameScreen HTML element
    this.gameScreen = gameScreen;

    // Position Values
    this.left = left;
    this.top = top;

    // Player Dimension Values
    this.width = width;
    this.height = height;

    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";

    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.directionX = 0;
    this.directionY = 0;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    // Handle the Right Side of the Screen : Car stops in the Right Border of the Game Screen
    if (this.left + this.width > this.gameScreen.offsetWidth) {
      this.left = this.gameScreen.offsetWidth - this.width;
    }
    // Handle the Left Side of the Screen: Car stops in the Left Border of the Game Screen
    else if (this.left <= 0) {
      this.left = 0;
    }
    // Handle the Bottom Side of the Screen : Car stops in the Bottom Border of the Game Screen
    if (this.top + this.height > this.gameScreen.offsetHeight) {
      this.top = this.gameScreen.offsetHeight - this.height;
    }
    // Handle the Top Side of the Screen : Car stops in the Top Border of the Game Screen
    else if (this.top <= 0) {
      this.top = 0;
    }
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    // If part of my blueCar is inside the redCar, then I have a collision.
    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
