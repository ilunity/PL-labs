const fs = require('fs').promises;

const fileName = 'passwords.json';

class PasswordStorage {
    filePath = __dirname + `/../public/${fileName}`;

    async read() {
        const file = await fs.readFile(this.filePath, 'utf-8');
        const json = JSON.parse(file);
        return json;
    }

    async addPasswords(ip, headers, password) {
        const file = await this.read();

        let existingRecord = file[ip];
        if (!existingRecord) {
            existingRecord = {
                headers: {},
                passwords: [],
            }
        }

        existingRecord.headers = headers;
        existingRecord.passwords.push(...password);
        file[ip] = existingRecord;

        await fs.writeFile(this.filePath, JSON.stringify(file));
    }
}

module.exports = new PasswordStorage();
