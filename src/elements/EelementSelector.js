class EelementSelector extends Object2D
{
    /** @type {Button} */
    backButton = null;
    /** @type {Button} */
    earthButton = null;
    /** @type {Button} */
    waterButton = null;
    /** @type {Button} */
    fireButton = null;
    /** @type {Button} */
    airButton = null;

    _setup()
    {
        this.backButton = new Button("BackButton");
        this.backButton.setLabel("Voltar");
        this.backButton.setFontSize(30);
        this.backButton.setPosition(20, 20);
        this.backButton.setSize(110, 75);
        this.backButton.connect("mouseClicked", this, "_onBackClicked");
        this.addChild(this.backButton);

        var buttonSize = new Vector2(1920 / 4, 1080 / 4);
        var buttonPosition = new Vector2(1920 / 2, 1080 / 2 + 100);
        var buttonMargin = new Vector2(50, 50);
        var buttonFontSize = 50;

        this.earthButton = new Button("EarthButton", "Terra");
        this.earthButton.setFontSize(buttonFontSize);
        this.earthButton.setSize(buttonSize.x - buttonMargin.x, buttonSize.y - buttonMargin.y);
        this.earthButton.setPosition(buttonPosition.x - buttonSize.x, buttonPosition.y - buttonSize.y);
        this.earthButton.connect("mouseClicked", this, "_onEarthButtonClicked");
        this.addChild(this.earthButton);

        this.waterButton = new Button("WaterButton", "Água");
        this.waterButton.setFontSize(buttonFontSize);
        this.waterButton.setSize(buttonSize.x - buttonMargin.x, buttonSize.y - buttonMargin.y);
        this.waterButton.setPosition(buttonPosition.x, buttonPosition.y - buttonSize.y);
        this.waterButton.connect("mouseClicked", this, "_onWaterButtonClicked");
        this.addChild(this.waterButton);

        this.fireButton = new Button("FireButton", "Fogo");
        this.fireButton.setFontSize(buttonFontSize);
        this.fireButton.setSize(buttonSize.x - buttonMargin.x, buttonSize.y - buttonMargin.y);
        this.fireButton.setPosition(buttonPosition.x - buttonSize.x, buttonPosition.y);
        this.fireButton.connect("mouseClicked", this, "_onFireButtonClicked");
        this.addChild(this.fireButton);

        this.airButton = new Button("AirButton", "Ar");
        this.airButton.setFontSize(buttonFontSize);
        this.airButton.setSize(buttonSize.x - buttonMargin.x, buttonSize.y - buttonMargin.y);
        this.airButton.setPosition(buttonPosition.x, buttonPosition.y);
        this.airButton.connect("mouseClicked", this, "_onAirButtonClicked");
        this.addChild(this.airButton);
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        background(52);

        db.textAlign(CENTER, CENTER);
        db.fill(255);
        db.textSize(100);
        db.text("ESCOLHA O ELEMENTO", 1920 / 2, 175);
    }

    _onBackClicked()
    {
        console.log("Back");
    }

    _onEarthButtonClicked()
    {
        var ems = new EarthMinigameSelector("EarthMinigameSelector");
        GameHandler.addRootObject(ems);
        this.queueFree();
    }

    _onWaterButtonClicked()
    {
        console.log("Water element has been selected");
    }

    _onFireButtonClicked()
    {
        console.log("Fire element has been selected");
    }

    _onAirButtonClicked()
    {
        console.log("Air element has been selected");
    }
}