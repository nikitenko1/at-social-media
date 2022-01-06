const Notify = require('../models/Notify');

const notifyCtrl = {
  createNotify: async (req, res) => {
    try {
      const { id, recipients, url, text, content, image } = req.body;
      const notify = new Notify({
        // user: { type: mongoose.Types.ObjectId, ref: 'user' },
        user: req.user._id,
        id,
        recipients,
        url,
        text,
        content,
        image,
      });
      await notify.save();
      return res.json({ notify });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  removeNotify: async (req, res) => {
    try {
      const notify = await Notify.findOneAndDelete({
        id: req.params.id,
        url: req.query.url,
      });

      return res.json({ notify });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = notifyCtrl;
