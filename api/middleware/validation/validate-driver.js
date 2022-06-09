exports.validateDriver = ({ check }, repo, field) =>{
    check(field, `${field} is required`).trim().isUUID()
        .custom(value => repo.findOne({ where:{ field:value } })
            .then(driver =>{
                if(!driver){
                    return Promise.reject(`Driver is not found. Assgin a valid driver`)
                }
            })
        )
}