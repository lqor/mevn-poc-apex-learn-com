const Post = require('../models/posts');

module.exports = class API {
    // Fetch all posts
    static async fetchAllPost(req, res) {
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    // Fetch post by id
    static async fetchPostByID(req, res) {
        res.send('Hello post by id');
    }

    // Create new post
    static async createPost(req, res) {
        const post = req.body;
        
        try {
            await Post.create(post);
            res.status(201).json({ message: 'Post created successfully!' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // update a post
    static async updatePost(req, res) {
        res.send('Hello update post');
    }

    // delete a post
    static async deletePost(req, res) {
        res.send('Hello delete post');
    }

    static async uploadImage(req, res) {
        res.send('Hello upload image');
    }

    /*
    app.get('/oauth2/auth', (req, res) => {
  res.redirect(oauth2.getAuthorizationUrl({ scope: 'full' }));
});
    */
    static async getAuthorizationUrl(req, res) {
        console.log('Hello getAuthorizationUrl');
        res.redirect(oauth2.getAuthorizationUrl({ scope: 'full' }));
    }

    /**
     * 
app.get('/oauth2/callback', (req, res) => {
    const conn = new jsforce.Connection({ oauth2 });
    const code = req.query.code;
    conn.authorize(code, (err, userInfo) => {
      if (err) {
        return res.status(500).send('Error during authorization');
      }

      req.session.accessToken = conn.accessToken;
      req.session.instanceUrl = conn.instanceUrl;
      res.redirect('/thankyou');
    });
  });
     */
    static async callback(req, res) {
        const conn = new jsforce.Connection({ oauth2 });
        const code = req.query.code;

        conn.authorize(code, (err, userInfo) => {
            if (err) {
                return res.status(500).send('Error during authorization');
            }

            req.session.accessToken = conn.accessToken;
            req.session.instanceUrl = conn.instanceUrl;
            res.redirect('/thankyou');
        });
    }
}