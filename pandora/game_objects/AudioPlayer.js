/************************************************************************
 * AudioPlayer.js
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
 * The {@code AudioPlayer} class represents a GameObject that can playa p5.Audio
 * loaded from the AssetHandler.
 * 
 * ! All GameObjects need to be inside the tree to do anything (can be added as a child
 * ! of another GameObject on the tree or as a root).
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class AudioPlayer extends GameObject
{
    /**
     * Initializes an AudioPlayer GameObject with the given parameters.
     * 
     * @param {String} name         name for the AudioPlayer GameObject.
     * @param {p5.Audio} p5Audio    p5.Audio this AudioPlayer will play from.
     * 
     * @constructor
     */
    constructor(name, p5Audio = null)
    {
        super(name);

        this.p5Audio = p5Audio;
    }

    /**
     * Overrides AudioPlayer's p5Audio.
     * 
     * @param {p5.Audio} p5Audio    new p5.Audio for this AudioPlayer to play from.
     */
    setP5Audio(p5Audio)
    {
        if (this.p5Audio) this.p5Audio.stop();
        this.p5Audio = p5Audio;
    }

    /**
     * Returns this AudioPlayer's p5Audio.
     * 
     * @returns {p5.Audio}  this AudioPlayer's p5Audio.
     */
    getP5Audio()
    {
        return this.p5Audio;
    }

    /**
     * Starts playing this AudioPlayer's p5Audio.
     */
    play()
    {
        if (this.p5Audio) this.p5Audio.play();
    }

    /**
     * Stops playing this AudioPlayer's p5Audio.
     */
    stop()
    {
        if (this.p5Audio) this.p5Audio.stop();
    }

    // TODO: This don't worky, make it worky.
    // Something to do with new browser audio policy.
    /**
     * Sets this AudioPlayer's autoplay falg to true, so it starts whenever
     * it is ready.
     */
    autoplay()
    {
        if (this.p5Audio) this.p5Audio.autoplay(true);
    }
}