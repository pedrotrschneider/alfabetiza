/************************************************************************
 * Color.js
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
 * This {@code Color} class provides an interface to store a color as a component to
 * any GameObject.
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Color
{
    /**
     * Initializes a Color with the given parameters.
     * 
     * @param {number(0, 255)} r 
     * @param {number(0, 255)} g 
     * @param {number(0, 255)} b 
     * @param {number(0, 255)} a 
     * 
     * @constructor
     */
    constructor(r, g, b, a = 255)
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;

        this.p5Color = color(this.r, this.g, this.b, this.a);
    }

    /**
     * Converts the color data in this Color component to a p5.Color.
     * 
     * @returns {p5.Color}  p5.Color representing this Color component.
     */
    getP5Color()
    {
        this.p5Color.setRed(this.r);
        this.p5Color.setGreen(this.g);
        this.p5Color.setBlue(this.b);
        this.p5Color.setAlpha(this.a);
        return this.p5Color;
    }
}