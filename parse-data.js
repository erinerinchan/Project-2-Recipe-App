const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const dirname = process.env.NODE_ENV === "production" ? '/tmp' : './tmp';

console.log('has tmp', fs.existsSync(dirname))
if (!fs.existsSync(dirname)) {
  console.log('created tmp')
  fs.mkdirSync(dirname);
}

const parseData = (req, res, next) => {
  const form = formidable({
    uploadDir: dirname,
    keepExtensions: true,
    multiples: true,
  });

  if (req?.headers?.["content-type"]?.includes("multipart/form-data")) {
    form.parse(req, (err, fields, files) => {
      if (err) return res.status(500).json(err);

      req.body = fields;
      req.files = files;

      Object.keys(files).forEach((key) => {
        if (files[key].size > 0) {
          _.set(req.body, key, files[key]);
        } else {
          fs.unlinkSync(files[key].filepath);
          delete req.files[key];
        }
      });

      return next();
    });
  } else {
    next();
  }
};

module.exports = parseData;
