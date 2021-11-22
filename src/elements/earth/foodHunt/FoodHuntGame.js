class FoodHuntGame extends Object2D
{
    /** @type {Button} */
    backButton = null;

    /** @type {FoodHuntPlayer} */
    player = null;
    /** @type {FoodHuntTree} */
    tree = null;
    /** @type {Object2D} */
    fruits = null;

    /** @type {Timer} */
    initialTimer = null;
    /** @type {Timer} */
    gameTimer = null;
    /** @type {Timer} */
    fruitsTimer = null;

    /** @type {Boolean} */
    gameStarted = false;
    /** @type {Boolean} */
    gameEnded = false;

    _setup()
    {
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

        this.fruits = new Object2D("Fruits");
        this.addChild(this.fruits);

        this.player = new FoodHuntPlayer("Player");
        this.player.updatePaused = true;
        this.addChild(this.player);

        this.initialTimer = new Timer("InitialTimer", 4, true, true);
        this.initialTimer.connect("timeout", this, "_onInitialTimerTimeout");
        this.addChild(this.initialTimer);

        this.gameTimer = new Timer("GameTimer", 60, false, true);
        this.gameTimer.connect("timeout", this, "_onGameTimerTimeout");
        this.addChild(this.gameTimer);

        this.fruitsTimer = new Timer("FruitsTimer", 1, false, true);
        this.fruitsTimer.connect("timeout", this, "_onFruitsTimerTimeout");
        this.addChild(this.fruitsTimer);
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
        else if (!this.gameEnded)
        {
            db.textAlign(RIGHT, TOP);
            db.fill(255);
            db.textSize(75);
            db.text(`${int(this.gameTimer.timeLeft - 0.0001 + 1)}`, 1920 - 10, 0 + 10);
        }
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
        console.log("start");
    }

    _onFruitsTimerTimeout()
    {
        console.log("fruit fell");
        this.fruitsTimer.start(random(3, 4));
    }

    _onGameTimerTimeout()
    {
        this.gameEnded = true;
        console.log("game ended");
    }
}