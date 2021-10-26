class GameObject
{
    constructor(name)
    {
        this.id = 0;

        this.name = name;

        this.children = [];
        this.parented = false;
        this.parent = null;

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
    _update(delta)
    {

    }

    _draw(delta)
    {

    }
}