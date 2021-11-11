/************************************************************************
 * Button.js
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
 * The {@code Button} class represents an UIObject that holds and HTML button.
 * 
 * ! All GameObjects need to be inside the tree to do anything (can be added as a child
 * ! of another GameObject on the tree or as a root).
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Button extends UIObject
{
    /**
     * @constructor
     * Initializes an empty Button GameObject.
     * 
     * @param {String} name 
     * @param {String} label 
     */
    constructor(name, label = "Button")
    {
        super(name);

        this.P5Element = createButton(); // This Button's HTML button.
        this.label = label; // This Button's label
        this.P5Element.html(label); // Set the label to the inner HTML of the button.
        this.setPosition(0, 0); // Set the position of the Button on the secondary buffer.

        this.setStyle(STYLE.DEFAULT_STYLE); // Set the default style of the UIObject.

        this.connectCallbacks(); // Connect the events of the p5.Element.
    }

    /**
     * Sets the label on this UIObject's button.
     * 
     * @param {String} label    new label for the button.
     */
    setLabel(label)
    {
        this.label = label;
        this.P5Element.html(label);
    }
}