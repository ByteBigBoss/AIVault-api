const Post = require("../models/Post");

exports.addPost = async (req, res) => {

  const url = req.protocol + '://' + req.get('host');

  console.log(req.userData.userId)

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: `${url}/images/${req.file.filename}`,
    link: req.body.link,
    advantages: JSON.parse(req.body.advantages),
    keyFeatures: JSON.parse(req.body.keyFeatures),
    useCases: JSON.parse(req.body.useCases),
    postCategory: req.body.postCategory,
    creator: req.userData.userId,
  });


  await post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      post: {
        ...createdPost,
        id: createdPost._id
      },
    });
  });
};

exports.getPost = async (req, res) => {
  await Post.findById(req.params.id).then((post) => {
    if (post) {
      console.log(post)
      res.status(201).json(post);
    } else {
      res.status(401).json({
        message: "Post Not Found!",
      });
    }
  }).catch()
}

exports.getAllPost = async (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find()

  let fetchPosts;
  if (pageSize && currentPage) {
    postQuery.skip((currentPage - 1) * pageSize).limit(pageSize);
  }
  await postQuery.then((documents) => {
    fetchPosts = documents;
    return Post.countDocuments();
  }).then((postCount) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: fetchPosts,
      maxPosts: postCount
    });
  });
};

exports.getAllPostByUser = async (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find({creator: req.userData.userId})

  let fetchPosts;
  if (pageSize && currentPage) {
    postQuery.skip((currentPage - 1) * pageSize).limit(pageSize);
  }
  await postQuery.then((documents) => {
    fetchPosts = documents;
    return Post.countDocuments();
  }).then((postCount) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: fetchPosts,
      maxPosts: postCount
    });
  });
};

exports.getAllPostCate =async (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find().populate('postCategory')

  let fetchPosts;
  if (pageSize && currentPage) {
    postQuery.skip((currentPage - 1) * pageSize).limit(pageSize);
  }
  await postQuery.then((documents) => {
    fetchPosts = documents;
    return Post.countDocuments();
  }).then((postCount) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: fetchPosts,
      maxPosts: postCount
    });
  });
};

exports.updatePost = async (req, res) => {

  let imagePath = req.body.imagePath;

  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = `${url}/images/${req.file.filename}`;
  }

  const obj = {
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    link: req.body.link,
    advantages: JSON.parse(req.body.advantages),
    keyFeatures: JSON.parse(req.body.keyFeatures),
    useCases: JSON.parse(req.body.useCases),
    postCategory: req.body.postCategory,
    creator: req.userData.userId,
  }

  await Post.findByIdAndUpdate(req.params.id, obj).then(() => {
    res.status(200).json({ message: "Post Updeted sucessfully" });
  }).catch((err) => {
    console.log(err)
  })
}

exports.deletePost = async (req, res) => {
  await Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
};
