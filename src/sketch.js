let test, but;

class TestObject extends Object2D
{
    _setup()
    {
        this.visible = true;
        this.position = new Vector2(100, 100);
        this.getChildByIndex(0).connect("buttonPressed", this, "_onSignal");
    }

    _onSignal(param1, param2, param3, param4)
    {
        this.visible = !this.visible;
        console.log(param1);
        console.log(param2);
        console.log(param3);
        console.log(param4);
    }

    _update(delta)
    {

    }

    _draw(delta, db)
    {
        if (this.visible) db.ellipse(0, 0, 50);
    }
}

class TestObject2 extends Object2D
{
    _setup()
    {
        this.visible = true;
        this.position = new Vector2(200, 100);
        but.connect("buttonPressed", this, "_onSignal");
    }

    _onSignal(param1, param2, param3, param4)
    {
        this.visible = !this.visible;
        console.log(param1);
        console.log(param2);
        console.log(param3);
        console.log(param4);
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
    _initSignals()
    {
        this.addSignal("buttonPressed");
    }

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
    // GameHandler.setRenderMode(RENDER_MODES.WEBGL);
    GameHandler.init();
    textFont(AssetHandler.getP5FontByName("Lato"));

    test = new TestObject("myTest");
    but = new TestButton("b1", "Emit signal");
    test.addChild(but);
    GameHandler.addRootObject(test);
    GameHandler.addRootObject(new TestObject2("myTest2"));
}

function draw()
{
    background(220);
    GameHandler.update();
    GameHandler.draw();
}