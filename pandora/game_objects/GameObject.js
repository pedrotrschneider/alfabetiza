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
        this.isRoot = false;

        this.signals = [];
        this.initSignals();

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

    getChildById(id)
    {
        for (let i = 0; i < this.children.length; i++)
        {
            if (this.children[i].id == id)
                return this.children[i];
        }
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
    addSignal(name)
    {
        this.signals.push(new Signal(name));
    }

    connect(signalName, target, callback)
    {
        for (let i = 0; i < this.signals.length; i++)
        {
            if (this.signals[i].name == signalName)
            {
                this.signals[i].targets.push(target);
                this.signals[i].callbacks.push(callback);
                return;
            }
        }
    }

    emitSignal(signalName, ...params)
    {
        for (let i = 0; i < this.signals.length; i++)
        {
            if (this.signals[i].name == signalName)
            {
                for (let j = 0; j < this.signals[i].callbacks.length; j++)
                    this.signals[i].targets[j][this.signals[i].callbacks[j]](...params);
                return;
            }
        }
    }

    addChild(child)
    {
        child.parent = this;
        child.parented = true;
        this.children.push(child);

        if (this.isOnTree) child.setup();
    }

    removeChildByIndex(idx)
    {
        if (idx >= 0 && idx < this.children.length)
            this.children.splice(idx, 1);
    }

    removeChildById(id)
    {
        for (let i = 0; i < this.children.length; i++)
        {
            if (this.children[i].id == id)
            {
                this.children.splice(i, 1);
                return;
            }
        }
    }

    removeChildByName(name)
    {
        for (let i = 0; i < this.children.length; i++)
        {
            if (this.children[i].name == name)
            {
                this.children.splice(i, 1);
                return;
            }
        }
    }

    free()
    {
        if (this.parented)
            this.getParent().removeChildById(this.id);
        else if (this.isRoot)
            GameHandler.removeRootObjectById(this.id);

        this.destroy();
    }

    destroy()
    {
        for (let i = 0; i < this.children.length; i++)
            this.children[i].destroy();

        for (var prop in this)
            this[prop] = null;
    }

    initSignals()
    {
        this._initSignals();
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

    draw(delta, db)
    {
        this._draw(delta, db);
        for (let i = 0; i < this.children.length; i++)
            this.children[i].draw(delta, db);
    }

    // Callbacks
    _initSignals()
    {

    }

    _setup()
    {

    }

    _update(delta)
    {

    }

    _draw(delta, db)
    {

    }
}