class FoodHuntFruit extends Object2D
{
    /** @type {Number} */
    static G = 10;

    /** @type {Color} */
    color = new Color(0, 0, 0);
    /** @type {Number} */
    r = 20

    _setup()
    {

    }

    _update( /** @type {Number} */ delta)
    {
        
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        ellipse(0, 0, this.r);
    }
}