/************************************************************************
 * CheckBox.js
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

class CheckBox extends UIObject
{
    constructor(name, label = "checkbox", val = false)
    {
        super(name);

        this.label = label;
        this.P5Element = createCheckbox(label, val);
        this.P5Element.position(0, 0);

        this.setStyle(DEFAULT_STYLE);

        this.connectCallbacks();
        this.P5Element.changed(this.onChanged);
    }

    setLabel(label)
    {
        this.label = label;
        this.P5Element.html(label);
    }

    _onChanged()
    {
        console.log(this.P5Element.checked());
    }

    onChanged()
    {
        this.pandoraObject._onChanged();
    }
}