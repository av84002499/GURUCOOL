const Url = require('../models/Url');
const shortid = require('shortid');

const shorten = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const userId = req.user.userId;

    // Generate a unique short URL
    const shortUrl = shortid.generate();

    // Save the URL to the database
    const url = new Url({ originalUrl, shortUrl, userId });
    await url.save();

    res.json({ originalUrl, shortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const redirect = async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;

    // Find the original URL in the database
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Redirect to the original URL
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { shorten, redirect };
