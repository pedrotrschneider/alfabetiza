class TestObject extends Button
{
    // constructor(name)
    // {
    //     super(name);
    // }

    _update(delta)
    {

    }

    _draw(delta)
    {

    }

    _onMousePressed() {
        print("Hello")
    }

    _onMouseOver() {
        print("over")
    }
}

let test, test2;
let testImg;
let testFont;
let testButton, testSlider;

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

    test = new TestObject("myTest");
    GameHandler.addRootObject(test);
    test.setLabel("hello");

    test2 = new TestObject("myTest2");
    test.addChild(test2);
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