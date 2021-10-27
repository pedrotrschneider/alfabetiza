class TestObject extends Sprite2D
{
    constructor(name, p5Img)
    {
        super(name, p5Img);

        this.position.x = 0;
        this.position.y = 0;
        this.texture.width = windowWidth;
        this.texture.height = windowHeight;
    }

    _update(delta)
    {
        this.position.x -= 100 * delta;
    }

    _draw(delta)
    {

    }
}

let test;
let testImg;
let testFont;

function preload()
{
    testImg = loadImage("/assets/textures/monke.png");
    testFont = loadFont("/assets/fonts/Lato-Regular.ttf");
}

function setup()
{
    GameHandler.drawDebugFPS(true);
    GameHandler.setRenderMode(RENDER_MODES.WEBGL);
    GameHandler.init();
    textFont(testFont);

    test = new TestObject("mySprite", testImg);
    GameHandler.addRootObject(test);
    // print(test)
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