const Post = require("../models/Post");

module.exports = {
  async store(request, response) {
    const post = await Post.findById(request.params.id);

    post.likes += 1;

    await post.save();

    request.io.emit("Like", post);

    return response.json(post);
  },
};
