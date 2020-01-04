module.exports = (app) => {
    const studentProfile = require('../controllers/studentProfile.controller.js');

    // Create a new student
    // app.post('/student', student.create);

    // // Retrieve all students
    // app.get('/student', student.findAll);

    // // Retrieve a single student with studentId
    // app.get('/student/:studentId', student.findOne);

    // Update a student profile pic of a student
    app.put('/studentProfile/:studentId', studentProfile.update);

    // Delete a student with studentId
    // app.delete('/student/:studentId', student.delete);
}