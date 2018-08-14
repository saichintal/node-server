const mongoose = require('mongoose');
const enrollmentSchema = require('./enrollment.schema.server');
const sectionSchema = require('../sections/section.schema.server');

const enrollmentModel = mongoose.model('EnrollmentModel', enrollmentSchema);
const sectionModel = mongoose.model('SectionModel', sectionSchema);

enroll = (studentId, sectionId) => {
    return enrollmentModel.findOne({ studentId: studentId, sectionId: sectionId }).then(section => {
        if (section != null){
            return {}; 
        }
        return sectionModel.findById(sectionId)
            .then(section => {
                if (section.capacity - section.enrolled > 0) {
                    section.enrolled = parseInt(section.enrolled) + 1;
                    section.save();
                    enrollment = {
                        studentId: studentId,
                        sectionId: sectionId
                    }
                    return enrollmentModel.create(enrollment);
                }
                else {
                    return null;
                }
            })
    })
}

findSectionsForStudent = studentId =>
    enrollmentModel.find({ studentId: studentId }).populate('sectionId');

findSections = sectionId =>
    enrollmentModel.find({ sectionId: sectionId });

removeEnrollment = (sectionId, enrollmentId) => {
    return sectionModel.findById(sectionId).then(section => {
        if (section.enrolled > 0) {
            section.enrolled = parseInt(section.enrolled) - 1;
            section.save();
        }
    }).then(sec => {
        return enrollmentModel.findByIdAndRemove(enrollmentId);
    })
}

module.exports = {
    enroll,
    findSectionsForStudent,
    removeEnrollment,
    findSections,
};