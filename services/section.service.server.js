module.exports = app => {
  const sectionModel = require('../models/sections/section.model.server');
  app.get('/api/section', (req, res) =>
    sectionModel
      .findAllSections()
      .then(sections => res.send(sections))
  );

  app.put('/api/section', (req, res) => {
    sectionModel
      .updateSection(req.body);
    res.sendStatus(200)
    });

  app.get('/api/course/:courseId/section', (req, res) => 
    sectionModel
      .findAllSectionsForCourse(req.params['courseId'])
      .then(sections => res.send(sections))
  );

  app.post('/api/course/:courseId/section', (req, res) =>
    sectionModel
      .createSection(req.body)
      .then(section => res.send(section))
  )
  app.delete('/api/section/:sid', (req, res) => {
    sectionModel.deleteSection(req.params['sid']).then(ans => res.send(ans)); 
  });

  app.get('/api/section/:sid', (req, res) => {
    sectionModel.findSectionById(req.params['sid']).then(ans => res.send(ans)); 
  });

  app.put('/api/section/:sid', (req, res) => {
    sectionModel
      .updateSection(req.body);
    res.sendStatus(200)
    });

}