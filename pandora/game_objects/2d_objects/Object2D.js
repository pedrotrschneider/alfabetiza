/************************************************************************
 * Object2D.js
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
 * The {@code Object2D} class represents a GameObject that has a transform,
 * comprised of a position, a rotation in degrees and a scale. All parameters
 * of this transform are relative to the parent of this GameObject, if it has one.
 * 
 * ! All GameObjects need to be inside the tree to do anything (can be added as a child
 * ! of another GameObject on the tree or as a root).
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Object2D extends GameObject
{
    /**
     * Initializes an empty Object2D GameObject.
     * 
     * @param {String} name name of the Object2D GameObject. 
     * 
     * @constructor
     */
    constructor(name)
    {
        super(name);

        this.position = Vector2.ZERO(); // This Object2D's position on the secondary buffer.
        this.rotationDegrees = 0; // This Object2D's rotation degrees on the secondary buffer.
        this.scale = Vector2.ONE(); // This Object2D's scale on the secondary buffer.
        this.visible = true; // Is this Object2D visible at the moment?
    }

    /**
     * Sets this Object2D's position.
     * 
     * @param {number} x    new position on the x axis for this Object2D. 
     * @param {number} y    new positoin on the y axis for this Object2D.
     */
    setPosition(x, y)
    {
        this.position.x = x;
        this.position.y = y;
    }

    /**
     * Sets the visibility flag of this Object2D and all of its children
     * that have a visibility flag to true.
     */
    show()
    {
        this.visible = true;

        for (let i = 0; i < this.children.length; i++)
        {
            if (!this.children[i].show) continue;
            this.children[i].show();
        }
    }

    /**
     * Sets the visibility flag of this Object2D and all of its children
     * that have a visibility flag to false.
     */
    hide()
    {
        this.visible = false;

        for (let i = 0; i < this.children.length; i++)
        {
            if (!this.children[i].hide) continue;
            this.children[i].hide();
        }
    }

    /**
     * Sets the visibility flag of this Object2D and all of its children that have a visibility
     * flag to the provided value.
     * 
     * @param {boolean} val value to set the flag to.
     */
    setVisibility(val)
    {
        this.visible = val;

        for (let i = 0; i < this.children.length; i++)
        {
            if (!this.children[i].setVisibility) continue;
            this.children[i].setVisibility(val);
        }
    }

    /**
     * Returns this Object2D's visibility flag.
     * 
     * @returns {boolean} true if this Object2D is visible, false if not.
     */
    getVisibility()
    {
        return this.visible;
    }

    /**
     * Applies this Object2D's transform before calling this GameObject's _draw() callback
     * and recursively calls the same callback on all of it's children. This results in the
     * appearence of relative position.
     * 
     * @param {number} delta    number of seconds ellapsed since the last frame.
     * @param {p5.Graphics} db  secondary buffer to draw to.
     * 
     * @override
     */
    draw(delta, db)
    {
        if (!this.visible) return;

        db.push();
        db.translate(this.position.x, this.position.y);
        db.rotate(this.rotationDegrees);
        db.scale(this.scale.x, this.scale.y);

        this._draw(delta, db);

        for (let i = 0; i < this.children.length; i++)
            this.children[i].draw(delta, db);

        db.pop()
    }
}