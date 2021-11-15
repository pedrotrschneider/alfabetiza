/************************************************************************
 * SpriteFrames.js
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
 * This {@code SpriteAnimation} class provides an interface to store an animation in the form
 * of a series of images.
 * 
 * ! This class has no use in the engine aside from holding the data for an animation inside a
 * ! SpriteFrames object. Its use is not recomended anywhere else.
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class SpriteAnimation extends Resource
{
    /**
     * Initialize a SpriteAnimation with the given parameters.
     * 
     * @param {String} name         name for the SpriteAnimation.
     * @param {p5.Image} p5Image    p5.Image holding all the frames for the aniamtion.
     * @param {number} rows         number of rows of frames the image has.
     * @param {number} cols         number of columns of frames the image has.
     * @param {Array} indices       indices of the frames from left-to-right and top-to-bottom
     *                              that should be included in the animation.
     * @param {number} fps          frames per second the animation should be played at.
     * 
     * @constructor 
     */
    constructor(name = "default", p5Image, rows, cols, indices, fps)
    {
        super(name);

        this.fullP5Image = p5Image;
        this.rows = rows;
        this.columns = cols;
        this.indices = indices;
        this.numFrames = this.indices.length;
        this.frameTime = 1 / fps;

        // Extract all the requested frames from the image as individual p5.Images.
        this.frames = [];
        for (let i = 0; i < this.numFrames; i++)
        {
            this.frames.push(this.makeFrame(i));
        }
    }

    /**
     * Extracts a frame from the full image based on its index on the image, from left-to-right and
     * top-to-bottom.
     * 
     * @param {number} idx  index of the desired frame on the full image.
     * 
     * @returns {p5.Image}  frame with the requested index on the full image.
     */
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

    /**
     * Sets the time between frames for the animation.
     * 
     * @param {number} time new time between frames for the animation.
     */
    setFrameTime(time)
    {
        this.frameTime = time;
    }

    /**
     * Sets the frames per second for the animation.
     * 
     * @param {number} fps  new frames per second value for the animation.
     */
    setFPS(fps)
    {
        this.frameTime = 1 / fps;
    }

    /**
     * Returns a frame of the animation based on its index.
     * 
     * @param {number} idx  index of the desired frame on the animation.
     * 
     * @returns {p5.Image}  frame with the requested index on the animation, or null if
     *                      the requested index is invalid.
     */
    getFrame(idx)
    {
        if (idx >= 0 && idx < this.numFrames)
            return this.frames[idx];
        return null;
    }

    /**
     * Returns the time between frames for the animation.
     * 
     * @returns {number}    time between frames for the aniamtion.
     */
    getFrameTime()
    {
        return this.frameTime;
    }

    /**
     * Returns the number of frames the animation has.
     * 
     * @returns {number}    number of frames the animation has.
     */
    getNumFrames()
    {
        return this.numFrames;
    }
}

/**
 * This {@code SpriteFrames} class provides an interface to store multiple related SpriteAnimations
 * inside a sigle object for use with the AnimatedSprite2D GameObject.
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class SpriteFrames extends Resource
{
    /**
     * Initializes an empty SpriteFrames.
     * 
     * @constructor
     */
    constructor()
    {
        super();
        
        this.animations = [];
        this.numAnimations = 0;
    }

    /**
     * Returns an animation based on its index on the list of aniamtions.
     * 
     * @param {number} idx          index of the desired animation.
     * 
     * @returns {SpriteAnimation}   animation with the requested index, or null if the
     *                              index is invalid.
     */
    getAnimationByIndex(idx)
    {
        if (idx >= 0 && idx < this.numAnimations) return this.animations[idx];
        return null;
    }

    /**
     * Returns an animation baes on its name.
     * 
     * @param {String} name         name of the desired animation.
     * 
     * @returns {SpriteAnimation}   animation with the requested name, or
     *                              null if no animation has that name. 
     */
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

    /**
     * Returns the index of an animation on the list of animations based on its name.
     * 
     * @param {number} name name of the desired animation.
     * @returns {number}    index on the list of animations of the animation with the requested
     *                      name, or null if no animation has that name
     */
    getAnimationIndexByName(name)
    {
        for (let i = 0; this.numAnimations; i++)
        {
            if (this.animations[i].name == name)
                return i;
        }
        return null;
    }

    /**
     * Adds a new SprteAniamtion to the list of aniamtions with the given data.
     * 
     * @param {String} name         name for the SpriteAnimation.
     * @param {p5.Image} p5Image    p5.Image holding all the frames for the aniamtion.
     * @param {number} rows         number of rows of frames the image has.
     * @param {number} cols         number of columns of frames the image has.
     * @param {Array} indices       indices of the frames from left-to-right and top-to-bottom
     *                              that should be included in the animation.
     * @param {number} fps          frames per second the animation should be played at.
     *                              Default is 24.
     */
    addAnimation(name, p5Image, rows, cols, indices, fps = 24)
    {
        this.animations.push(new SpriteAnimation(name, p5Image, rows, cols, indices, fps));
        this.numAnimations++;
    }
}