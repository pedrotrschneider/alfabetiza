/************************************************************************
 * Shape.js
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
 * This {@code Shape} class represents the base class all Shape components inherit from.
 * 
 * ! This is an empty class the serves only to be inherited from to organize the hierarchy.
 * ! This class should not bet used by the user.
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Shape extends Component
{
    /**
     * Creates an empty Shape Component.
     * 
     * @constructor
     */
    constructor()
    {
        super();
    }
}