let test;

class TestObject extends Object2D
{
    _setup()
    {
        this.currTime = 0;
        this.duration = 3;
        this.position.y = 300;
        this.position.x = 100;

        this.tween = new Tween("myTween");
        this.tween.interpolateProperty(this.position, "x", PROPERTY_TYPE.NUMBER, this.position.x, 400, 2, TRANS_TYPE.LINEAR, EASE_TYPE.OUT, 0);
        // this.tween.interpolateProperty(this.position, "y", PROPERTY_TYPE.NUMBER, this.position.y, 100, 2, TRANS_TYPE.LINEAR, EASE_TYPE.OUT, 0);
        // this.tween.interpolateProperty(this.position, "y", PROPERTY_TYPE.NUMBER, this.position.y, 100, 2, TRANS_TYPE.SINE, EASE_TYPE.OUT, 0);
        this.tween.interpolateProperty(this.position, "y", PROPERTY_TYPE.NUMBER, this.position.y, 100, 3, TRANS_TYPE.CUBIC, EASE_TYPE.IN_OUT, 0);
        // this.tween.interpolateProperty(this.position, "y", PROPERTY_TYPE.NUMBER, this.position.y, 100, 2, TRANS_TYPE.BOUNCE, EASE_TYPE.OUT, 0);
        // this.tween.interpolateProperty(this.position, "y", PROPERTY_TYPE.NUMBER, this.position.y, 100, 2, TRANS_TYPE.ELASTIC, EASE_TYPE.OUT, 0);
        this.addChild(this.tween);
    }

    _update(delta)
    {
        // console.log(this.color)
    }

    _draw(delta)
    {
        ellipse(0, 0, 20, 20);
    }
}

class TestButton extends Button
{
    _onMousePressed()
    {
        this.getParent().tween.play();
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