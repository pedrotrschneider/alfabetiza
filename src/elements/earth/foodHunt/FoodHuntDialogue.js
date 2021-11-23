class FoodHuntDialogue extends Object2D
{
    /** @type {String} */
    text1 = "Você conhece alguma árvore que dá tanto frutos diferentes assim?";
    /** @type {String} */
    text2 = " Já ouviu falar na grande árvore do Tamoromu? Converse com sua professora."

    /** @type {Number} */
    bgOpacity = 0;
    /** @type {Number} */
    text1Opacity = 0;
    /** @type {Number} */
    text2Opacity = 0;

    /** @type {Button} */
    continueButton = null;
    /** @type {Tween} */
    tween = null;
    /** @type {Timer} */
    buttonTimer = null;

    _initSignals()
    {
        this.addSignal("dialogueFinished");
    }

    _setup()
    {
        this.setPosition(1920 / 2, 1080 - 300);
        this.continueButton = new Button("Continue", "Continuar")
        this.continueButton.setFontSize(40)
        this.continueButton.setPosition(-this.continueButton.getSize().x / 2, -this.continueButton.getSize().y / 2 + 100);
        this.continueButton.connect("mouseClicked", this, "_onContinueClicked");
        this.continueButton.hide();
        this.addChild(this.continueButton);

        this.tween = new Tween("Tween");
        this.tween.interpolateProperty(this, "bgOpacity", PROPERTY_TYPE.NUMBER, 0, 200, 2, TRANS_TYPE.LINEAR);
        this.tween.interpolateProperty(this, "text1Opacity", PROPERTY_TYPE.NUMBER, 0, 255, 2, TRANS_TYPE.LINEAR);
        this.tween.interpolateProperty(this, "text2Opacity", PROPERTY_TYPE.NUMBER, 0, 255, 2, TRANS_TYPE.LINEAR, EASE_TYPE.IN, 3);
        this.addChild(this.tween);

        this.buttonTimer = new Timer("ButtonTimer");
        this.buttonTimer.connect("timeout", this, "_onTimerTimeout");
        this.addChild(this.buttonTimer);
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.noStroke();
        db.fill(0, this.bgOpacity);
        db.rectMode(CENTER);
        db.rect(0, 0, 1800, 400, 40, 40);
        db.textAlign(CENTER, CENTER);
        db.fill(255, this.text1Opacity);
        db.textSize(40);
        db.text(this.text1, 0, -100);
        db.fill(255, this.text2Opacity);
        db.text(this.text2, 0, 0);
    }

    _initDialogue()
    {
        this.tween.startAll();
        this.buttonTimer.start(5);
    }

    _onTimerTimeout()
    {
        this.continueButton.show();
    }

    _onContinueClicked()
    {
        this.continueButton.hide();
        this.emitSignal("dialogueFinished");
    }
}