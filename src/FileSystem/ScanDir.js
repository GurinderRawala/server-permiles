const fs = require('fs')
module.exports = (dir) =>{
   let files = []
   if (fs.existsSync(dir)){
       files = fs.readdirSync(dir).filter(file => !fs.lstatSync(`${dir}/${file}`).isDirectory() )
    }

     return files
}