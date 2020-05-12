const Post = require("../models/Post");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
  async index(request, response) {
    const posts = await Post.find().sort("-createdAt");

    return response.json(posts);
  },

  async store(request, response) {
    const { author, place, description, hashtags } = request.body;
    const path = request.file.path;

    console.log("request.file.path:", request.file.path);
    //para saber o que usar no sharp basta dar um console.log
    // no resquest.file e verificar o conteudo do path.
    //console.log("Path", request.file.path);

    //salvando em JPG
    // const [name] = image.split(".");
    // const fileName = `${name}.jpg`;

    // await sharp(request.file.path)
    //   .resize(500)
    //   .jpeg({ quality: 70 })
    //   .toFile(path.resolve(request.file.destination, "resized", image));

    //request.file.destination é encontrado dentro das propriedades
    //request.file

    await cloudinary.uploader.upload(
      path,
      { public_id: `omnistack07/${fileName}` },
      function (err, image) {
        if (err) {
          console.warn(err);
        } else {
          // console.log("image:", image);
          fs.unlinkSync(path);
          return response.json(image);
        }
      }
    );

    fs.unlinkSync(request.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName,
    });

    request.io.emit("Post", post);

    response.json(post);
  },
};
