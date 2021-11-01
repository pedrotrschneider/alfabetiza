const GameHandler = {
    nextId: 0,
    rootObjects: [],

    renderMode: null,

    bDrawDebugFPS: false,
    debugFpsLabel: null,

    prevMillis: 0,
    delta: 0,

    setRenderMode: function(mode)
    {
        this.renderMode = mode;
    },

    drawDebugFPS(val)
    {
        this.bDrawDebugFPS = val;
    },

    init: function(fps = 60)
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

        if (this.bDrawDebugFPS)
            this.debugFpsLabel = new Label(`FPS: ${frameRate()}`)
    },

    instanceGameObject: function(obj)
    {
        obj.id = this.nextId;
        this.nextId++;
    },

    addRootObject: function(obj)
    {
        this.rootObjects.push(obj);
    },

    update: function()
    {
        if (this.bDrawDebugFPS) this.debugFpsLabel.setText(`FPS: ${frameRate()}`)
        this.delta = (millis() - this.prevMillis) / 1000;
        for (let i = 0; i < this.rootObjects.length; i++)
            this.rootObjects[i].update(this.delta);
    },

    draw: function()
    {
        if (this.renderMode == RENDER_MODES.WEBGL)
            translate(-windowWidth / 2, -windowHeight / 2);

        for (let i = 0; i < this.rootObjects.length; i++)
            this.rootObjects[i].draw(this.delta);
        this.prevMillis = millis();
    }
}

function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
}