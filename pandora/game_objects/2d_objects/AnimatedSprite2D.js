/************************************************************************
 * AnimatedSprite2D.js
 ************************************************************************
 * Copyright (c) 2021 Pedro Tonini Rosenberg Schneider.
 *
 * This file is part of Pandora.
 *
 * Pandora is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pandora is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *     
 * You should have received a copy of the GNU General Public License     
 * along with Pandora.  If not, see <https://www.gnu.org/licenses/>.
 *************************************************************************/

class AnimatedSprite2D extends Sprite2D
{
    constructor(name, p5Image, spriteFrames)
    {
        super(name, p5Image);

        this.spriteFrames = spriteFrames;
        this.playing = false;
        this.frame = 0;
        this.currentAnimation = 0;
        this.timeSinceLastFrame = 0;
    }

    // Setters
    setCurrentAnimationByIndex(idx)
    {
        if (idx < this.spriteFrames.numAnimations)
            this.currentAnimation = idx;
        else this.currentAnimation = null;
        this.frame = 0;
        this.timeSinceLastFrame = 0;
    }

    setCurrentAnimationByName(name)
    {
        this.currentAnimation = this.spriteFrames.getAnimationIndexByName(name);
        this.frame = 0;
        this.timeSinceLastFrame = 0;
    }

    setCurrentFrameTime(time)
    {
        this.getCurrentAnimation().setFrameTime(time);
    }

    setCurrentFPS(fps)
    {
        this.getCurrentAnimation().setFPS(fps);
    }

    // Getters
    getAnimationByIndex(idx)
    {
        return this.spriteFrames.getAnimationByIndex(idx);
    }

    getCurrentAnimation()
    {
        return this.spriteFrames.getAnimationByIndex(this.currentAnimation);
    }

    getCurrentFrame()
    {
        return this.getCurrentAnimation().getFrame(this.frame);
    }

    getCurrentFrameTime()
    {
        return this.getCurrentAnimation().getFrameTime();
    }

    getCurrentNumFrames()
    {
        return this.getCurrentAnimation().getNumFrames();
    }

    // Methods
    play()
    {
        this.playing = true;
    }

    stop()
    {
        this.playing = false;
    }

    isPlaying()
    {
        return this.playing;
    }

    update(delta)
    {
        if (this.playing)
        {
            this.timeSinceLastFrame += delta;
            if (this.timeSinceLastFrame >= this.getCurrentFrameTime())
            {
                this.frame = (this.frame + 1) % this.getCurrentNumFrames();
                this.timeSinceLastFrame = 0;
            }
        }
        this.P5Image = this.getCurrentFrame();
        this._update(delta);
        for (let i = 0; i < this.children.length; i++)
            this.children[i].update(delta);
    }
}