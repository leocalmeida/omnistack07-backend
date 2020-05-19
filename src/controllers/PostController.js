const Post = require("../models/Post");
const fs = require("fs");
const cloudinary = require("../config/cloudinaryConfig");

module.exports = {
  async index(request, response) {
    const posts = await Post.find().sort("-createdAt");

    return response.json(posts);
  },

  async store(request, response) {
    // Informações da Imagem
    const { author, place, description, hashtags } = request.body;
    const filePath = request.file.path;
    const fileName = request.file.filename;

    //realizando o upload da Imagem
    const picture = await cloudinary.uploader.upload(
      filePath,
      {
        public_id: `omnistack07/${new Date().toISOString() + fileName}`,
      },
      function (err, image) {
        if (err) {
          console.warn(err);
        }
      }
    );

    //excluindo a imagem do disco.
    fs.unlinkSync(request.file.path);

    // endereço da imagem a ser acessado pelo Backend
    const image = picture.secure_url;

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image,
    });

    return response.json(post);
  },
};
