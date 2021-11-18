class RebusQuestionCard extends Object2D
{
    thumb = null;
    imgName = "";

    fillColor = new Color(200, 200, 200);

    _setup()
    {
        var sprite = new Sprite2D("sprite", this.thumb);
        sprite.width = 250;
        sprite.height = 250;
        sprite.setPosition(0, -75);
        this.addChild(sprite);
    }

    _draw(delta, db)
    {
        db.rectMode(CENTER);
        db.fill(this.fillColor.getP5Color());
        db.rect(0, 0, 300, 400, 10, 10);
        db.textAlign(CENTER, CENTER);
        db.fill(0);
        db.textSize(40);
        db.text(this.imgName, 0, 100);
    }
}

class RebusOptionCard extends RebusQuestionCard
{
    isAnswer = false;

    mouseOver = false;
    mousePress = false;

    _setup()
    {
        var sprite = new Sprite2D("sprite", this.thumb);
        sprite.width = 250;
        sprite.height = 250;
        sprite.setPosition(0, -75);
        this.addChild(sprite);

        var area = new Area2D("area", SHAPES.RECT, new Rect(300, 400), true);
        area.connect("mouseEntered", this, "_onMouseEntered");
        area.connect("mouseExited", this, "_onMouseExited");
        this.addChild(area);
    }

    _update(delta)
    {
        if (this.mouseOver)
        {
            if (InputHandler.mouseIsClicked)
            {
                console.log("selected");
            }

            if (InputHandler.mouseIsPressed)
            {
                this.scale.x = max(this.scale.x - 3.0 * delta, 0.95);
                this.scale.y = max(this.scale.y - 3.0 * delta, 0.95);
            }
            else
            {
                this.scale.x = min(this.scale.x + 2.0 * delta, 1.1);
                this.scale.y = min(this.scale.y + 2.0 * delta, 1.1);
            }
        }

        else
        {
            this.scale.x = max(this.scale.x - 2.0 * delta, 1);
            this.scale.y = max(this.scale.y - 2.0 * delta, 1);
        }
    }

    _onMouseEntered()
    {
        this.mouseOver = true;
    }

    _onMouseExited()
    {
        this.mouseOver = false;
    }
}

class RebusGame extends Object2D
{
    levelData = null;

    _setup()
    {
        for (let i = 0; i < this.levelData.optionCards.length; i++)
        {
            var newCard = new RebusOptionCard("OptionCard" + i);
            AssetHandler.loadTexture(this.levelData.optionCards[i].name, this.levelData.optionCards[i].path);
            newCard.thumb = AssetHandler.getTextureByName(this.levelData.optionCards[i].name);
            newCard.imgName = this.levelData.optionCards[i].name;
            newCard.setPosition((i + 1) * (1920 / 4), 3 * (1080 / 4));
            this.addChild(newCard)
        }

        for (let i = 0; i < this.levelData.questionCards.length; i++)
        {
            var newCard = new RebusQuestionCard("OptionCard" + i);
            AssetHandler.loadTexture(this.levelData.questionCards[i].name, this.levelData.questionCards[i].path);
            newCard.thumb = AssetHandler.getTextureByName(this.levelData.questionCards[i].name);
            newCard.imgName = this.levelData.questionCards[i].name;
            newCard.setPosition((i + 1) * (1920 / (this.levelData.questionCards.length + 1)), 1080 / 4);
            this.addChild(newCard)
        }
    }

    _draw(delta, db)
    {
        background(52);
    }
}