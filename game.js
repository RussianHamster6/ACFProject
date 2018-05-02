
    var player;
    var obstacles;
    var newObs;
    var iterations;
    var randX;
    var score = 0;
    var found;
    var background;
    var randObs;

    var arrObjects = ['rock','mossRock','branch1','branch2','ledge','nest','log']

    var game = new Phaser.Game(576, 576, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    function randomObstacle()
    {
      iterations = Math.floor((Math.random()* 6) + 3);
      console.log(iterations);



      for (i = 0; i < iterations; i++)
      {
        randObs = arrObjects[Math.floor(Math.random()*6)];
        randX = (Math.floor(Math.random()*576) + 1)
        newObs = game.add.sprite(randX, 576, randObs);
        game.physics.arcade.enable(newObs);
        newObs.body.velocity.y = Math.floor(Math.random()*-100) + -120;
        obstacles.add(newObs);
      }
    }

    function preload ()
    {
      this.load.image('background', 'Background.png');
      this.load.image('cadet' , 'Cadet 1.png');
      this.load.image('rock' , 'Rock.png');
      this.load.image('nest' , 'Bird.png');
      this.load.image('branch1' , 'Branch 1.png');
      this.load.image('branch2' , 'Branch 2.png');
      this.load.image('ledge' , 'Ledge.png');
      this.load.image('log' , 'Log.png');
      this.load.image('mossRock' , 'Mossy Rock.png');
    }

    function create ()
    {
      //Starts the physics system by calling the game.physics.startSystem function and parsing it the ARCADE Physics value
      game.physics.startSystem(Phaser.Physics.ARCADE);

      obstacles = game.add.group();

      this.add.image(0,0,'background');

      randomObstacle();
      player = this.add.sprite(288,100, 'cadet');

      game.physics.arcade.enable(player);
      /*obstacles = game.add.group();
      obstacles.add('rock');*/

      player.body.collideWorldBounds = true;

      player.body.velocity.x = 0;

      game.physics.arcade.enable(obstacles);
      obstacles.collideWorldBounds = true;
      obstacles.setAll('body.bounce.x', 1);
      obstacles.setAll('body.bounce.y', 1);
      //obstacles.setALL('body.velocity', 120/*Math.floor((Math.random()* 1000) + 120)*/);

      cursors = game.input.keyboard.createCursorKeys();


    }

    function update ()
    {
      game.world.bringToTop(obstacles);

      found = false;//var collide = game.physics.arcade.collide(player , obsticles);

      if (cursors.left.isDown)
      {
        player.body.velocity.x = -128;
      }
      else if (cursors.right.isDown)
      {
        player.body.velocity.x = 128;
      }
      else if (cursors.down.isDown)
      {
        player.body.velocity.y=0;
      }
      else
      {
        player.body.velocity.x = 0;
      }


      for (var xi = 0; xi < 577; xi++ )
      {
        if (newObs.getBounds().contains(xi, 0) && found != true )
        {
          randomObstacle();
          found = true;
          score++;
          console.log(score);
        }
        if (player.getBounds().contains(xi, 0))
        {
          alert("Game over. Your score was " + score);
        }
      }
      game.physics.arcade.collide(player, obstacles);
      game.physics.arcade.collide(obstacles, obstacles);
    }
