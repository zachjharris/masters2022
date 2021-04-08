const golfers = require('./golfers.json');
const fs = require('fs');

(async() => {
    const data = golfers.map((golfer) => {
        return {
            id: golfer.id,
            first_name: golfer.first_name,
            last_name: golfer.last_name
        }
    });
    fs.writeFileSync(`data.json`, JSON.stringify(data));
})();