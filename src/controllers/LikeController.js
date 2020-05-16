const Post = require("../models/Post");

module.exports = {
  async store(request, response) {
    const post = await Post.findById(request.params.id);

    post.likes += 1;

    await post.save();

    return response.json(post);
  },
};
