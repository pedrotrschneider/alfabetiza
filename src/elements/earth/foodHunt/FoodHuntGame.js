class FoodHuntGame extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {Button} */
        this.backButton = null;
    
        /** @type {FoodHuntPlayer} */
        this.player = null;
        /** @type {FoodHuntTree} */
        this.tree = null;
        /** @type {Object2D} */
        this.fruits = null;
        /** @type {FoodHuntBasket} */
        this.basket = null;
        /** @type {FoodHuntDialogue} */
        this.dialogue = null;
    
        /** @type {Timer} */
        this.initialTimer = null;
        /** @type {Timer} */
        this.gameTimer = null;
        /** @type {Timer} */
        this.fruitsTimer = null;
        /** @type {Timer} */
        this.endGameTimer = null;
    
        /** @type {Boolean} */
        this.gameStarted = false;
        /** @type {Boolean} */
        this.gameEnded = false;
    
        /** @type {Number} */
        this.points = 0;
    }

    _setup()
    {
        this.drawOnTopOfChildren = true;

        // Create back button
        this.backButton = new Button("BackButton");
        this.backButton.setLabel("Voltar");
        this.backButton.setFontSize(30);
        this.backButton.setPosition(20, 20);
        this.backButton.setSize(110, 75);
        this.backButton.connect("mouseClicked", this, "_onBackClicked");
        this.addChild(this.backButton);

        this.tree = new FoodHuntTree("Tree");
        this.addChild(this.tree);

        this.player = new FoodHuntPlayer("Player");
        this.player.updatePaused = true;
        this.addChild(this.player);

        this.fruits = new Object2D("Fruits");
        this.fruits.setPosition(1920 / 2, -100);
        this.addChild(this.fruits);

        this.basket = new FoodHuntBasket("Basket");
        this.basket.player = this.player;
        this.addChild(this.basket);

        this.dialogue = new FoodHuntDialogue("Dialogue");
        this.dialogue.connect("dialogueFinished", this, "_onDialogueFinished");
        this.addChild(this.dialogue);

        this.initialTimer = new Timer("InitialTimer", 4, true, true);
        this.initialTimer.connect("timeout", this, "_onInitialTimerTimeout");
        this.addChild(this.initialTimer);

        this.gameTimer = new Timer("GameTimer", 60, false, true);
        this.gameTimer.connect("timeout", this, "_onGameTimerTimeout");
        this.addChild(this.gameTimer);

        this.fruitsTimer = new Timer("FruitsTimer", 1, false, true);
        this.fruitsTimer.connect("timeout", this, "_onFruitsTimerTimeout");
        this.addChild(this.fruitsTimer);

        this.endGameTimer = new Timer("EndGametimer", 1, false, true);
        this.endGameTimer.connect("timeout", this, "_onEndGameTimerTimeout");
        this.addChild(this.endGameTimer);
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        background(52);

        if (!this.gameStarted)
        {
            db.textAlign(CENTER, CENTER);
            db.fill(255);
            db.textSize(200);
            var tl = int(this.initialTimer.timeLeft - 0.00001);
            if (tl >= 1)
                db.text(`${tl}`, 1920 / 2, 200);
            else
            {
                db.textSize(100);
                db.text(`Começar!`, 1920 / 2, 200);
            }

        }
        db.textAlign(RIGHT, TOP);
        db.fill(255);
        db.textSize(50);

        if (!this.gameEnded)
            db.text(`t: ${int(this.gameTimer.timeLeft - 0.0001 + 1)}`, 1920 - 10, 10);
        else
            db.text(`t: 0`, 1920 - 10, 10);
        db.text(`p: ${this.points}`, 1920 - 10, 60);
    }

    _onBackClicked()
    {
        var ems = new EarthMinigameSelector("EarthMiniGameSelector");
        GameHandler.addRootObject(ems);
        this.queueFree();
    }

    _onInitialTimerTimeout()
    {
        this.gameStarted = true;
        this.player.updatePaused = false;
        this.gameTimer.start();
        this.fruitsTimer.start();
    }

    _onFruitsTimerTimeout()
    {
        var newFruit = new FoodHuntFruit("Fruit");
        newFruit.position.x = random(-550, 550);
        newFruit.basket = this.basket;
        newFruit.connect("collected", this, "_onFruitCollected");
        this.fruits.addChild(newFruit);
        this.fruitsTimer.start(random(3, 4));
    }

    _onFruitCollected()
    {
        this.points += 3;
    }

    _onGameTimerTimeout()
    {
        this.gameEnded = true;
        this.fruitsTimer.stop();
        this.endGameTimer.start(2);
    }

    _onEndGameTimerTimeout()
    {
        this.player.updatePaused = true;
        this.player.direction = 0;
        this.dialogue._initDialogue();
    }

    _onDialogueFinished()
    {
        var ems = new EarthMinigameSelector("EarthMinigameSelector");
        GameHandler.addRootObject(ems);
        this.queueFree();
    }
}