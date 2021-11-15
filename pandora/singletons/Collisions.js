/************************************************************************
 * Collisions.js
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
 * This {@code Collisions} singleton provides an interface for the engine to calculate collisions
 * with various differente shapes. They are used in the calculations of the Area2D GameObject,
 * to check collisions with the mouse. They can be utilized by the user if it fits the need.
 * 
 * @author Pedro Schneider
 * 
 * @namespace
 */
const Collisions = {
    /**
     * Rotates the (x, y) vector by a degrees clockwise, around the origin.
     * 
     * @param {number} x    X coordinate of the vector to rotate.
     * @param {number} y    Y coordinate of the vector to rotate.
     * @param {number} a    angle in degrees to rotate the vector.
     * 
     * @returns {Array}     static array containing the tow coordinates of the rotated vector.
     *                      Can be deconstructed. 
     */
    rotate(x, y, a)
    {
        var rotx = x,
            roty = y;
        if (a % 360 != 0)
        {
            rotx = x * cos(-radians(a)) - y * sin(-radians(a));
            roty = x * sin(-radians(a)) + y * cos(-radians(a));
        }

        return Object.freeze([rotx, roty]);
    },

    /**
     * Namespace to separate rectangle collision detection.
     * 
     * @namespace
     */
    Rect:
    {
        /**
         * Calculates if a point is inside a rect.
         * 
         * @param {number} posx global X-axis position of the rect. 
         * @param {number} posy global Y-axis position of the rect.
         * @param {number} rot  global rotation in degrees of the rect.
         * @param {number} sx   global X-axis scale of the rect.
         * @param {number} sy   global Y-axis scale of the rect.
         * @param {Rect} rect   Shape component with the rect data.
         * @param {number} x    X-axis position of the point.
         * @param {number} y    Y-axis position of the point.
         * 
         * @returns {boolean}   true if the point is inside the rect, false otherwise. 
         */
        point(posx, posy, rot, sx, sy, rect, x, y)
        {
            x -= posx;
            y -= posy;

            var [rotx, roty] = Collisions.rotate(x, y, rot);
            return abs(rotx) <= rect.w / 2 * sx && abs(roty) <= rect.h / 2 * sy;
        },
    },

    /**
     * Namespace to separate ellipse collision detection.
     * 
     * @namespace
     */
    Ellipse:
    {
        /**
         * Calculates if a point is inside a ellipse.
         * 
         * @param {number} posx global X-axis position of the ellipse. 
         * @param {number} posy global Y-axis position of the ellipse.
         * @param {number} rot  global rotation in degrees of the ellipse.
         * @param {number} sx   global X-axis scale of the ellipse.
         * @param {number} sy   global Y-axis scale of the ellipse.
         * @param {Ellipse} e   Shape component with the ellipse data.
         * @param {number} x    X-axis position of the point.
         * @param {number} y    Y-axis position of the point.
         * 
         * @returns {boolean}   true if the point is inside the ellipse, false otherwise. 
         */
        point(posx, posy, rot, sx, sy, e, x, y)
        {
            x -= posx;
            y -= posy;

            var [rotx, roty] = Collisions.rotate(x, y, rot);
            var srx = e.rx * sx, sry = e.ry * sy;
            return (rotx * rotx) * (sry * sry) + (roty * roty) * (srx * srx) <= (srx * srx) * (sry * sry);
        }
    }
}