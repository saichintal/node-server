module.exports = app => {
    const enrollmentModel = require('../models/enrollment/enrollment.model.server');
  
    app.post('/api/student/:sid/section/:kid', (req, res) => {
        enrollmentModel.enroll(req.params['sid'], req.params['kid']).then(response => {
            if (response == null) {
                res.sendStatus(412);
            }
            else if (response == {}) {
                res.sendStatus(403);
            }
            else {
                res.send(response); 
            }
        }) 
    });
  
    app.get('/api/student/:sid/section', (req, res) => {
        enrollmentModel
        .findSectionsForStudent(req.params['sid'])
        .then(sections => res.send(sections))
    });
  
    app.delete('/api/student/:sid/section/:kid', (req, res) => {
         enrollmentModel.removeEnrollment(req.params['kid'], req.body.id).then(ans =>  
            res.send(ans)
        )
    });
  }