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
            console.log(`file ${fileName} integrated at ${Date()}`);
        } catch (error) {
            console.error(`[ERROR] - ${Date()}`);
            console.log(error);
        }
    };

    async retrieveFileData(fileName: string) {
        try {
            const data: string = await new Promise((resolve, reject) => {
                fs.readFile(`${PATH_TO_FILE}${fileName}.json`, (err, data) => {
                    if (err)
                        reject(err);
                    resolve(data);
                });
            });

            if (!data)
                throw new Error('Invalid Data');
            return JSON.parse(data);
        } catch(error) {
            console.error(`[ERROR] - ${Date()}`);
            console.log(error);
        }
    }
}