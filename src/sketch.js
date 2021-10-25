class TestObject extends Object2D
{
    constructor(name)
    {
        super(name);

        this.position.x = windowWidth / 2;
        this.position.y = windowHeight / 2;
    }

    _update(delta)
    {
        if (this.name == "myTest")
        {
            this.position.x -= 1;
        }
    }

    _draw(delta)
    {
        ellipse(0, 0, 100, 100)
    }
}

let test;

function setup()
{
    createCanvas(windowWidth, windowHeight);
    smooth();
    GameHandler.drawDebugFPS(true);

    test = new TestObject("myTest");
    GameHandler.addRootObject(test);

    test.position = new Vector2(windowWidth / 2, windowHeight / 2);
    test.scale = Vector2.ONE();
    test.rotationDegrees = 0;

    test.addChild(new TestObject("myChild"));
}

function draw()
{
    background(220);
    GameHandler.update();
    GameHandler.draw();
}

function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
}