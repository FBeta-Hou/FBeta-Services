const Location = require("../../model/location.model");

exports.index = async (req, res) => {
    const locations = await Location.find({});

    const titleKey = process.env.Maptileskey;
    const apiKey = process.env.APIKey
    

    res.render('client/pages/map/index', 
        {
            title: 'FBeta - Map',
            maptitleskey: JSON.stringify(titleKey),
            APIKey: JSON.stringify(apiKey),
            locations: JSON.stringify(locations),
        });
}

exports.direction = (req, res) => {
    const titleKey = process.env.Maptileskey;
    const apiKey = process.env.APIKey

    res.render('client/pages/map/direction', 
        {
            maptitleskey: "'" + titleKey + "'",
            APIKey: "'" + apiKey + "'",
        });
}

exports.weather = (req, res) => {
    const titleKey = process.env.Maptileskey;
    const apiKey = process.env.APIKey

    res.render('client/pages/map/weather', 
        {
            maptitleskey: "'" + titleKey + "'",
            APIKey: "'" + apiKey + "'",
        });
}
    



