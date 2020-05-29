class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1,car2,car3,car4];
  
  }

  play(){
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //index of the array
      var index = 0;
      //x and y for position of the cars
      var x = 0,y;

      //var display_position = 130;
      for(var plr in allPlayers){
        index = index + 1;
       //car will be away from each other at a distance of 200 at the x axis
        x = x + 200;
        //get the data from database to place the car in y direction
        y = displayHeight - allPlayers[plr].distance;
        
        //for player p1 the index is 1 but cars is an array which starts with a 0 hence index - 1 is used here
        //p1 = cars[0] since car 1 is the first elment inside cars array 
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        /*if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");*/
          if(index === player.index)
          {//display the current car in red color
cars[index-1].shapeColor = "red";
//evry game has a camera which can change to show the game from different angles
camera.position.x = displayWidth/2;
camera.position.y = cars[index - 1].y;
          }

        /*display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)*/
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance += 10;
      player.update();
    }
    drawSprites();
  }
}
