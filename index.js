const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const cc = require("node-console-colors");

const pathImg = path.resolve(__dirname, 'img');
const pathBuild = path.resolve(__dirname, 'build');

fs.stat(pathBuild, (err) => {
    if (!err) {
        clearBuild();
        startMinified();
    }
    else if (err.code === 'ENOENT') {
        fs.mkdirSync(pathBuild);
        clearBuild();
        startMinified();
    }
});


const clearBuild = () => {
    fs.readdir(pathBuild, (err, files) => {

        if (files.length > 0) {
            files.forEach(file => {
                fs.unlink(path.resolve(__dirname, 'build', file), (err) => {
                    //console.log(err)
                });
            });
        } else {
            console.log('No images found')
        }
    });
}

const startMinified = async () => {
    fs.readdir(pathImg, (err, files) => {
        const max = 100;
        let process = 0;
        const iterator = 100 / files.length;
        files.forEach(file => {

            const image = await Jimp.read(path.resolve(__dirname, pathImg, file));

            image.write(path.resolve(__dirname, 'build', file));
            // Jimp.read(path.resolve(__dirname, pathImg, file), (err, images) => {
            //     if (err) throw err;
            //     images
            //         // .resize(1920, 1080, Jimp.RESIZE_BEZIER) // resize
            //         .quality(50) // set JPEG quality
            //         // .greyscale() // set greyscale
            //         .scale(0.5)
            //         .write(path.resolve(__dirname, 'build', file)) // save
            //         // .resize(Jimp.AUTO, 250);
            //     });
                process += iterator;
                console.log(cc.set('fg_green', Math.round(process) + '%'));
                if (process == 100) {
                    console.log(cc.set('fg_black', 'bg_green', 'Process successful'));
                }
        });
    });
}
