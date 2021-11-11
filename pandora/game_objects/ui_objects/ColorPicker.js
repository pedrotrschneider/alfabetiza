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

/**
 * The {@code ColorPicker} class represents an UIObject that holds and HTML color picker.
 * 
 * ! All GameObjects need to be inside the tree to do anything (can be added as a child
 * ! of another GameObject on the tree or as a root).
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class ColorPicker extends UIObject
{
    /**
     * @constructor
     * Initializes an empty ColorPicker with the specified parameters.
     * 
     * @param {String} name             name for the ColorPicker GameObject.
     * @param {p5.Color, String} color  default color for the ColorPicker
     */
    constructor(name, color = "#FFFFFF")
    {
        super(name);

        this.P5Element = createColorPicker(color); // This Button's HTML color picker.
        this.setPosition(0, 0); // Set the position of the ColorPicker on the secondary buffer.

        this.setStyle(STYLE.DEFAULT_STYLE); // Set the default style of the UIObject.

        this.connectCallbacks(); // Connect the events of the p5.Element.
    }

    /**
     * Sets the color of this ColorPicker UIObject.
     * 
     * @param {p5.Color, String} col    new color for this ColorPicker.
     */
    setColor(col)
    {
        this.P5Element.color(col);
    }

    /**
     * Returns this ColorPicker's color.
     * 
     * @returns {p5.Color}  this ColorPicker's color.
     */
    getColor()
    {
        return this.P5Element.color();
    }
}