class RebusLevelButton extends Button
{
    levelData = null;

    _initSignals()
    {
        this.addSignal("levelSelected");
    }

    _setup()
    {

    }

    _onMouseClicked()
    {
        this.emitSignal("levelSelected", this.levelData);
    }
}

class RebusLevelSelector extends Object2D
{
    gridMargins = {
        left: 0,
        right: 0,
        up: 500,
        down: 0
    };

    gridCols = 5;

    _setup()
    {
        var b = new RebusLevelButton("Tutorial");
        b.levelData = REBUS_LEVELS.tutorial;
        b.setLabel("Tutorial");
        b.setFontSize(40);
        this.addChild(b);
        b.setSize(200, 100);
        b.setPosition((1920 - b.getSize().x) / 2, 300);
        b.connect("levelSelected", this, "_onLevelSelected");

        var i = 1;
        while (REBUS_LEVELS[`level${i}`])
        {
            var b = new RebusLevelButton(`level${i}`);
            b.levelData = REBUS_LEVELS[`level${i}`];
            b.setLabel(`${i}`);
            b.setFontSize(40);
            this.addChild(b);
            b.setSize(100, 100);
            b.setPosition((((i - 1) % this.gridCols) + 1) * 1920 / (this.gridCols + 1) - b.getSize().x / 2, this.gridMargins.up + 200 * int((i - 1) / this.gridCols));
            b.connect("levelSelected", this, "_onLevelSelected");
            i++;
        }

        this.backButton = new Button("BackButton");
        this.backButton.setLabel("Voltar");
        this.backButton.setFontSize(30);
        this.backButton.setPosition(20, 20);
        this.backButton.setSize(110, 75);
        this.backButton.connect("mouseClicked", this, "_onBackClicked");
        this.addChild(this.backButton);
    }

    _draw(delta, db)
    {
        background(52);

        db.textAlign(CENTER, CENTER);
        db.fill(255);
        db.textSize(100);
        db.text("RÉBUS", 1920 / 2, 125);
        db.textSize(40);
        db.text("Escolha o nível", 1920 / 2, 200);
    }

    _onLevelSelected(levelData)
    {
        var rg = new RebusGame("RebusGame");
        rg.levelData = levelData;
        GameHandler.addRootObject(rg);
        this.queueFree();
    }

    _onBackClicked()
    {

    }
}