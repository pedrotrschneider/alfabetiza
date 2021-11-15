/************************************************************************
 * Vector2.js
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
 * This {@code Vector2} class provides an interface to store a 2D vector as a component to
 * any GameObject.
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Vector2 extends Component
{
    /**
     * Creates a Vector2 with length 0.
     * 
     * @returns {Vector2}   length 0 Vector2.
     */
    static ZERO()
    {
        return new Vector2(0, 0);
    }

    /**
     * Creates a Vector2 with both dimetions equal to 1.
     * 
     * @returns {Vector2}   Vector2 with both dimentions equal to 1.
     */
    static ONE()
    {
        return new Vector2(1, 1);
    }

    /**
     * Creates a Vector2 pointing right.
     * 
     * @returns {Vector2}   Vector2 pointing right.
     */
    static RIGHT()
    {
        return new Vector2(1, 0);
    }

    /**
     * Creates a Vector2 pointing left.
     * 
     * @returns {Vector2}   Vector2 pointing left.
     */
    static LEFT()
    {
        return new Vector2(-1, 0);
    }

    /**
     * Creates a Vector2 pointing up.
     * 
     * @returns {Vector2}   Vector2 pointing up.
     */
    static UP()
    {
        return new Vector2(0, -1);
    }

    /**
     * Creates a Vector2 pointing down.
     * 
     * @returns {Vector2}   Vector2 pointing down.
     */
    static DOWN()
    {
        return new Vector2(0, 1);
    }

    /**
     * Initializes a Vector2 with the given dimentions.
     * @param {number} x 
     * @param {number} y 
     * 
     * @constructor
     */
    constructor(x, y)
    {
        super();

        this.x = x;
        this.y = y;
    }

    /**
     * Creates a Vector2 with de dimentions equal to the absolute value of
     * this Vector2's dimentions.
     * 
     * @returns {Vector2}   created Vector2.
     */
    abs()
    {
        return new Vector2(abs(this.x), abs(this.y));
    }

    /**
     * Returns this Vector2's angle in radians with respect to the positive X axis,
     * or the (1, 0) vector.
     *  
     * @returns {number}    angle in radian between this Vector2 and the positive X axis.
     */
    angle()
    {
        return atan2(this.y, this.x);
    }

    /**
     * Returns this Vector2's length squared.
     * 
     * @returns {number}    this Vector2's length squared.
     */
    lengthSquared()
    {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * Returns this Vector2's length.
     * 
     * @returns {number}    this Vector2's length. 
     */
    length()
    {
        return sqrt(this.lengthSquared());
    }

    /**
     * Creates a Vector2 with length 1 pointing in the same direction of this Vector2.
     * 
     * @returns {Vector2}   normalized vector.
     */
    normalized()
    {
        let len = this.length();
        return new Vector2(this.x / len, this.y / len);
    }

    /**
     * Returns this Vector2's distance squared to another Vector2.
     * 
     * @param {Vector2} v   Vector2 to calculate the distance to.
     * 
     * @returns {number}    distance squared between this Vector2 and the provided
     *                      Vector2. 
     */
    distanceSquaredTo(v)
    {
        return new Vector2(v.x - this.x, v.y - this.y).length();
    }

    /**
     * Returns this Vector2's distance to another Vector2.
     * 
     * @param {Vector2} v   Vector2 to calculate the distance to.
     * 
     * @returns {number}    distance between this Vector2 and the provided
     *                      Vector2. 
     */
    distance(v)
    {
        return sqrt(this.distanceSquaredTo(v));
    }
}