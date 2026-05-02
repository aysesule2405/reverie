const Atmosphere = require('../models/Atmosphere');

// GET /api/atmospheres
exports.list = async (req, res, next) => {
  try {
    const { category, tag, q, mine } = req.query;
    const filter = {};

    // "mine=true" returns all of the authenticated user's spaces (any visibility)
    if (mine === 'true' && req.user) {
      filter.createdBy = req.user._id;
    } else {
      filter.visibility = 'public';
    }

    if (category) filter.category = category;
    if (tag) filter.moodTags = tag;
    if (q) filter.title = { $regex: q, $options: 'i' };

    const items = await Atmosphere.find(filter)
      .populate('createdBy', 'name avatarUrl')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// GET /api/atmospheres/:id
exports.get = async (req, res, next) => {
  try {
    const item = await Atmosphere.findById(req.params.id).populate('createdBy', 'name avatarUrl');
    if (!item) return res.status(404).json({ message: 'Mood space not found' });
    if (
      item.visibility === 'private' &&
      (!req.user || item.createdBy._id.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({ message: 'This mood space is private' });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// POST /api/atmospheres
exports.create = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });
    const data = { ...req.body, createdBy: req.user._id };
    const created = await Atmosphere.create(data);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

// PUT /api/atmospheres/:id
exports.update = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });
    const item = await Atmosphere.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Mood space not found' });
    if (item.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own mood spaces' });
    }
    Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/atmospheres/:id
exports.remove = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });
    const item = await Atmosphere.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Mood space not found' });
    if (item.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own mood spaces' });
    }
    await Atmosphere.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mood space deleted' });
  } catch (err) {
    next(err);
  }
};
