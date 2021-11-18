class RebusCardVisualEffect extends Object2D
{
    glowAmount = 0;

    _draw(delta, db)
    {
        db.rectMode(CENTER);
        if (this.parent.selected)
        {
            if (!this.parent.isAnswer)
            {
                db.fill(0, 80);
                db.rect(0, 0, 300, 400, 10, 10);
            }
            else
            {
                db.noFill();
                this.glowAmount = min(1.0, this.glowAmount + 0.07);
                for (let i = 0; i < 100; i++)
                {
                    db.stroke(255, 255, 100, this.glowAmount * 200 / (101 - i));
                    db.strokeWeight((100 - i) / 3);
                    db.rect(0, 0, 300, 400, 10);
                }
            }
        }
    }
}