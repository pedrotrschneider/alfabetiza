class Object2D extends GameObject
{
    constructor(name)
    {
        super(name);

        this.position = Vector2.ZERO();
        this.rotationDegrees = 0;
        this.scale = Vector2.ONE();
    }

    draw(delta)
    {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.rotationDegrees);
        scale(this.scale.x, this.scale.y);
        this._draw(delta);

        for (let i = 0; i < this.children.length; i++)
            this.children[i].draw(delta);

        pop()
    }
}