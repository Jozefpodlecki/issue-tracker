import Issue from '../models/issue'
import { Types } from 'mongoose';

//mongoose.Types.ObjectId

const createIssue = (req, res, next) => {
  
  const project = req.params.project;
  const {
    issue_title = null,
    issue_text = null,
    created_by = null,
    assigned_to = '',
    status_text = ''
  } = req.body

  console.log(req.body);
  console.log(issue_title, issue_text, created_by)  
  if(!issue_title || !issue_text || !created_by) {
    return res.send('missing inputs');
  }
  
  const issue = new Issue({
    project,
    issue_title,
    issue_text,
    created_by,
    assigned_to,
    status_text
  });
  
  issue.save((err, savedIssue) => {
    
    if(err) {
      return next(err)
    }
    
    return res.json(issue);
  });
}

const updateIssue = (req, res) => {
  
  const { project } = req.params;
  const { _id, ...propsToUpdate } = req.body;
  
  Issue.findAndModify({
    _id: new Types.ObjectId(_id)
  }, [['_id', 1]], {
    $set: propsToUpdate
  }, {
    new: true
  }, (err, doc) => {
    
    if(err) {
      return res.send(`could not update ${_id} {err}`);
    }
    
    return res.send('successfully updated') 
            
  });
  
}

const deleteIssue = (req, res) => {
  
  const project = req.params.project;
  const { _id } = req.body;
  
  if (!_id) {
    return res.send('_id error');
  }

  Issue.findAndRemove({
    _id: new Types.ObjectId(_id)
  }, (err, doc) => {
            
    if(err) {
      return res.send(`could not delete ${_id} ${err}`);
    }
    
    res.send(`deleted ${_id}`);
  });
  
}

const getIssues = (req, res) => {
  
  const project = req.params;
  let {
    _id = null,
    open = null
  } = req.query;
  let query: any = {};
  
  if(_id) {
    query._id = Types.ObjectId(_id);
  }
  
  if(open) {
    query.open = open;
  }
  
  Issue.find(query, (err, docs) => {
    
    if(err) {
      return res.send(`${err}`)
    }
    
    res.json(docs);
  });
  
}

export default {
  createIssue,
  updateIssue,
  deleteIssue,
  getIssues
}