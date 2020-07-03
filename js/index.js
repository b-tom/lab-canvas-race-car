window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  document.addEventListener('keypress', event => {
    if(event.charCode === 97){
      if(car.x >= 0) car.x -=10 ;
    }
    if(event.charCode === 100){
      if(car.x <= canvas.width - car.width) car.x += 10;
    }
  })

  const car = { 
    image: new Image(),
    height: 150,
    width: 80,
    x: canvas.width / 2 - 40,
    y: canvas.height - 150,
  };
  
  
  const obstacles = [];
  let score = 0;
  
  const createObstacle = () =>{
      let width = 100 + Math.round(Math.random() * 200);
      let x = Math.round(Math.random() * (canvas.width-width));
      if(x+width > canvas.width){
        width -= (canvas.width - x+width);
      }
    
      const obstacle = {
      height: 50,
      width: width,
      x: x,
      y: 0,
    }
    car.image.src = './images/car.png';
    obstacles.push(obstacle);
  };

  setInterval(createObstacle, 3000);

  function startGame() {
    const canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    const background = new Image();
    background.src = './images/road.png';
    
    const checkCol = (obstacle) => {
      if(!(obstacle.x + obstacle.width < car.x || 
        obstacle.x > car.x + car.width || 
        obstacle.y + obstacle.height < car.y ||
        obstacle.y > car.y + car.height
        )){
          score = 0;
        }
    }
    

    const draw = () => {
      score ++;
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      obstacles.forEach((obstacle) => {
        obstacle.y +=2;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        checkCol(obstacle);
        console.log(obstacle)
      })
      ctx.fillText(`score: ${score}`, 50, 50, 150, 100)
      ctx.drawImage(car.image, car.x, car.y, car.width, car.height);

      window.requestAnimationFrame(draw);
    }
    draw();
  }

};