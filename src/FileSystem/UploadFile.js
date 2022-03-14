
const CreateDir = require("./CreateDir");
const FindExt = require("./FindExt");
const uniqid = require('uniqid'); 

const FilterFiles = (item, dir) =>{
  let Ext = FindExt(item.name);
  if(!['pdf', 'docx', 'jpeg', 'jpg', 'svg', 'png'].includes(Ext)){
    return false;
  }

  let path = `${dir}/${uniqid(`${item.name.replace(`.${Ext}`, '-')}`)}.${Ext}`;

  return path;
}

module.exports = ( req, res ) =>{

  const user = req.user;

  const dir = `./public/${user.username}/${req.body.path}`;
 
  CreateDir(dir)
  console.log(req.files)
   if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({error: 'No Files were uploaded'});
  }

  const FileArray = Object.values(req.files)[0];
if(FileArray.length >  1){

 let Response = {Check: true, err: true}
 FileArray.map((item) =>{
    let path = FilterFiles(item, dir);
    if(!path){
      Response.Check = false;
      return
    }
   
    item.mv(path, (err) =>{
      if(err){ 
        Response.err = false 
        return
      }
      Response = {Check:true, err: true}
    })
  })
console.log(Response)
  if(!Response.Check){
    return res.status(422).send({error: "Only images, pdf and docx files are allowed"})
  }

  if(!Response.err){
    return res.status(422).send({error: "Error uploading file"})
  }

  return res.send({ msg: "File Uploaded"})

}else {

  let path = FilterFiles(FileArray, dir);
  if(!path){
    return res.status(422).send({error: "Only images, pdf and docx files are allowed"})
 }

 FileArray.mv(path, (err) =>{
   if(err){ return res.status(422).send({error: "Error uploading file"}) }
   return res.send({ msg: "File Uploaded"})
 })

   
}
     

}