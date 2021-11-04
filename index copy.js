const request = require("request-promise");
const cheerio = require("cheerio");
const json2csv = require("json2csv").Parser;
const fs = require('fs');

const url = "https://en.wikipedia.org/wiki/palestine";

(async() => {

    let data =[];
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
    // const input = $('input[name="search"]').value = 'hassan';
    const title = $('#firstHeading').text();
    const info = $('div[role="note"]').text();

    data.push({ 
        title,
        info,
    });
    
    console.log(input);
    const j2cp = new json2csv();
    const csv = j2cp.parse(data);

    fs.writeFileSync('./data.csv', csv, "utf-8");
}) ();