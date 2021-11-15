let test, test2, but;

class TestObj extends Object2D
{
    _setup()
    {
        this.getChildByIndex(0).connect("mouseEntered", this, "_onMouseEntered");
        this.getChildByIndex(0).connect("mouseExited", this, "_onMouseExited");
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
    test2 = new TestObj("myDummy");
    test2.setPosition(600, 600);
    test2.addChild(test);
    GameHandler.addRootObject(test2);
}