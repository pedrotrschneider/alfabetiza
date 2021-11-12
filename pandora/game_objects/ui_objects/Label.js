/************************************************************************
 * Label.js
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
 * The {@code Lagel} class represents an UIObject that holds and HTML label.
 * 
 * ! All GameObjects need to be inside the tree to do anything (can be added as a child
 * ! of another GameObject on the tree or as a root).
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Label extends UIObject
{
    /**
     * @constructor
     * Initializes and empty Label with the specified parameters.
     * 
     * @param {String} name name for the Label GameObject. 
     * @param {String} text inner HTML text of the label.
     */
    constructor(name, text = "Label")
    {
        super(name);

        this.text = text; // This Label's inner HTML text.
        this.P5Element = createDiv(text); // This Label's HTML label.
        this.setPosition(0, 0); // Set the position of the Label on the secondary buffer.
        this.setSize(200, 50); // Set the size of the Label on the secondary buffer.

        this.setStyle(STYLE.DEFAULT_STYLE); // Set the default style of the UIObject.

        this.connectCallbacks(); // Connect events of the p5.Element.
    }

    /**
     * Sets the text inside this Label's HTML label.
     * 
     * @param {String} t    new text for the label.
     */
    setText(t)
    {
        this.P5Element.html(t);
        this.text = t;
    }

    /**
     * Returns this Label's HTML label's text.
     * 
     * @returns {String}    HTML label's text.
     */
    getText()
    {
        return this.text;
    }
}