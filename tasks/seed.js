const connection = require("../data/mongoConnection");
const templates = require("../data/templateFlyers");

const main = async() => {
    const db = await connection();
    await db.dropDatabase();
    const elements = [
        {
            text: "Line 1",
            color: "rgb(0,0,0)",
            size: "20px"
        },
        {
            text: "Line 2",
            color: "rgb(0,0,0)",
            size: "20px"
        },
        {
            text: "Line 3",
            color: "rgb(0,0,0)",
            size: "20px"
        },
        {
            text: "Line 4",
            color: "rgb(0,0,0)",
            size: "20px"
        }
    ];
    await templates.create('andrej-lisakov-679177-unsplash.jpg', elements);
    await templates.create('annie-spratt-469221-unsplash.jpg', elements);
    await templates.create('bogomil-mihaylov-768373-unsplash.jpg', elements);
    await templates.create('nordwood-themes-162462-unsplash.jpg', elements);
    
    db.serverConfig.close();
};

main().catch(error => {
    console.log(error);
});