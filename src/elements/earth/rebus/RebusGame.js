class RebusGame extends Object2D
{
    levelData = null;
    gameFinished = false;
    points = 3;

    backButton = null;
    continueButton = null;
    timer = null;

    _setup()
    {
        var arr = [];
        for (let i = 0; i < this.levelData.optionCards.length; i++)
            arr.push(i);
        arr = shuffle(arr);

        for (let i = 0; i < this.levelData.optionCards.length; i++)
        {
            var j = arr[i];
            var newCard = new RebusOptionCard("OptionCard" + j);
            AssetHandler.loadTexture(this.levelData.optionCards[j].name, this.levelData.optionCards[j].path);
            newCard.thumb = AssetHandler.getTextureByName(this.levelData.optionCards[j].name);
            newCard.imgName = this.levelData.optionCards[j].name;
            newCard.isAnswer = this.levelData.optionCards[j].answer;
            newCard.setPosition((i + 1) * (1920 / 4), 3 * (1080 / 4));
            newCard.connect("selected", this, "_onCardSelected");
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

        this.addChild(new RebusGameVisualEffects("GameVisualEffects"));

        this.backButton = new Button("BackButton");
        this.backButton.setLabel("Voltar");
        this.backButton.setFontSize(30);
        this.backButton.setPosition(20, 20);
        this.backButton.setSize(110, 75);
        this.backButton.connect("mouseClicked", this, "_onBackClicked");
        this.addChild(this.backButton);

        this.continueButton = new Button("ContinueButton");
        this.continueButton.setLabel("Continuar");
        this.continueButton.setFontSize(40);
        this.continueButton.setPosition((1920 - this.continueButton.getSize().x) / 2, 1080 - 450);
        this.continueButton.hide();
        this.continueButton.connect("mouseClicked", this, "_onContinueClicked");
        this.addChild(this.continueButton);

        this.timer = new Timer("Timer", 2, false, true);
        this.timer.connect("timeout", this, "_onTimerTimeout");
        this.addChild(this.timer);
    }

    _draw(delta, db)
    {
        background(52);
    }

    returnToMenu()
    {
        AssetHandler.clearTextureCache();
        GameHandler.addRootObject(new RebusLevelSelector("LevelSelector"));
        this.queueFree();
    }

    _onCardSelected(isAnswer)
    {
        if (!isAnswer)
            this.points--;
        else
        {
            this.gameFinished = true;
            this.backButton.hide();
            this.timer.start();
            for (let i = 0; i < this.children.length; i++)
            {
                if (this.children[i] instanceof RebusOptionCard)
                    this.children[i].selectable = false;
            }
        }
    }

    _onBackClicked()
    {
        this.returnToMenu();
    }

    _onContinueClicked()
    {
        this.returnToMenu();
    }

    _onTimerTimeout()
    {
        this.continueButton.show();
    }
}