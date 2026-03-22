const Favorite = require('../models/Favorite');
const Atmosphere = require('../models/Atmosphere');

exports.list = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Auth required' });
    const items = await Favorite.find({ userId: req.user._id }).populate({ path: 'atmosphereId', populate: { path: 'createdBy', select: 'name avatarUrl' } });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.add = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Auth required' });
    const atmosphereId = req.params.atmosphereId;
    const atm = await Atmosphere.findById(atmosphereId);
    if (!atm) return res.status(404).json({ message: 'Atmosphere not found' });
    const existing = await Favorite.findOne({ userId: req.user._id, atmosphereId });
    if (existing) return res.status(400).json({ message: 'Already favorited' });
    const fav = await Favorite.create({ userId: req.user._id, atmosphereId });
    res.status(201).json(fav);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Auth required' });
    const atmosphereId = req.params.atmosphereId;
    const fav = await Favorite.findOne({ userId: req.user._id, atmosphereId });
    if (!fav) return res.status(404).json({ message: 'Favorite not found' });
    await fav.remove();
    res.json({ message: 'Removed' });
  } catch (err) {
    next(err);
  }
};
