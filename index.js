const request = require("request-promise");
const cheerio = require("cheerio");
const json2csv = require("json2csv").Parser;
const fs = require('fs');

// const url = "https://en.wikipedia.org/wiki/palestine";

async function main()  {
    // Reading fom Text file
    const wordFile = "text.txt";
    const file = fs.readFileSync(wordFile, 'utf8');
    const array = file.replace(/\r\n/g,'\n').split('\n');

    let data =[];

    // words loop from text file
    for(let words of array) {
        let url = "https://en.wikipedia.org/wiki/"+ words;

        const response = await request({
            uri: url,
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9,ar;q=0.8"
            },
            gzip: true
        });
        
        let $ = cheerio.load(response);
        
        // Grappig DOM Elements
        const title = $('#firstHeading').text();
        const info = $('div[role="note"]').text();

        // Updating the array
        let results = [title, info];
        data.push(results);

        // Converting to JSON
        const j2cp = new json2csv();
        const csv = j2cp.parse(data);

        // Writng the results
        fs.writeFileSync('./data.csv', csv, "utf-8");

    }
}
main();