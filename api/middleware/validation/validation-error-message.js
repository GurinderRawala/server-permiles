const { validationResult } = require('express-validator');
exports.validationErrorMessage = (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(422)
        return errors.array()
    }
    return null
}