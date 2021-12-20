let users = []
let files = []

export class Snow_Cloud{
    constructor(){
        try{
            users = JSON.parse(Deno.readTextFileSync("./cloud/users.json"))
        } catch(err){}
        this.backupDB()
    }

    backupDB(){
        setInterval(() => {
            Deno.writeTextFileSync("./cloud/users.json", JSON.stringify(users))
        }, 15000)
    }


    async login(username: string, password: string){
        let user = users.find(u => u.username == username)
        if(!user) return false
        if(user.password != password) return false
        return user
    }

    async register(username: string, password: string){
        let user = users.find(u => u.username == username)
        if(user) return false
        users.push({
            username: username, 
            password: password,
            data: []
        })
        return true
    }

    async getFiles(){
        return files
    }

    async uploadFile(file: File){
        files.push(file)
    }

    async deleteFile(file: File){
        files = files.filter(f => f.name != file.name)
    }

    async getFile(file: File){
        return Deno.readFileSync(`./cloud/${file.name}`)
    }

    async getFileName(file: File){
        return file.name
    }

    // to do
}