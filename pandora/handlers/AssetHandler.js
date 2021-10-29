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