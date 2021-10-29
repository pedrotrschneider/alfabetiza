class Sprite2D extends Object2D
{
    constructor(name, p5Image)
    {
        super(name);

        this.P5Image = p5Image;
    }

    draw(delta)
    {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.rotationDegrees);
        scale(this.scale.x, this.scale.y);

        image(this.P5Image, this.position.x, this.position.y, this.P5Image.width, this.P5Image.height);

        this._draw(delta);

        for (let i = 0; i < this.children.length; i++)
            this.children[i].draw(delta);

        pop()
    }
}