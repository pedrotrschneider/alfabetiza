class FoodHuntFruit extends Object2D
{
    /** @type {Number} */
    G = 10;

    /** @type {FoodHuntBasket} */
    basket = null;
    /** @type {Color} */
    color = new Color(0, 0, 0);
    /** @type {Number} */
    r = 50;
    /** @type {Number} */
    fallVel = 0;
    /** @type {Boolean} */
    collected = false;

    _initSignals()
    {
        this.addSignal("collected");
    }

    _setup()
    {
        this.color.r = random(0, 255);
        this.color.g = random(0, 255);
        this.color.b = random(0, 255);
    }

    _update( /** @type {Number} */ delta)
    {
        this.fallVel += this.G;
        this.position.y += this.fallVel * delta;

        if (!this.collected && this.globalPosition.y >= 825 && this.globalPosition.y <= 850)
        {
            if (this.globalPosition.x <= this.basket.globalPosition.x + 55 && this.globalPosition.x >= this.basket.globalPosition.x - 55)
                this.collected = true;
        }
        else if (this.collected && this.position.y >= 900)
            this.onFruitCollected();
        else if (this.position.y >= 1200)
            this.queueFree();
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.fill(this.color.getP5Color());
        db.ellipse(0, 0, this.r);
    }

    onFruitCollected()
    {
        this.queueFree();
        this.emitSignal("collected");
    }
}