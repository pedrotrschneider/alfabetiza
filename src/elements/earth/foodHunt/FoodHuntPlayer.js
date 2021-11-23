class FoodHuntPlayer extends Object2D
{
    /** @type {Number} */
    direction = 0;

    _setup()
    {
        this.setPosition(1920 / 2, 1080 - 200);
    }

    _update( /** @type {Number} */ delta)
    {
        this.direction = 0;
        if (keyIsDown(LEFT_ARROW)) this.direction -= 1;
        if (keyIsDown(RIGHT_ARROW)) this.direction += 1;
    }

    _draw( /** @type {Number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.rectMode(CENTER);
        db.rect(0, 0, 100, 200);

        this.position.x += 400 * this.direction * delta;
        if (this.position.x >= 1920 - 50) this.position.x = 1920 - 55;
        else if (this.position.x <= 55) this.position.x = 55;
    }
}