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

const AssetHandler = {
    cachedTextures: [],
    cachedAudio: [],
    cachedFonts: [],

    loadTexture: function(name, link)
    {
        let textRes = new TextureRes(name, null);
        this.cachedTextures.push(textRes);
        loadImage(link, img =>
        {
            textRes.P5Image = img;
        });
    },

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

    loadAudio: function(name, link)
    {
        let audio = createAudio(link);
        this.cachedAudio.push(new AudioRes(name, audio));
    },

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

    loadFont: function(name, link)
    {
        let fontRes = new FontRes(name, null);
        this.cachedFonts.push(fontRes);
        loadFont(link, font =>
        {
            fontRes.P5Font = font;
        })
    },

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