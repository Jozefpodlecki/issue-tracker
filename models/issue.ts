import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const exercises = new Schema ({
  project: {
    type: String,
    required: true,
    maxlength: [20, 'project name too long']
  },
  issue_title: {
    type: String,
    required: true,
    maxlength: [20, 'issue title too long']
  },
  issue_text: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  updated_on: {
    type: Date,
    default: Date.now
  },
  assigned_to: {
    type: String,
    default: ''
  },
  open: {
    type: Boolean,
    default: true
  },
  status_text: {
    type: String,
  }
});

export default mongoose.model('issues', exercises);