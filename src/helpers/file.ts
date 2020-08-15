import { dirname } from "path";

const fs = require('fs');
const PATH_TO_FILE = `${__dirname}/../resources/`;

export class File {
    async saveFile(fileName: string, data: Array<any>) {
        try {
            if (!data)
                throw new Error(`Invalid data ${fileName}`);

            const dataStr = JSON.stringify(data);
            
            await new Promise((resolve, reject) => {
                fs.writeFile(`${PATH_TO_FILE}${fileName}.json`, dataStr, (err) => {
                    if (err)
                        reject(err);
                    resolve();
                });
            });
            console.log(`file ${fileName} integrated at ${Date()}`)
        } catch (error) {
            console.error(`[ERROR] - ${Date()}`)
            console.log(error)
        }
    };
}