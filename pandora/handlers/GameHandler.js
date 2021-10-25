class GameHandler
{
    static rootObjects = []
    static nextId = 0;

    static bDrawDebugFPS = false;
    static drawDebugFPS(val)
    {
        this.bDrawDebugFPS = val;
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

    static update()
    {
        for (let i = 0; i < this.rootObjects.length; i++)
            this.rootObjects[i].update(1 / frameRate());
    }

    static draw()
    {
        if (this.bDrawDebugFPS)
        {
            textSize(12);
            stroke(0);
            text("FPS: " + frameRate(), 10, 10, windowWidth, windowHeight);
        }

        for (let i = 0; i < this.rootObjects.length; i++)
            this.rootObjects[i].draw(1 / frameRate());
    }
}