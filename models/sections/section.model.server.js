const mongoose = require('mongoose');
const sectionSchema = require('./section.schema.server');
const sectionModel = mongoose.model('SectionModel', sectionSchema);

// const enrollmentSchema = require('../enrollment/enrollment.schema.server');
// const enrollmentModel = mongoose.model('EnrollmentModel', enrollmentSchema);
const userModel = require('../user/user.model.server');
const enrollmentModel = require('../enrollment/enrollment.model.server');

findAllSections = () =>
  sectionModel.find();

findAllSectionsForCourse = courseId =>
  sectionModel.find({ courseId: courseId });

createSection = section => {
  section.enrolled = 0;
  return sectionModel.create(section);
}

deleteSection = sectionId => {
  enrollmentModel.findSections(sectionId).then(enrollments => {
    enrollments.forEach(element => {
      enrollmentModel.removeEnrollment(123, element._id).then(ans => {
      })
    });
  })
  return sectionModel.findByIdAndRemove(sectionId);
}

updateSection = updatedSection => {
  sectionModel.findById(updatedSection._id)
  .then(section => {
    section.title = updatedSection.title;
    section.capacity = updatedSection.capacity;
    section.save();
  }
  )
}

findSectionById = sectionId =>
  sectionModel.findById(sectionId)

module.exports = {
  findAllSections,
  findAllSectionsForCourse,
  createSection,
  deleteSection,
  findSectionById,
  updateSection
};