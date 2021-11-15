/************************************************************************
 * Rect.js
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
 * This {@code Rect} class provides an interface to store a rectangle as a component to
 * any GameObject.
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Rect extends Component
{
    /**
     * Initializes a Rect with the given parameters.
     * 
     * @param {number} w    width of the Rect.
     * @param {number} h    height of the Rect.
     * 
     * @constructor
     */
    constructor(w, h = w)
    {
        super();
        
        this.w = w;
        this.h = h;
    }

    /**
     * Calculates if a point (x, y) lies iside the rect, assuming the
     * rect is on the origin of the Cartesian plane.
     * 
     * @param {number} x    x-cooridnate of the point. 
     * @param {number} y    y-coordinate of the point.
     * 
     * @returns {boolean}   true if the point lies within the bounds of the
     *                      rect, false if not. 
     */
    isIn(x, y)
    {
        return abs(x) <= this.w / 2 && abs(y) <= this.h / 2;
    }
}