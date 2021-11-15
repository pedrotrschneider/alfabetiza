/************************************************************************
 * Area2D.js
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
 * The {@code Area2D} class represents a GameObject that has a shape and can
 * detect the mouse on the secondary buffer.
 * 
 * ! All GameObjects need to be inside the tree to do anything (can be added as a child
 * ! of another GameObject on the tree or as a root).
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Area2D extends Object2D
{
    /**
     * Creates an empty Area2D with the specified parameters.
     * 
     * @param {String} name             name for the Area2D GameObject.
     * @param {SHAPES} shapeType        type of the shape on the Area2D.
     * @param {Shape} shape             data for the shape of the Area2D.
     * @param {boolean} listenToMouse   should this Area2D interact with the mouse?
     *                                  Default is true.
     * @param {boolean} drawDebug       should the Area2D's shape be drawn to the 
     *                                  secondary buffer? Default is false.
     * 
     * @constructor
     */
    constructor(name, shapeType, shape, listenToMouse = true, drawDebug = false)
    {
        super(name);

        this.shapeType = shapeType;
        this.shape = shape;
        this.listenToMouse = listenToMouse;
        this.drawDebug = drawDebug;

        this.mouseIn = false;
    }

    /**
     * Sets wether or not the Area2D's shape should be drawn to the screen.
     * 
     * @param {boolean} val new value for drawDebug.
     */
    setDrawDebug(val)
    {
        this.drawDebug = val;
    }

    /**
     * Defines default signals for Area2Ds and serves as the caller to this Area2Ds's
     * _initSignals() callbacks.
     * 
     * @signal mouseEntered emited once every time the mouse enters this Area2D's shape.
     * @signal mouseExited  emited once every time the mouse exits this Area2D's shape.
     * 
     * @override
     */
    initSignals()
    {
        this.addSignal("mouseEntered");
        this.addSignal("mouseExited");

        this._initSignals();
    }

    /**
     * Checks for the mouse position over this Area2D's shape and recursively calls the _update(delta)
     * callback for this GameObject and all of it's children.
     * 
     * @param {number} delta    number of ellapsed seconds since the last frame.
     * 
     * @override
     */
    update(delta)
    {
        if (this.listenToMouse)
        {
            if (this.shape.isIn(GameHandler.mouseX - this.position.x, GameHandler.mouseY - this.position.y))
            {
                if (!this.mouseIn)
                    this.emitSignal("mouseEntered");
                this.mouseIn = true;
            }
            else
            {
                if (this.mouseIn)
                    this.emitSignal("mouseExited");
                this.mouseIn = false;
            }
        }

        this._update(delta);
        for (let i = 0; i < this.children.length; i++)
            this.children[i].update(delta);
    }

    /**
     * Applies this Object2D's transform before calling this GameObject's _draw() callback
     * and recursively calls the same callback on all of it's children. Also draws this Area2D's
     * shape to the secondary buffer if requested.
     * 
     * @param {number} delta    number in seconds ellapsed since the last frame.
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

        if (this.drawDebug)
        {
            db.push();
            db.noStroke();
            db.fill(0, 0, 100, 100);
            switch (this.shapeType)
            {
                case SHAPES.ELLIPSE:
                    db.ellipseMode(CENTER);
                    db.ellipse(0, 0, this.shape.rx * 2, this.shape.ry * 2);
                    break;
                case SHAPES.RECT:
                    db.rectMode(CENTER);
                    db.rect(0, 0, this.shape.w, this.shape.h);
                    break;
            }
            db.pop();
        }

        this._draw(delta, db);

        for (let i = 0; i < this.children.length; i++)
            this.children[i].draw(delta, db);

        db.pop()
    }
}