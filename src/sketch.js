let test, but, bu2;

class TestObject extends Object2D
{
    _setup()
    {
        this.position.y = 300;
        this.position.x = 100;

        this.tween = new Tween("myTween");
        this.tween.interpolateProperty(this.position, "x", PROPERTY_TYPE.NUMBER, this.position.x, 400, 2, TRANS_TYPE.LINEAR);
        this.tween.interpolateProperty(this.position, "y", PROPERTY_TYPE.NUMBER, this.position.y, 100, 2, TRANS_TYPE.BOUNCE, EASE_TYPE.OUT);
        this.addChild(this.tween);
    }

    _update(delta)
    {

    }

    _draw(delta)
    {
        ellipse(0, 0, 20);
    }
}

class TestButton extends Button
{
    _onMousePressed()
    {
        if (this.name == "b1")
            this.getParent().tween.start();
        else if (this.name == "b2")
            this.getParent().tween.stop();
        else if (this.name == "b3")
            this.getParent().tween.stopByIndex(0);
        else if (this.name == "b4")
            this.getParent().tween.startByIndex(0);

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
    but = new TestButton("b1", "play");
    but.setPosition(0, 200);
    test.addChild(but);
    but2 = new TestButton("b2", "stop");
    but2.setPosition(0, 230);
    test.addChild(but2);
    but2 = new TestButton("b3", "stop1");
    but2.setPosition(0, 260);
    test.addChild(but2);
    but2 = new TestButton("b4", "play1");
    but2.setPosition(0, 290);
    test.addChild(but2);
    GameHandler.addRootObject(test);
}

function draw()
{
    background(220);
    GameHandler.update();
    GameHandler.draw();
}