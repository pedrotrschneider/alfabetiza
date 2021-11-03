let test;

class TestObject extends Object2D
{
    _setup()
    {
        this.currTime = 0;
        this.duration = 3;
        this.position.y = 100;
        this.position.x = 0;
        this.targetXPos = 200;

        this.playing = false;
    }

    _update(delta)
    {
        if (this.playing)
        {
            this.currTime = min(this.currTime + delta, this.duration);
        }
        this.position.x = Easings.Elastic.easeOut(0, this.currTime, 0, 300, this.duration);
    }

    _draw()
    {
        ellipse(0, 0, 20);
    }
}

class TestButton extends Button
{
    _onMousePressed()
    {
        this.getParent().playing = true;
        this.getParent().currTime = 0;
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
    GameHandler.setRenderMode(RENDER_MODES.WEBGL);
    GameHandler.init();
    textFont(AssetHandler.getP5FontByName("Lato"));

    test = new TestObject("myTest");
    but = new TestButton("myTestButton", "play");
    but.setPosition(0, 200);
    test.addChild(but);
    GameHandler.addRootObject(test);
}

function draw()
{
    background(220);
    GameHandler.update();
    GameHandler.draw();
}