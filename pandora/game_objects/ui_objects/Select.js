/************************************************************************
 * Select.js
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

class Select extends UIObject
{
    constructor(name)
    {
        super(name);

        this.P5Element = createSelect();
        this.setPosition(0, 0);
        this.setSize(100, 20);
        this.setStyle(DEFAULT_STYLE);

        this.connectCallbacks();
        this.P5Element.changed(this.onChanged);
    }

    // Setters
    setSelected(value)
    {
        this.P5Element.selected(value);
    }

    // Getters
    getSelected()
    {
        return this.P5Element.selected();
    }

    // Methods
    addOption(value)
    {
        this.P5Element.option(value);
    }

    // TODO confirm if disable methods really dont exist or if
    // something is fucky wooky.

    // disableAll()
    // {
    //     this.P5Element.disable();
    // }

    // disableOption(value)
    // {
    //     this.P5Element.disable(value);
    // }

    // Callbacks
    _onChanged()
    {

    }

    onChanged()
    {
        this.pandoraObject._onChanged();
    }
}