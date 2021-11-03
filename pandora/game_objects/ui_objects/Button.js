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

class Button extends UIObject
{
    constructor(name, label = "Button")
    {
        super(name);

        this.P5Element = createButton();
        this.label = label;
        this.P5Element.html(label);
        this.P5Element.position(0, 0);

        this.setStyle(DEFAULT_STYLE);

        this.connectCallbacks();
    }

    setLabel(label)
    {
        this.label = label;
        this.P5Element.html(label);
    }
}