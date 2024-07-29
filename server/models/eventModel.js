const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  banner: { type: String },
  logo: { type: String },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
}, {
  timestamps: true,
});

eventSchema.index({ title: 1, category: 1 }, { unique: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
