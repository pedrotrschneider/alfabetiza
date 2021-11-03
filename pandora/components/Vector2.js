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

class Vector2
{
    static ZERO()
    {
        return new Vector2(0, 0);
    }
    static ONE()
    {
        return new Vector2(1, 1);
    }
    static RIGHT()
    {
        return new Vector2(1, 0);
    }
    static LEFT()
    {
        return new Vector2(-1, 0);
    }
    static UP()
    {
        return new Vector2(0, -1);
    }
    static DOWN()
    {
        return new Vector2(0, 1);
    }

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    // Methods
    abs()
    {
        return new Vector2(abs(this.x), abs(this.y));
    }

    angle()
    {
        return atan2(this.y, this.x);
    }

    lengthSquared()
    {
        return this.x * this.x + this.y * this.y;
    }

    length()
    {
        return sqrt(this.lengthSquared());
    }

    normalized()
    {
        let len = this.length();
        return new Vector2(this.x / len, this.y / len);
    }

    distanceSquaredTo(v)
    {
        return new Vector2(v.x - this.x, v.y - this.y).length();
    }
}