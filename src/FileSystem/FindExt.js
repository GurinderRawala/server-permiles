module.exports = (filename) =>{
    const fileExt = filename.split('.')
    const Ext = fileExt[fileExt.length - 1].toLowerCase()
    return Ext;
}