const path = require('path');
const fs = require("fs");

module.exports = {
    home: (req, res)=>{
        res.render(path.join(__dirname, "../view/web/index.ejs"))
    }
}