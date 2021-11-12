/************************************************************************
 * Enums.js
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
 * This {@code Enums} file provides several useful constant enumerators the engine
 * uses internaly. Users may find these useful for calling certain functions.
 * 
 * @author Pedro Schneider
 */


/**
 * Enumerates property types.
 */
const PROPERTY_TYPE = {
    NUMBER: 1,
    VECTOR2: 2,
    COLOR: 3,
};

/**
 * Enumerates shape types.
 */
const SHAPES = {
    RECT: 1,
    ELLIPSE: 2,
};

/**
 * Enumerates transition types.
 */
const TRANS_TYPE = {
    LINEAR: 1,
    QUAD: 2,
    CUBIC: 3,
    QUART: 4,
    QUINT: 5,
    SINE: 6,
    EXPONENTIAL: 7,
    CIRCULAR: 8,
    ELASTIC: 9,
    BACK: 10,
    BOUNCE: 11,
};

/**
 * Enumerates easing types.
 */
const EASE_TYPE = {
    IN: 1,
    OUT: 2,
    IN_OUT: 3,
};


/**
 * Enumerates render modes.
 */
const RENDER_MODES = {
    P2D: 1,
    WEBGL: 2,
};

/**
 * Object to hold information about the default styling of UIOBjects.
 */
const STYLE = {
    DEFAULT_FONT_SIZE: 20,

    DEFAULT_STYLE:
    {
        "font-family": "Lato",
    },
}