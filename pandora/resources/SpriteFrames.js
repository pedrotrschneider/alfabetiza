class SpriteAnimation
{
    constructor(name = "default", p5Image, rows, cols, indices, fps)
    {
        this.name = name;
        this.fullP5Image = p5Image;
        this.rows = rows;
        this.columns = cols;
        this.indices = indices;
        this.numFrames = this.indices.length;
        this.frameTime = 1 / fps;

        this.frames = [];
        for (let i = 0; i < this.numFrames; i++)
        {
            this.frames.push(this.makeFrame(i));
        }
    }

    setFrameTime(time)
    {
        this.frameTime = time;
    }

    setFPS(fps)
    {
        this.frameTime = 1 / fps;
    }

    getFrame(idx)
    {
        if (idx < this.numFrames)
            return this.frames[idx];
        return null;
    }

    getFrameTime()
    {
        return this.frameTime;
    }

    getNumFrames()
    {
        return this.numFrames;
    }

    makeFrame(idx)
    {
        let r = int(this.indices[idx] / this.columns);
        let c = this.indices[idx] % this.columns;
        let w = this.fullP5Image.width / this.columns;
        let h = this.fullP5Image.height / this.rows;
        let x = c * w;
        let y = r * h;
        return this.fullP5Image.get(x, y, w, h);
    }
}

class SpriteFrames
{
    constructor()
    {
        this.animations = [];
        this.numAnimations = 0;
    }

    getAnimationByIndex(idx)
    {
        if (idx < this.numAnimations) return this.animations[idx];
        return null;
    }

    getAnimationByName(name)
    {
        for (let i = 0; this.numAnimations; i++)
        {
            if (this.animations[i].name == name)
            {
                return this.animations[i];
            }
        }
        return null;
    }

    getAnimationIndexByName(name)
    {
        for (let i = 0; this.numAnimations; i++)
        {
            if (this.animations[i].name == name)
            {
                return i;
            }
        }
        return null;
    }

    addAnimation(name, p5Image, rows, cols, indices, fps = 24)
    {
        this.animations.push(new SpriteAnimation(name, p5Image, rows, cols, indices, fps));
        this.numAnimations++;
    }
}