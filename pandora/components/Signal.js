/************************************************************************
 * Signal.js
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
 * This {@code Signal} class provides an object to store data about a signal.
 * 
 * ! This class should not be used directly by the user. To add signals to GameObjects
 * ! use the addSignal() method from the object inside the _initSignals() callback.
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Signal
{
    constructor(name)
    {
        this.name = name;
        this.targets = [];
        this.callbacks = [];
    }
}