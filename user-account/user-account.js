
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
        userAccount.clientId = data.clientId 
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
            clientId: client.id,
            company: client.name,
            token: token.create({ 
                id: data.id,
                username: data.username,
                email: data.email
            }, {
                expiresIn: '48h'
            })
        }
        return this.fromData(inviteUser)
    }
}
module.exports = { UserAccount }
