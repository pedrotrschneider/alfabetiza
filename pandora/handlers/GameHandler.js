class GameHandler
{
    static rootObjects = []
    static nextId = 0;

    static renderMode = null;
    static setRenderMode(mode)
    {
        this.renderMode = mode;
    }

    static bDrawDebugFPS = false;
    static drawDebugFPS(val)
    {
        this.bDrawDebugFPS = val;
    }

    static gui;
    static init(fps=60)
    {
        if (!this.renderMode) this.renderMode = RENDER_MODES.P2D;
        switch (this.renderMode)
        {
            case RENDER_MODES.P2D:
                createCanvas(windowWidth, windowHeight);
                break;
            case RENDER_MODES.WEBGL:
                createCanvas(windowWidth, windowHeight, WEBGL);
                break;

        }
        frameRate(fps);
        smooth();

        this.gui = createGui();
    }

    static instanceGameObject(obj)
    {
        obj.id = this.nextId;
        this.nextId++;
    }

    static addRootObject(obj)
    {
        this.rootObjects.push(obj);
    }

    static prevMillis = 0;
    static delta = 0;
    static update()
    {
        this.delta = (millis() - this.prevMillis) / 1000;
        for (let i = 0; i < this.rootObjects.length; i++)
            this.rootObjects[i].update(this.delta);
    }

    static draw()
    {
        if (this.renderMode == RENDER_MODES.WEBGL) translate(-windowWidth / 2, -windowHeight / 2);
        if (this.bDrawDebugFPS)
        {
            textSize(12);
            noStroke();
            fill(0);
            text("FPS: " + frameRate(), 10, 20);
        }
        drawGui();

        for (let i = 0; i < this.rootObjects.length; i++)
            this.rootObjects[i].draw(this.delta);
        this.prevMillis = millis();
    }
}