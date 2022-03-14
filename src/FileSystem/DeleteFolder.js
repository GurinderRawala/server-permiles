const fs = require('fs')
// const path = require('path');
// const ScanDir = require('./ScanDir');

module.exports = (folderpath) =>{
   
   

    // const Scan = ScanDir(folderpath);

    // if( Scan.length !== 0 ){
    //     for (const file of Scan) {
    //         fs.unlink(path.join(folderpath, file), err => {
    //           if (err) console.log(err);
    //         });
    //       }
    // }

if( !fs.existsSync(folderpath) )  { return console.log('Directory not found') }

    fs.rm(folderpath, { recursive: true }, (err) => {
        if (err) {
            console.log(err)
        }
    
        // console.log(`${dir} is deleted!`);
    });


   
}