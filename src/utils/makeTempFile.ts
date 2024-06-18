import fs from 'fs';
import path from 'path';

const makeTempFile = async (file, gfs)=> {

    const tempFilePath = path.join(__dirname, 'tmp', `${file._id}-${file.filename}`);
    const writeStream = fs.createWriteStream(tempFilePath); // Create a write stream for the temporary file
    const readStream = await gfs.createReadStream(file._id); // Create a read stream for the GridFS file

    return new Promise((resolve, reject) => {
        readStream.on('error', reject);
        readStream.pipe(writeStream);
        writeStream.on('finish', () => {
            setTimeout(function cleanupTempFile(filePath) {
                  fs.unlink(filePath, (err) => {
                    if (err) {
                      console.error('Error deleting temporary file:', err);
                    } else {
                        console.log(`File ${filePath} deleted successfully`);
                    }
                  });
                }, 7500);
            resolve(tempFilePath)
        });
        writeStream.on('error', reject);
    });
}

export default makeTempFile;