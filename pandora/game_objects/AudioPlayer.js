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

class AudioPlayer extends GameObject
{
    constructor(name, p5Audio = null)
    {
        super(name);

        this.p5Audio = p5Audio;
    }

    setP5Audio(p5Audio)
    {
        if (this.p5Audio) this.p5Audio.stop();
        this.p5Audio = p5Audio;
    }

    getP5Audio()
    {
        return this.p5Audio;
    }

    play()
    {
        if (this.p5Audio) this.p5Audio.play();
    }

    stop()
    {
        if (this.p5Audio) this.p5Audio.stop();
    }

    // TODO: This don't worky, make it worky
    // Something to do with new browser audio policy
    autoplay()
    {
        if (this.p5Audio) this.p5Audio.autoplay(true);
    }
}