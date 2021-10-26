class Sprite2D extends Object2D
{
    constructor(name, p5Image)
    {
        super(name);

        if (p5Image)
            this.texture = new Texture(p5Image, p5Image.width, p5Image.height);
    }

    draw(delta)
    {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.rotationDegrees);
        scale(this.scale.x, this.scale.y);

        image(this.texture.image, this.position.x, this.position.y, this.texture.width, this.texture.height);

        this._draw(delta);

        for (let i = 0; i < this.children.length; i++)
            this.children[i].draw(delta);

        pop()
    }
}