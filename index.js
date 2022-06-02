const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();
const multer = require('multer');
const path = require('path');



const myURL = new URL('https://still-stream-52303.herokuapp.com/');


const port = process.env.PORT || 5000;

app.use("/image", express.static(__dirname + "/public/upload"));


router.get("/", (req, res) => {
    res.send({ message: "pratctice server is running" });
})



const uploadfolder = "./public/upload/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadfolder)
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + extension)
    }
})

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: (req, file, cb) => {

        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {

            cb(null, true);
        } else {

            cb(null, false);
            return cb(new Error("only jpg,png,jpeg is allowed"));
        }

    }

})

const myuoload = upload.array("image", 3);

app.post("/image", (req, res) => {
    myuoload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {

            return res.send({ message: err.message })
        } else {
            console.log(req.files);
            const dirname = req.files.map((val) => myURL.href + "image/" + val.filename);
            console.log(dirname);
            res.send({ message: "file upload success", link: dirname[0] })
        }

    })



})



router.use((req, res) => {
    res.send({ message: "404 api not found" })
})

app.use(router)
app.listen(port, () => {
    console.log(`your server is running on ${port}`);
})