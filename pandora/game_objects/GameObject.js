/************************************************************************
 * GameObject.js
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

class GameObject
{
    constructor(name)
    {
        this.id = 0;

        this.name = name;

        this.children = [];
        this.parented = false;
        this.parent = null;
        this.isOnTree = false;

        GameHandler.instanceGameObject(this);
    }

    // Getters
    getChildren()
    {
        return this.children;
    }

    getChildByIndex(idx)
    {
        if (idx >= 0 && idx < this.children.length)
            return this.children[idx];
        return null;
    }

    getChildByName(name)
    {
        for (let i = 0; i < this.children.length; i++)
            if (this.children[i].name == name) return this.children[i];
        return null;
    }

    getParent()
    {
        if (!this.parented) return null;
        return this.parent;
    }

    // Methods
    addChild(child)
    {
        child.parent = this;
        child.parented = true;
        this.children.push(child);

        if (this.isOnTree) child.setup();
    }

    setup()
    {
        this.isOnTree = true;
        this._setup();
        for (let i = 0; i < this.children.length; i++)
        {
            this.children[i].setup();
        }
    }

    update(delta)
    {
        this._update(delta);
        for (let i = 0; i < this.children.length; i++)
            this.children[i].update(delta);
    }

    draw(delta)
    {
        this._draw(delta);
        for (let i = 0; i < this.children.length; i++)
            this.children[i].draw(delta);
    }

    // Callbacks
    _setup()
    {

    }

    _update(delta)
    {

    }

    _draw(delta)
    {

    }
}