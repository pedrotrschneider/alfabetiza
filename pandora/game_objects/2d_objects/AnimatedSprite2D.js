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

/**
 * The {@code AnimatedSprite2D} class represents a GameObject that inherits from
 * Sprite2D and extends its functionality to automatically draw a series of sprites
 * to the screen forming an animation.
 * 
 * ! All GameObjects need to be inside the tree to do anything (can be added as a child
 * ! of another GameObject on the tree or as a root).
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class AnimatedSprite2D extends Sprite2D
{
    /**
     * Initializes as AnimatedSprite2D GameObject with the specified parameters.
     * 
     * @param {String} name                 name for this AnimatedSprite2D GameObject. 
     * @param {p5.Image} p5Image            this AnimatedSprite2D's p5.Image to be drawn
     *                                      to the buffer.
     * @param {SpriteFrames} spriteFrames   data holding the animation in frames to be
     *                                      played by this GameObject.
     * 
     * @constructor
     */
    constructor(name, p5Image, spriteFrames)
    {
        super(name, p5Image);

        this.spriteFrames = spriteFrames;
        this.playing = false;
        this.frame = 0;
        this.currentAnimation = 0;
        this.timeSinceLastFrame = 0;
    }

    /**
     * Sets the current SpriteAnimation to be played based on its index on the list of
     * animations on SpriteFrames. Does nothing if the index is invalid.
     * 
     * ! The index refers to the order you added the animations to this AnimatedSprite2D's
     * ! SpriteFrames, starting at 0.
     * 
     * @param {number} idx  index of the SpriteAnimation on SpriteFrames.
     */
    setCurrentAnimationByIndex(idx)
    {
        if (idx < this.spriteFrames.numAnimations)
            this.currentAnimation = idx;
        else this.currentAnimation = null;
        this.frame = 0;
        this.timeSinceLastFrame = 0;
    }

    /**
     * Sets the current SpriteAnimation to be played based on its name on the list of
     * animations on SpriteFrames. Does nothing if the name is invalid.
     * 
     * @param {String} name name of the SpriteAnimation on SpriteFrames.
     */
    setCurrentAnimationByName(name)
    {
        this.currentAnimation = this.spriteFrames.getAnimationIndexByName(name);
        this.frame = 0;
        this.timeSinceLastFrame = 0;
    }

    /**
     * Sets the current SpriteAnimation's time between frames.
     * 
     * @param {number} time new time in seconds between frames for the
     *                      current SpriteAnimation.
     */
    setCurrentFrameTime(time)
    {
        this.getCurrentAnimation().setFrameTime(time);
    }

    /**
     * Sets the current SpriteAnimation's frames per second.
     * 
     * @param {number} fps  new frames per second for the current SpriteAnimation.
     */
    setCurrentFPS(fps)
    {
        this.getCurrentAnimation().setFPS(fps);
    }

    /**
     * Returns the SpriteAnimation with the given index on the list os SpriteAnimations on
     * this AnimatedSprite2D's SpriteFrames.
     * 
     * ! The index refers to the order you added the animations to this AnimatedSprite2D's
     * ! SpriteFrames, starting at 0.
     * 
     * @param {number} idx  index of the desired SpriteAnimation on SpriteFrames' list.
     * 
     * @returns {SpriteAnimation}   the desired SpriteAnimation based on the given index,
     *                              or null if the index is invalid.
     */
    getAnimationByIndex(idx)
    {
        return this.spriteFrames.getAnimationByIndex(idx);
    }

    /**
     * Returns the current SpriteAnimation on this AnimatedSprite2D's Sprite Frames.
     * 
     * @returns {SpriteAnimation}   the current SpriteAnimation on the SprteFrames.
     */
    getCurrentAnimation()
    {
        return this.spriteFrames.getAnimationByIndex(this.currentAnimation);
    }

    /**
     * Rerturns the p5.Image of the current frame on the current SpriteAnimation.
     * 
     * @returns {p5.Image}  image of the current frame. 
     */
    getCurrentFrame()
    {
        return this.getCurrentAnimation().getFrame(this.frame);
    }

    /**
     * Returns the time in seconds between frames of the current SpriteAnimation.
     * 
     * @returns {number}    time in seconds between frames of the current SpriteAnimation.
     */
    getCurrentFrameTime()
    {
        return this.getCurrentAnimation().getFrameTime();
    }

    /**
     * Returns the number of frames of the current SpriteAnimation.
     * 
     * @returns {number}    number of frames of the current SpriteAnimation.
     */
    getCurrentNumFrames()
    {
        return this.getCurrentAnimation().getNumFrames();
    }

    /**
     * Starts playing the current SpriteAnimation.
     */
    play()
    {
        this.playing = true;
    }

    /**
     * Stops playing the current SpriteAnimation.
     */
    stop()
    {
        this.playing = false;
    }

    /**
     * Rerturns the playing state of the current SpriteAnimation.
     * 
     * @returns {boolean}   true if the animation is playing, false if not. 
     */
    isPlaying()
    {
        return this.playing;
    }

    /**
     * Updates the current SpriteAnimation if its playing, and updates this
     * AnimatedSprite2D's P5Image to the current frame based on the current
     * SpriteAnimation.
     * 
     * @param {number} delta    number of seconds ellapsed since the last frame. 
     * 
     * @override
     */
    update(delta)
    {
        // Update global transform.
        if (!this.parented || !(this.parent instanceof Object2D))
        {
            this.globalPosition = this.position;
            this.globalRotationDegrees = this.rotationDegrees;
            this.globalScale = this.globalScale;
        }
        else
        {
            this.globalPosition.x = this.parent.globalPosition.x + this.position.x;
            this.globalPosition.y = this.parent.globalPosition.y + this.position.y;
            this.globalRotationDegrees = this.parent.globalRotationDegrees + this.rotationDegrees;
            this.globalScale.x = this.parent.globalScale.x + this.scale.x;
            this.globalScale.y = this.parent.globalScale.y + this.scale.y;
        }

        // Forwards the animation.
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

        // Callbacks
        this._update(delta);
        for (let i = 0; i < this.children.length; i++)
            this.children[i].update(delta);
    }
}