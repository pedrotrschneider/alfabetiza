class Shape2D extends Object2D
{
    constructor(name, shapeType = null, shape = null)
    {
        super(name);

        this.shapeType = shapeType;
        this.shape = shape;

        this.shapeMode = CORNER;
        this.fillColor = color(255);
        this.noFill = false;
        this.strokeWeight = 1;
        this.strokeColor = color(0);
        this.noStroke = false;
    }

    draw(delta)
    {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.rotationDegrees);
        scale(this.scale.x, this.scale.y);

        fill(this.fillColor);
        strokeWeight(this.strokeWeight)
        stroke(this.strokeColor);
        
        if (this.noFill) noFill();
        if(this.noStroke) noStroke();
        switch (this.shapeType)
        {
            case SHAPES.RECT:
                rectMode(this.shapeMode);
                rect(0, 0, this.shape.w, this.shape.h);
                break;
            case SHAPES.ELLIPSE:
                ellipseMode(this.shapeMode);
                ellipse(0, 0, this.shape.rx, this.shape.ry);
        }

        this._draw(delta);

        for (let i = 0; i < this.children.length; i++)
            this.children[i].draw(delta);

        pop()
    }
}