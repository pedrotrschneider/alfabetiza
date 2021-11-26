class AcrofonyCardVisualEffect extends Object2D
{
    constructor(name)
    {
        super(name);

        /** @type {number} */
        this.glowIterations = 7;
        /** @type {number} */
        this.glowAmount = 0;
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        db.rectMode(CENTER);
        if (this.parent.selected)
        {
            if (!this.parent.isAnswer)
            {
                db.fill(0, 80);
                db.rect(0, 0, 250, 200, 10, 10);
            }
            else
            {
                db.noFill();
                this.glowAmount = min(1.0, this.glowAmount + 0.03);
                for (let i = 0; i < this.glowIterations; i++)
                {
                    db.stroke(255, 255, 100, this.glowAmount * 200 / (this.glowIterations + 1 - i));
                    db.strokeWeight((this.glowIterations - i) * 6);
                    db.rect(0, 0, 250, 200, 10);
                }
            }
        }
    }
}