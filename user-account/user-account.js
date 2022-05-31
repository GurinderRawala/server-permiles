
class UserAccount {
    constructor (id) {
        this.id = id
    }

    static fromData = (data) => {
        const userAccount = new UserAccount(data.id)
        
        userAccount.firstname =  data.firstname  
        userAccount.lastname = data.lastname
        userAccount.username = data.username 
        userAccount.email = data.email 
        userAccount.password = data.password
        userAccount.company = data.company 
        userAccount.address= data.address 
        userAccount.active = data.active 
        userAccount.awaitingSignup = data.awaitingSignup 
        userAccount.role = data.role 
        userAccount.filepath = data.filepath 
        userAccount.reg_date = data.reg_date 
        userAccount.clientid = data.clientid 
        userAccount.token = data.token

        return userAccount
    }

    static createInviteUser(data, client, {clock, token}){
        const inviteUser = {
            ...data,
            password : 'NEWPASSWORD',
            active: false,
            awaitingSignup: true,
            createdAt: clock(),
            clientid: client.id,
            company: client.name,
            token: token.create({ 
                id: data.id,
                clientid: client.id,
                email: data.email
            }, {
                expiresIn: '48h'
            })
        }
        return this.fromData(inviteUser)
    }
    static async createActiveUserAccount (data, { hashingService, log }){
        const hash = await hashingService.hash(data.password, ( err, results ) =>{
            if(err){
                throw new Error(err)
            }
            return results
        })
        log.info("password hashed")
        return {
            ...data,
            password: hash,
            active: true,
            awaitingSignup: false
        }
    }
    static async createSigninUserAccount (data, { hashingService, log }){
        const {  password, hashedPassword } = data
        const verifyPassword = await hashingService
            .verify(password, hashedPassword, 
                (err, response) =>{
                    if(err){
                        throw new Error(err)
                    }
                    return response
                })
        log.info(verifyPassword, 'Password verification response')
        return verifyPassword
    }

}
module.exports = { UserAccount }
