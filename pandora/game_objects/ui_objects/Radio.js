/************************************************************************
 * Radio.js
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

class Radio extends UIObject
{
    constructor(name)
    {
        super(name);

        this.P5Element = createRadio();
        this.setPosition(10, 10);
        this.setStyle(STYLE.DEFAULT_STYLE);
        this.multiLine = false;

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

        if (this.multiLine) this.makeMultiline();
    }


    // TODO make this work question mark?
    // removeOption(value)
    // {
    //     this.P5Element.remove(value);
    // }

    makeMultiline()
    {
        this.multiLine = true;
        const inputs = selectAll('input', this.P5Element),
            labels = selectAll('label', this.P5Element),
            len = inputs.length;

        for (let i = 0; i < len; ++i)
            createDiv().parent(this.P5Element).child(inputs[i]).child(labels[i]);

        this.fixRadioDivElement();
    }

    fixRadioDivElement()
    {
        this.P5Element._getInputChildrenArray = function()
        {
            return this.elt.getElementsByTagName('input');
        }
    }

    // Callbacks
    _onChanged()
    {
        console.log(this.getSelected());
    }

    onChanged()
    {
        this.pandoraObject._onChanged();
    }
}