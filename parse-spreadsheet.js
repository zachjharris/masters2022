//const data = require('./picks.csv');
const fs = require('fs');
(async() => {
    const data = fs.readFileSync('./picks.csv', 'utf8');
    let users = data.split('\n');
    console.log(users.length);
    users = users.map((user) => {
        const fields = user.split(',');
        return {
            name: fields[0],
            golfers: [
                fields[1],
                fields[2],
                fields[3],
                fields[4],
                fields[5],
                fields[6]
            ]
        };
    });
    fs.writeFileSync('picks.json', JSON.stringify(users));
    console.log(users[0]);
    /*
    let rows ='';
    try {
        rows = contents.split('\n');
    }
    catch(err) {
        throw new Error(`Could not parse file`);
    }
    let json = [];
    let keys = [];
    rows.forEach((value, index) => {
        if (index < 1) {
            keys = value.toUpperCase().split(',');
        }
        else {
            values = value.split('\t');
            json[index-1] = values.map((value, index) => {
                return {
                    [keys[index]]: value
                }
            }).reduce((currentValue, previousValue) => {
                return {
                    ...currentValue,
                    ...previousValue
                }
            });
        }
    });
    console.log(rows);
    */
})();