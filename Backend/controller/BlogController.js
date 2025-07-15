const blog = require('../models/Blog');   

const post  = async (req, res) => {
    if (!req.body.title || !req.body.contentLink) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try{
        const newBlog = new blog({
            title: req.body.title,
            description: req.body.description || "",
            contentLink: req.body.contentLink,
        });

        await newBlog.save();

        res.status(201).json({
            message: "Blog posted successfully",
            blog: {
                id: newBlog._id,
                title: newBlog.title,
                description: newBlog.description,
                contentLink: newBlog.contentLink,
                createdAt: newBlog.createdAt,
                updatedAt: newBlog.updatedAt
            }
        });
    }
    catch (error) {
        console.error("Error posting blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const allPosts = async (req, res) => {
    try {
        const blogs = await blog.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Blogs fetched successfully",
            blogs: blogs.map(b => ({
                id: b._id,
                title: b.title,
                description: b.description,
                contentLink: b.contentLink,
                createdAt: b.createdAt,
                updatedAt: b.updatedAt
            }))
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    post,
    allPosts
};