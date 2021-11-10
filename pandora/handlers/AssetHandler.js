/************************************************************************
 * AssetHandler.js
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
 * This {@code AssetHandler} singleton provides an interface for the user
 * to load various types of assets to memory.
 * 
 * @author Pedro Schneider
 * 
 * @namespace
 */
const AssetHandler = {
    cachedTextures: [], // Cache for TextureRes.
    cachedAudio: [], // Cache for AudioRes.
    cachedFonts: [], // Cache for FontRes.

    /**
     * Loads an image to cache as a TextureRes. Can be loaded from a request to a server
     * or from a local path to a file. The recomended place to call this function is
     * inside preload for static loading, but it can also be called dynamically inside
     * the game.
     * 
     * @param {String} name name for the TextureRes to be saved as.
     * @param {String} link link to load the image file from (server or local).
     */
    loadTexture: function(name, link)
    {
        let textRes = new TextureRes(name, null);
        this.cachedTextures.push(textRes);
        loadImage(link, img =>
        {
            textRes.P5Image = img;
        });
    },

    /**
     * Query a TextureRes by its name.
     * 
     * @param {String} name name of the requested TextureRes.
     * 
     * @returns reference to the first loaded TextureRes whose name matches
     *          the parameter, or null if no TextureRes matches the name.
     */
    getTextureByName: function(name)
    {
        for (let i = 0; i < this.cachedTextures.length; i++)
        {
            if (this.cachedTextures[i].name == name)
            {
                return this.cachedTextures[i];
            }
        }
        return null;
    },

    /**
     * Query a p5.Image by the name of the TextureRes it was loaded as.
     * 
     * @param {String} name name of the TextureRes that holds the desired
     *                      p5.Image.
     * 
     * @returns p5.Image held by the first loaded TextureRes whose name
     *          matches the parameter, or null if no TextureRes matches the name.
     */
    getP5ImageByName: function(name)
    {
        for (let i = 0; i < this.cachedTextures.length; i++)
        {
            if (this.cachedTextures[i].name == name)
            {
                return this.cachedTextures[i].P5Image;
            }
        }
        return null;
    },

    /**
     * Loads an audio to cache as an AudioRes. Can be loaded from a request to a server
     * or from a local path to a file. The recomended place to call this function is
     * inside preload for static loading, but it can also be called dynamically inside
     * the game.
     * 
     * @param {String} name name for the AudioRes to be saved as.
     * @param {String} link link to load the audio file from (server or local).
     */
    loadAudio: function(name, link)
    {
        let audio = createAudio(link);
        this.cachedAudio.push(new AudioRes(name, audio));
    },

    /**
     * Query an AudioRes by its name.
     * 
     * @param {String} name name of the requested AudioRes.
     * 
     * @returns reference to the first loaded AudioRes whose name matches
     *          the parameter, or null if no AudioRes matches the name.
     */
    getAudioByName: function(name)
    {
        for (let i = 0; i < this.cachedAudio.length; i++)
        {
            if (this.cachedAudio[i].name == name)
            {
                return this.cachedAudio[i];
            }
        }
        return null;
    },

    /**
     * Query a p5.Audio by the name of the AudioRes it was loaded as.
     * 
     * @param {String} name name of the AudioRes that holds the desired
     *                      p5.Audio.
     * 
     * @returns p5.Audio held by the first loaded AudioRes whose name
     *          matches the parameter, or null if no AudioRes matches the name.
     */
    getP5AudioByName: function(name)
    {
        for (let i = 0; i < this.cachedAudio.length; i++)
        {
            if (this.cachedAudio[i].name == name)
            {
                return this.cachedAudio[i].P5Audio;
            }
        }
        return null;
    },

    /**
     * Loads a font to cache as FontRes. Can be loaded from a request to a server
     * or from a local path to a file. The recomended place to call this function is
     * inside preload for static loading, but it can also be called dynamically inside
     * the game.
     * 
     * @param {String} name name for the FontRes to be saved as.
     * @param {String} link link to load the font file from (server or local).
     */
    loadFont: function(name, link)
    {
        let fontRes = new FontRes(name, null);
        this.cachedFonts.push(fontRes);
        loadFont(link, font =>
        {
            fontRes.P5Font = font;
        })
    },

    /**
     * Query a FontRes by its name.
     * 
     * @param {String} name name of the requested FontRes.
     * 
     * @returns reference to the first loaded FontRes whose name matches
     *          the parameter, or null if no FontRes matches the name.
     */
    getFontByName: function(name)
    {
        for (let i = 0; i < this.cachedFonts.length; i++)
        {
            if (this.cachedFonts[i].name == name)
            {
                return this.cachedFonts[i];
            }
        }
        return null;
    },

    /**
     * Query a p5.Font by the name of the FontRes it was loaded as.
     * 
     * @param {String} name name of the FontRes that holds the desired
     *                      p5.Font.
     * 
     * @returns p5.Font held by the first loaded FontRes whose name
     *          matches the parameter, or null if no FontRes matches the name.
     */
    getP5FontByName: function(name)
    {
        for (let i = 0; i < this.cachedFonts.length; i++)
        {
            if (this.cachedFonts[i].name == name)
            {
                return this.cachedFonts[i].P5Font;
            }
        }
        return null;
    }
};