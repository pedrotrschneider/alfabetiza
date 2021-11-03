/************************************************************************
 * ColorPicker.js
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

class ColorPicker extends UIObject
{
    constructor(name, color = "#FFFFFF")
    {
        super(name);

        this.P5Element = createColorPicker(color);
        this.setPosition(0, 0);
        this.setStyle(DEFAULT_STYLE);

        this.connectCallbacks();
    }

    getColor()
    {
        return this.P5Element.color();
    }
}