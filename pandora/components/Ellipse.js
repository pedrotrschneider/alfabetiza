/************************************************************************
 * Ellipse.js
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
 * This {@code Ellipse} class provides an interface to store an ellipse as a component to
 * any GameObject.
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Ellipse
{
    /**
     * Initializes an Ellipse with the given parameters.
     * 
     * @param {number} rx   radius on the X axis. 
     * @param {number} ry   radius on the Y axis. Default is the same as the X axis.
     * 
     * @constructor
     */
    constructor(rx, ry = rx)
    {
        this.rx = rx;
        this.ry = ry;
    }
}