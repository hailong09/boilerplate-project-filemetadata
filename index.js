var express = require('express');
var cors = require('cors');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const bodyparser = require('body-parser');

require('dotenv').config()




var app = express();


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/uploads', express.static(process.cwd() + '/uploads'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  try {
    const { originalname, mimetype, size } = req.file
    console.log(req.file)


    return res.json({
      name: originalname,
      type: mimetype,
      size: size
    })

  } catch (err) {
    console.error(err)
  }
})





const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
