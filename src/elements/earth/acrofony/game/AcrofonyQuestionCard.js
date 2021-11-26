class AcrofonyQuestionCard extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {TextureRes} */
        this.thumb = null;
        /** @type {String} */
        this.imgName = "";

        /** @type {Color} */
        this.fillColor = new Color(200, 200, 200);
        /** @type {Tween} */
        this.tween = null;
    }

    _setup()
    {
        var sprite = new Sprite2D("sprite", this.thumb);
        sprite.width = 250;
        sprite.height = 250;
        sprite.setPosition(0, -75);
        this.addChild(sprite);
        this.scale = Vector2.ZERO();

        this.tween = new Tween("Tween");
        this.tween.interpolateProperty(this, "scale", PROPERTY_TYPE.VECTOR2, Vector2.ZERO(), Vector2.ONE(), 2, TRANS_TYPE.ELASTIC, EASE_TYPE.OUT);
        this.addChild(this.tween);
    }

    _update( /** @type {Number} */ delta)
    {
        if (this.visible) this.tween.startAll();
    }

    _draw( /** @type {Number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.strokeWeight(10);
        db.rectMode(CENTER);
        db.fill(this.fillColor.getP5Color());
        db.rect(0, 0, 300, 400, 10, 10);
        db.textAlign(CENTER, CENTER);
        db.fill(0);
        db.textSize(40);
        db.text(this.imgName, 0, 100);
    }
}