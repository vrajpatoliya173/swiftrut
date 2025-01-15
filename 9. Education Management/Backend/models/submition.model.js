const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
	course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    grade: {
        type: String,
    },
    submittedAt: {
        type: String,
        require: true
    }
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
