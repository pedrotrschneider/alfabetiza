class FoodHuntTree extends Object2D
{
    _setup()
    {
        this.setPosition(1920 / 2, 1080 / 2 - 100);
    }

    _draw( /** @type {Number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.rectMode(CENTER);
        db.fill("#823c11");
        db.rect(0, 0, 300, 800);
        db.fill("#07630d");
        db.rect(0, -400,  1700, 600, 100, 100)
    }
}