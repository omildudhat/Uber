module.exports = app => {
    const fs = require('fs')
    const util = require('util')
    const unlinkFile = util.promisify(fs.unlink)
    const Customer = require('../models/login.model.js');

    const multer = require('multer')
    const upload = multer({ dest: 'uploads/' })

    const {uploadFile, getFileStream} = require('../controller/s3.js')
    const { checkToken } = require('../middleware/auth.js')
    
    app.get('/images/:key', (req, res) => {
      console.log("++++++",req.body.customerId)
      const key = req.params.key
      const readStream = getFileStream(key)
    
      readStream.pipe(res)
    })
      
      app.post('/images', upload.single('image'), async (req, res) => {
        const file = req.file
        console.log("++++++",file)
        console.log("Here inside routes")
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        console.log(result)
        const key = result.Key
        const customerId = req.body.customerId
        console.log("key customerId", customerId,key)
        Customer.addpicture(req.body.customerId, result.Key, (err,data) => {
          if(err) {
            res.status(500).send({
              message : err.message
            })
          }
          else {
            console.log("----",data)
            res.json({
              message: "Image uploaded",
              key: key
            })
          }
        })
      }) 
};