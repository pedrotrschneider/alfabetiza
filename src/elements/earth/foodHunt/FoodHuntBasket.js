class FoodHuntBasket extends Object2D
{
    /** @type {FoodHuntPlayer} */
    player = null;

    _update()
    {
        this.position = this.player.position;
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.rectMode(CENTER);
        db.fill(200);
        db.rect(0, 0, 110, 110);
    }
}