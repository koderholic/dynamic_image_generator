const generateImage = require('./imageGenerator.js');
const app = require('express')();


app.get('/', async (req, res) => {
    try {
        
        // Default elements
        let capTrait = './images/cap.png';
        let glassesTrait = './images/glasses.png';

        const urlQuery = req.query;
        console.log(urlQuery);

        if (urlQuery.baseImg) {
            baseImg = urlQuery.baseImg;
        }
        if (urlQuery.cap) {
            capTrait = urlQuery.cap;
        }
        if (urlQuery.glasses) {
            glassesTrait = urlQuery.glasses;
        }

        const elements = [
            { type: 'image', path: capTrait, width: 95, height: 95, color: 'red', traitType:'head'},
            { type: 'image', path: glassesTrait, width: 100, height: 50, font: '20px Arial', color: 'blue', traitType:'eye' }
        ];
        await generateImage('./images/cat.png', elements, './images/newCat.png');
        res.sendFile(__dirname + '/images/newCat.png')

    } catch (error) {
        res.status(500).send('An error occurred while generating the image > ' + error);
    } 
});

app.listen(3030, () => console.log('Server running on port 3000'));