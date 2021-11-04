let test;

class TestObject extends Object2D
{
    _setup()
    {
        this.position.y = 300;
        this.position.x = 100;

        this.timer = new Timer("myTimer", 2);
        this.addChild(this.timer);
    }

    _update(delta)
    {

    }

    _draw(delta)
    {

    }
}

class TestButton extends Button
{
    _onMousePressed()
    {
        this.getParent().getChildByName("myTimer").start();
    }

    _onMouseReleased()
    {
        this.getParent().getChildByName("myTimer").stop();
    }
}

function preload()
{
    AssetHandler.loadTexture("monke", "/assets/textures/monke.png");
    AssetHandler.loadFont("Lato", "/assets/fonts/Lato-Regular.ttf");
    AssetHandler.loadAudio("bonk", "/assets/audio/thonk.wav");
    AssetHandler.loadAudio("music", "/assets/audio/music.ogg");
}

function setup()
{
    // GameHandler.drawDebugFPS(true);
    GameHandler.setRenderMode(RENDER_MODES.WEBGL);
    GameHandler.init();
    textFont(AssetHandler.getP5FontByName("Lato"));

    test = new TestObject("myTest");
    but = new TestButton("myTestButton", "play");
    but.setPosition(0, 200);
    test.addChild(but);
    GameHandler.addRootObject(test);
    background(220);
}

function draw()
{
    GameHandler.update();
    GameHandler.draw();
}