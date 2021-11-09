let test, but;

class TestObject extends Object2D
{
    _setup()
    {
        this.position = new Vector2(100, 100);
    }

    _onSignal(param1, param2, param3, param4)
    {
        this.setVisibility(!this.getVisibility())
    }

    _update(delta)
    {

    }

    _draw(delta, db)
    {
        db.ellipse(0, 0, 50);
    }
}

class TestObject2 extends Object2D
{
    _setup()
    {
        this.visible = true;
        this.position = new Vector2(100, 0);
    }

    _update(delta)
    {

    }

    _draw(delta, db)
    {
        if (this.visible) db.ellipse(0, 0, 50);
    }
}

class TestButton extends Button
{
    _setup()
    {
        this.setPosition(100, 200);
        this.setSize(150, 50);
    }

    _onMousePressed()
    {
        this.emitSignal("buttonPressed", 1, 2, 3, 4);
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
    GameHandler.drawDebugFPS(true);
    GameHandler.init();
    textFont(AssetHandler.getP5FontByName("Lato"));

    test = new TestObject("myTest");
    but = new TestButton("b1", "Emit signal");
    but.connect("mousePressed", test, "_onSignal");
    GameHandler.addRootObject(but);
    GameHandler.addRootObject(test);
    test.addChild(new TestObject2("myTest2"));
}

function draw()
{
    background(220);
    GameHandler.update();
    GameHandler.draw();
}