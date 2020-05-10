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
    const { filename: image } = request.file;

    //para saber o que usar no sharp basta dar um console.log
    // no resquest.file e verificar o conteudo do path.
    //console.log("Path", request.file.path);

    //salvando em JPG
    const [name] = image.split(".");
    const fileName = `${name}.jpg`;

    await sharp(request.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(request.file.destination, "resized", fileName));

    //request.file.destination é encontrado dentro das propriedades
    //request.file

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
