import News from "../models/News.js";


// GET ALL NEWS
export const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });

    res.json(news);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// CREATE NEWS
export const createNews = async (req, res) => {
  try {
    const { title, content } = req.body;

    const news = await News.create({
      title,
      content,
      author: req.user.name
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// UPDATE NEWS
export const updateNews = async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// DELETE NEWS
export const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);

    res.json({
      message: "News deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};