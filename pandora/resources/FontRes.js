/************************************************************************
 * FontRes.js
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
 * This {@code FontRes} class provides an interface to store a font resource into
 * memory to be accessed later.
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class FontRes extends Resource
{
    /**
     * Initializes a font resource with the given parameters.
     * 
     * @param {String} name         name of the font resource.
     * @param {p5.Audio} p5font     audio data for the font resource.
     * 
     * @constructor
     */
    constructor(name = "", p5Font = null)
    {
        super(name);

        this.P5Font = p5Font;
    }
}