


module.exports = class FakeFS {
    constructor() {
        this.files = {}
    }

    async mkdir(path) {
        return true
    }

    async access(path, fsCode){
       if (this.files[path] == undefined){
            throw new Error("path not found")
       }

    }

    async writeFile(path, data) {
        this.files[path] = data;
    }

    async readFile(path) {
        const content = this.files[path];
        return content;
    }
}