const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    console.log('running seedDB')
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "61af34594ccb8ef17a7c9e1f",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'fgdfg df d s  df sd fsfs s s d d f ffffe ew dgs rgs rg srg',
            price,
            geometry:{
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images:[
                {
                    url: 'https://res.cloudinary.com/emaanbashir/image/upload/v1639026780/YelpCamp/p0ya3lfnwgqccgkh40oz.png',
                    filename: 'YelpCamp/p0ya3lfnwgqccgkh40oz'
                  },
                  {
                    url: 'https://res.cloudinary.com/emaanbashir/image/upload/v1639026780/YelpCamp/ryyqptfo6w5l2s9skydv.png',
                    filename: 'YelpCamp/ryyqptfo6w5l2s9skydv'
                  },
                  {
                    url: 'https://res.cloudinary.com/emaanbashir/image/upload/v1639026780/YelpCamp/hr1pl3vnm2gicdtgpu24.png',
                    filename: 'YelpCamp/hr1pl3vnm2gicdtgpu24'
                  }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    console.log("closing")
    mongoose.connection.close();
})