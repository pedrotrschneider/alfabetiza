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

class Object2D extends GameObject
{
    constructor(name)
    {
        super(name);

        this.position = Vector2.ZERO();
        this.rotationDegrees = 0;
        this.scale = Vector2.ONE();
        this.visible = true;
    }

    show()
    {
        this.visible = true;

        for (let i = 0; i < this.children.length; i++)
        {
            if(!this.children[i].show) continue;
            this.children[i].show();
        }
    }

    hide()
    {
        this.visible = false;

        for (let i = 0; i < this.children.length; i++)
        {
            if(!this.children[i].hide) continue;
            this.children[i].hide();
        }
    }

    setVisibility(val)
    {
        this.visible = val;

        for (let i = 0; i < this.children.length; i++)
        {
            if(!this.children[i].setVisibility) continue;
            this.children[i].setVisibility(val);
        }
    }

    getVisibility()
    {
        return this.visible;
    }

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