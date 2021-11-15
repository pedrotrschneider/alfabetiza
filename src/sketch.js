let test, but;

class TestObj extends GameObject
{
    _setup()
    {
        this.getParent().connect("mouseEntered", this, "_onMouseEntered");
        this.getParent().connect("mouseExited", this, "_onMouseExited");
    }

    _onMouseEntered()
    {
        console.log("hello");
    }

    _onMouseExited()
    {
        console.log("goodbye");
    }
}

GameHandler._preload = function()
{
    AssetHandler.loadTexture("monke", "/assets/textures/monke.png");
    AssetHandler.loadFont("Lato", "/assets/fonts/Lato-Regular.ttf");
    AssetHandler.loadAudio("bonk", "/assets/audio/thonk.wav");
    AssetHandler.loadAudio("music", "/assets/audio/music.ogg");
}

GameHandler._setup = function()
{
    GameHandler.drawDebugFPS(true);
    GameHandler.drawDebugBufferBounds(true);
    textFont(AssetHandler.getP5FontByName("Lato"));

    test = new Area2D("myTest", SHAPES.ELLIPSE, new Ellipse(200, 400), true, true);
    test.setPosition(600, 600);
    GameHandler.addRootObject(test);
    test.addChild(new TestObj("myDummy"));
}