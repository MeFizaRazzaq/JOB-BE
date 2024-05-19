const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Chat model
const chatSchema =  Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'EmployeeModel',
        required: true
    },
    employer: {
        type: Schema.Types.ObjectId,
        ref: 'EmployerModel',
        required: true
    },
    messages: [
        {
            sender: {
                type: String,
                enum: ['employee', 'employer'],
                required: true
            },
            message: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const ChatModel = mongoose.model('Chat', chatSchema);

module.exports = ChatModel;
