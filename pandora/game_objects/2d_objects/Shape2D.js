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

/**
 * The {@code Shape2D} class represents a GameObject that inherits from
 * Object2D and extends its functionality to automatically draw a Shape on the
 * buffer, according to the data passed by a Shape component.
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Shape2D extends Object2D
{
    /**
     * @constructor
     * Initializes a Shape2D GameObject with the specified parameters.
     * 
     * @param {String} name         name for this Shape2D;
     * @param {SHAPES} shapeType    type of the shape for this Shape2D. 
     * @param {Shape} shape         dta for the shape of this Shape2D.
     */
    constructor(name, shapeType = null, shape = null)
    {
        super(name);

        this.shapeType = shapeType; // This Shape2D's shape type.
        this.shape = shape; // This Shape2D's shape data.

        this.shapeMode = CORNER; // This Shape2D's shape mode.
        this.fillColor = color(255); // This Shape2D's fill color.
        this.noFill = false; // Should this Shape2D be filled with a color?
        this.strokeWeight = 1; // This Shape2D's stroke weight.
        this.strokeColor = color(0); // This Shape2D's stroke color.
        this.noStroke = false; // Should this Shape2D have an outline?
    }

    /**
     * @override
     * Applies this Object2D's transform before calling this GameObject's _draw() callback
     * and recursively calls the same callback on all of it's children. Also draws a shape
     * on the buffer based on the data passed to this GameObject.
     * 
     * @param {number} delta    number in seconds ellapsed since the last frame.
     * @param {p5.Graphics} db  secondary buffer to draw to.
     */
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