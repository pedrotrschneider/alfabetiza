/************************************************************************
 * Shape2D.js
 ************************************************************************
 * Copyright (c) 2021 Pedro Tonini Rosenberg Schneider.
 *
 * This file is part of Pandora.
 *
 * Pandora is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pandora is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *     
 * You should have received a copy of the GNU General Public License     
 * along with Pandora.  If not, see <https://www.gnu.org/licenses/>.
 *************************************************************************/

class Shape2D extends Object2D
{
    constructor(name, shapeType = null, shape = null)
    {
        super(name);

        this.shapeType = shapeType;
        this.shape = shape;

        this.shapeMode = CORNER;
        this.fillColor = color(255);
        this.noFill = false;
        this.strokeWeight = 1;
        this.strokeColor = color(0);
        this.noStroke = false;
    }

    draw(delta, db)
    {
        db.push();
        db.translate(this.position.x, this.position.y);
        db.rotate(this.rotationDegrees);
        db.scale(this.scale.x, this.scale.y);

        db.fill(this.fillColor);
        db.strokeWeight(this.strokeWeight)
        db.stroke(this.strokeColor);

        if (this.noFill) db.noFill();
        if (this.noStroke) db.noStroke();
        switch (this.shapeType)
        {
            case SHAPES.RECT:
                db.rectMode(this.shapeMode);
                db.rect(0, 0, this.shape.w, this.shape.h);
                break;
            case SHAPES.ELLIPSE:
                db.ellipseMode(this.shapeMode);
                db.ellipse(0, 0, this.shape.rx, this.shape.ry);
        }

        this._draw(delta, db);

        for (let i = 0; i < this.children.length; i++)
            this.children[i].draw(delta, db);

        db.pop()
    }
}