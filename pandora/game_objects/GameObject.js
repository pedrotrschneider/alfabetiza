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

/**
 * The {@code GameObject} class represents a minimal structure for any object in the
 * game. All objects added to the tree, either as a root or a child of an object
 * on the tree must be or inherit from GameObject.
 * 
 * ! All GameObjects need to be inside the tree to do anything (can be added as a child
 * ! of another GameObject on the tree or as a root).
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class GameObject
{
    /**
     * @constructor
     * Creates an empty GameObject, with default properties.
     * 
     * @param {String} name name of the new GameObject.
     */
    constructor(name)
    {
        this.id = 0; // Global unique indentifier for the object.

        this.name = name; // Set the name for the object.

        this.children = []; // List of children.
        this.parented = false; // Does this GameObject have a parent?
        this.parent = null; // Who is the parent? null if orphan.
        this.isOnTree = false; // Is this GameObject on the tree?
        this.isRoot = false; // Is this GameObject a root object?

        this.signals = []; // List of signals.
        this.initSignals();

        GameHandler.instanceGameObject(this);
    }

    /**
     * Returns the list of children of this GameObject.
     * @returns Array containing a reference to all of this GameObject's
     *          children.
     */
    getChildren()
    {
        return this.children;
    }

    /**
     * Query for a child of this GameObject with the child's index.
     * 
     * ! The index refers to the order you added the children to this
     * ! GameObject, starting at 0.
     * 
     * @param {String} idx  index of the desired child on the GameObject's
     *                      children list.
     * 
     * @returns a reference to the child with the given index, or null if
     *          no child has that index. 
     */
    getChildByIndex(idx)
    {
        if (idx >= 0 && idx < this.children.length)
            return this.children[idx];
        return null;
    }

    /**
     * Query for a child of this GameObject with the child's id.
     * 
     * @param {String} id  id of the desired child on the GameObject's
     *                      children list.
     * 
     * @returns a reference to the child with the given id, or null if
     *          no child has that id. 
     */
    getChildById(id)
    {
        for (let i = 0; i < this.children.length; i++)
        {
            if (this.children[i].id == id)
                return this.children[i];
        }
        return null;
    }

    /**
     * Query for a child of this GameObject with the child's name.
     * 
     * @param {String} name name of the desired child.
     *  
     * @returns a reference to the child with the given name, or null
     *          if no child has that name. 
     */
    getChildByName(name)
    {
        for (let i = 0; i < this.children.length; i++)
            if (this.children[i].name == name) return this.children[i];
        return null;
    }

    /**
     * Get a reference to this GameObject's parent.
     * 
     * @returns a reference to this GameObject's parent if it exists, null
     *          if it doesn't.
     */
    getParent()
    {
        if (!this.parented) return null;
        return this.parent;
    }

    /**
     * Add a new signal to this GameObject.
     * 
     * @param {String} name name for the new signal. 
     */
    addSignal(name)
    {
        this.signals.push(new Signal(name));
    }

    /**
     * Connect another GameObject to one of this GameObject's signals.
     *  
     * @param {String} signalName   name of the signal to be connected. 
     * @param {GameObject} target   reference to the GameObject that wants
     *                              to be connected to this signal.
     * @param {String} callback     name of the method to be called every
     *                              time this signal is emited. 
     */
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

    /**
     * Emits one of this GameObject's signals.
     * 
     * @param {String} signalName   name of the signal to be emited. 
     * @param  {...any} params      parameters the connected callbacks
     *                              should receive.
     */
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

    /**
     * Add the GameObject as a child of this GameObject.
     * 
     * @param {GameObject} child    reference to the GameObject to be
     *                              added as a child. 
     */
    addChild(child)
    {
        child.parent = this;
        child.parented = true;
        this.children.push(child);

        if (this.isOnTree) child.setup();
    }

    /**
     * Remove a child of this GameObject by its index. This action does not
     * delete the child GameObject; if this is the functionality you want, 
     * freeing a game object from memory automatically removes it from its
     * parent.
     * 
     * ! The index refers to the order you added the children to this
     * ! GameObject, starting at 0.
     * 
     * @param {number} idx  index of the child to be removed.
     */
    removeChildByIndex(idx)
    {
        if (idx >= 0 && idx < this.children.length)
            this.children.splice(idx, 1);
    }

    /**
     * Remove a child of this GameObject by its id. This action does not
     * delete the child GameObject; if this is the functionality you want, 
     * freeing a game object from memory automatically removes it from its
     * parent.
     * 
     * @param {number} id   id of the child to be removed.
     */
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

    /**
     * Remove a child of this GameObject by its name. This action does not
     * delete the child GameObject; if this is the functionality you want, 
     * freeing a game object from memory automatically removes it from its
     * parent.
     * 
     * @param {String} name name of the child to be removed.
     */
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

    /**
     * De-parents the GameObject from its parent, or removes it from the root of the
     * tree if orphan, and recursively marks this GameObject's and all of its children's
     * memory for garbage collection.
     */
    free()
    {
        if (this.parented)
            this.getParent().removeChildById(this.id);
        else if (this.isRoot)
            GameHandler.removeRootObjectById(this.id);

        this.destroy();
    }

    /**
     * Recursively marks this GameObject's and all of its children's
     * memory for garbage collection.
     */
    destroy()
    {
        for (let i = 0; i < this.children.length; i++)
            this.children[i].destroy();

        for (var prop in this)
            this[prop] = null;
    }

    /**
     * Caller for the _initSignals() callback
     */
    initSignals()
    {
        this._initSignals();
    }

    /**
     * Caller for the _setup() callback. Recursively calls itself for all
     * of this GameObject's children.
     */
    setup()
    {
        this.isOnTree = true;
        this._setup();
        for (let i = 0; i < this.children.length; i++)
        {
            this.children[i].setup();
        }
    }

    /**
     * Caller for the _update(delta) callback. Recrusively calls itself for
     * all of this GameOject's children.
     * 
     * @param {number} delta    ellapsed seconds since the last frame. 
     */
    update(delta)
    {
        this._update(delta);
        for (let i = 0; i < this.children.length; i++)
            this.children[i].update(delta);
    }

    /**
     * Caller for the _draw(delta, db) callback. Recursively calls itself for
     * all of this GameObject's children.
     * 
     * @param {number} delta    ellapsed seconds since the last frame. 
     * @param {p5.Graphics} db  secondary buffer to draw on. 
     */
    draw(delta, db)
    {
        this._draw(delta, db);
        for (let i = 0; i < this.children.length; i++)
            this.children[i].draw(delta, db);
    }

    /**
     * @callback
     * ! This function should be overriden, it provides no default functionality.
     * This function is called once when the GameObject is created and should declare
     * any and all signals the user wants for the GameObject.
     */
    _initSignals()
    {

    }

    /**
     * @callback
     * ! This function should be overriden, it provides no default functionality.
     * This function is called once when the GameObject is added to the tree (as a child
     * of another GameObject or as a root).
     */
    _setup()
    {

    }

    /**
     * @callback
     * ! This function should be overriden, it provides no default functionality.
     * This function is called once at the start of every frame and should be used for
     * any logic that doesn't have anything to do with drawing graphics to the screen buffer.
     * 
     * @param {number} delta    ellapsed seconds since the last frame. 
     */
    _update(delta)
    {

    }

    /**
     * @callback
     * ! This function should be overriden, it provides no default functionality.
     * This function is called once at the start of every frame after all update() calls
     * have been completed and should be used for any logic that results in something
     * beeing drawn to the screen buffer.
     * 
     * @param {number} delta    ellapsed seconds since the last frame. 
     * @param {p5.Graphics} db  secondary buffer to draw on. 
     */
    _draw(delta, db)
    {

    }
}