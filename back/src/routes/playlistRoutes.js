const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({ where: { userId: req.user.id } });

    if (!playlist) {
        playlist = await Playlist.create({ userId: req.user.id, videos: [] });
        return res.status(201).json({ message: "Playlist created", videos: [] });
    }

    res.status(200).json({ videos: playlist.videos });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});


router.post("/videos", authenticateToken, async (req, res) => {
  const { videoId } = req.body;

  try {
    const playlist = await Playlist.findOne({ where: { userId: req.user.id } });

    if (!playlist) {
        playlist = await Playlist.create({ userId: req.user.userId, videos: [] });
    }

    const updatedVideos = Array.from(new Set([...playlist.videos, videoId]));

    playlist.videos = updatedVideos;
    await playlist.save();

    res.status(200).json({ message: "Videos added successfully", videos: playlist.videos });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

router.delete("/videos/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const playlist = await Playlist.findOne({ where: { userId: req.user.id } });

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    const updatedVideos = playlist.videos.filter(videoId =>  videoId !== id);

    playlist.videos = updatedVideos;
    await playlist.save();

    res.status(200).json({ message: "Videos removed successfully", videos: playlist.videos });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

module.exports = router;
