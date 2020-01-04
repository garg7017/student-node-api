const StudentDetail = require('../models/StudentDetail');
const StudentAcedemicDetail = require('../models/StudentAcedemicDetail');
var validator = require('validator');
const bcrypt = require('bcryptjs');


// Create and Save a new Student
exports.create = (req, res) => {
    // console.log(req);

    let errors = [];
    //Validate data
    if (validator.isEmpty(req.body.first_name)) {
        errors.push({ type: 'first_name', message: 'Please enter first name' });
    }
    if (validator.isEmpty(req.body.last_name)) {
        errors.push({ type: 'last_name', message: 'please enter last name' });
    }
    if (validator.isEmpty(req.body.email)) {
        errors.push({ type: 'email', message: 'Please enter Email.' });
    } 
    // if (validator.isEmail(req.body.email)) {
    //     errors.push({ type: 'email', message: 'Email should be valid' });
    // }
    if (validator.isEmpty(req.body.password)) {
        errors.push({ type: 'password', message: 'Please eter password.' });
    } 
    if (validator.isLength(req.body.password, { min: 8 })) {
        errors.push({ type: 'password', message: 'Password length should be min 8' });
    }
    // if (validator.equals(req.body.password, req.body.confirm_password)) {
    //     errors.push({ type: 'password2', message: 'Password & confirm password should match' });
    // }
    // if (validator.isEmpty(req.body.contact_no)) {
    //     errors.push({ type: 'phone_no', message: 'Please enter contact no.' });
    // } else if (!validator.isInt(req.body.contact_no,{min:10,max:10})) {
    //     errors.push({ type: 'phone_no', message: 'Contact no should be of 10 digits' });
    // }
    if (validator.isEmpty(req.body.address_line1)) {
        errors.push({ type: 'address', message: 'Please enter address' });
    }
    if (validator.isEmpty(req.body.city)) {
        errors.push({ type: 'city', message: 'Please enter city' });
    }
    if (validator.isEmpty(req.body.pincode)) {
        errors.push({ type: 'pincode', message: 'Please enter pincode' });
    } 
    // if (validator.isInt(req.body.pincode)) {
    //     errors.push({ type: 'pincode', message: 'Please enter valid pincode' });
    // }
    if (validator.isEmpty(req.body.country)) {
        errors.push({ type: 'pincode', message: 'Please select country' });
    }
    if (validator.isEmpty(req.body.hobbies)) {
        errors.push({ type: 'pincode', message: 'Please enter hobbies' });
    }

    if(errors.length > 0){
        return res.status(200).send(errors);
    } else {
        //save student data

        const newStudent = new StudentDetail({
            sd_first_name: req.body.first_name,
            sd_last_name: req.body.last_name,
            sd_dob: req.body.date,
            sd_email: req.body.email,
            sd_password: req.body.password,
            sd_phone: req.body.contact_no,
            sd_gender: req.body.gender,
            sd_address: req.body.address_line1,
            sd_city: req.body.city,
            sd_zip_code: req.body.pincode,
            sd_state: req.body.state,
            sd_country: req.body.country,
            sd_hobbies: req.body.hobbies,
            sd_applied_course: req.body.course
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newStudent.sd_password, salt, (err, hash) => {
                newStudent.sd_password = hash;

                newStudent.save().then(savedStudent => {
                    var inserted_id = savedStudent._id;
                    //Save X data in student acedamic detais table
                    const StudentAcedemicDetail_X = new StudentAcedemicDetail({
                        sad_student_id: inserted_id,
                        sad_course_name: '10',
                        sad_board: req.body.X_board,
                        sad_percentage: req.body.X_perc,
                        sad_year_of_passing: req.body.X_yop
                    });
                    StudentAcedemicDetail_X.save().then(saveAcademic_X => {
                        console.log("saved X data");
                    })
                    //Save XII data in student acedamic detais table
                    const StudentAcedemicDetail_XII = new StudentAcedemicDetail({
                        sad_student_id: inserted_id,
                        sad_course_name: '12',
                        sad_board: req.body.XII_board,
                        sad_percentage: req.body.XII_perc,
                        sad_year_of_passing: req.body.XII_yop
                    });
                    StudentAcedemicDetail_XII.save().then(saveAcademic_XII => {
                        console.log("saved XII data");
                        return res.status(200).send({
                            message: "User created successfully."
                        });
                    })
                });
            })
        })
    }
};


exports.findAll = (req,res) => {
    StudentDetail.find({}).then(students=>{
        for(student of students){
            StudentAcedemicDetail.find({sad_student_id:student._id}).then(academicDetails=>{
                res.statusCode = 200;
                res.send(students);
            })
        }
    });
}

exports.findOne = (req,res) => {
    id = req.params.studentId;
    StudentDetail.findById(id).then(student=>{
        res.status(200).send(student);
    });
}

exports.delete = (req,res) => {
    id = req.params.studentId;
    StudentDetail.remove({ _id: id }).then(removeStudent => {
        res.status(200).json(`student deleted successfully`);
    });
}


exports.update = (req,res) => {
    id = req.params.studentId;

    StudentDetail.findById(id).then(data=>{
        data.sd_first_name = req.body.first_name;
        data.sd_last_name = req.body.last_name;
        data.sd_dob = req.body.date;
        data.sd_email = req.body.email;
        data.sd_phone = req.body.contact_no;
        data.sd_gender = req.body.gender;
        data.sd_address = req.body.address_line1;
        data.sd_city = req.body.city;
        data.sd_zip_code = req.body.pincode;
        data.sd_state = req.body.state;
        data.sd_country = req.body.country;
        data.sd_hobbies = req.body.hobbies;
        data.sd_applied_course = req.body.course;


        data.save().then(updateStaudentDetail => {
            return res.status(200).send({
                message: "Student updated successfully."
            });
        })
    });
}





