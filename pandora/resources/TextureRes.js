/************************************************************************
 * TextureRes.js
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
 * This {@code Textureres} class provides an interface to store a texture resource into
 * memory to be accessed later.
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class TextureRes
{
    /**
     * Initializes a texture resource with the given parameters.
     * 
     * @param {String} name         name of the texture resource.
     * @param {p5.Audio} p5Image     audio data for the texture resource.
     * 
     * @constructor
     */
    constructor(name = "", p5Image = null)
    {
        this.name = name;
        this.P5Image = p5Image;
    }
}