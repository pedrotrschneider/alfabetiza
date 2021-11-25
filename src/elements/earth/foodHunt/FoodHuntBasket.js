class FoodHuntBasket extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {FoodHuntPlayer} */
        this.player = null;
    }

    _update( /** @type {Number} */ delta)
    {
        this.position = this.player.position;
    }

    _draw( /** @type {Number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.rectMode(CENTER);
        db.fill(200);
        db.rect(0, 0, 110, 110);
    }
}