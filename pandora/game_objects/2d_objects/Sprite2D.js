/************************************************************************
 * Sprite2D.js
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
 * The {@code Sprite2D} class represents a GameObject that inherits from
 * Object2D and extends its functionality to automatically draw a Sprite on the
 * buffer.
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Sprite2D extends Object2D
{
    /**
     * @constructor
     * Initializes a Sprite2D GameObject with the specified parameters.
     * 
     * @param {String} name         name for this Sprite2D. 
     * @param {p5.Image} p5Image    p5.Image to be drawn on the buffer.
     */
    constructor(name, p5Image)
    {
        super(name);

        this.P5Image = p5Image; // This Sprite2D p5.Image.
    }

    /**
     * @override
     * Applies this Object2D's transform before calling this GameObject's _draw() callback
     * and recursively calls the same callback on all of it's children. Also draws an image
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

        db.image(this.P5Image, 0, 0, this.P5Image.width, this.P5Image.height);

        this._draw(delta, db);

        for (let i = 0; i < this.children.length; i++)
            this.children[i].draw(delta, db);

        db.pop();
    }
}