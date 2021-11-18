/************************************************************************
 * RebusCardVisualEffect.js
 ************************************************************************
 * Copyright (c) 2021 Pedro Tonini Rosenberg Schneider.
 *
 * This file is part of Alfabetiza.
 *
 * Alfabetiza is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfabetiza is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *     
 * You should have received a copy of the GNU General Public License     
 * along with Alfabetiza.  If not, see <https://www.gnu.org/licenses/>.
 *************************************************************************/

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