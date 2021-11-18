class RebusGameVisualEffects extends Object2D
{
    suffix = "";
    bgOpacity = 0;
    textOpacity = 0;

    _draw(delta, db)
    {
        if (this.parent.gameFinished)
        {
            db.noStroke();
            db.fill(0, min(this.bgOpacity +=  75 * delta, 200));
            db.rectMode(CENTER);
            db.rect(db.width / 2, db.height / 2, 1800, 600, 40, 40);
            db.textAlign(CENTER, CENTER);
            db.fill(255, min(this.textOpacity += 80 * delta, 255));
            db.textSize(40);
            this.parent.points > 1 ? this.suffix = "S" : this.suffix = "";
            db.text(`PARABÉNS, NÍVEL CONCLUÍDO\nVOCÊ GANHOU ${this.parent.points} PONTO${this.suffix}!`, db.width / 2, db.height / 2 - 100);
        }
    }
}