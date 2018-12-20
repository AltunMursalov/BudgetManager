const mongoose = require('mongoose')
const UserModel = require('@BudgetManagerModels/user')
const ClientModel = require('@BudgetManagerModels/client')
const BudgetModel = require('@BudgetManagerModels/budget')

const models = {
    User: mongoose.model('User'),
    Client: mongoose.model('Client'),
    Budget: mongoose.model('Budget')
}

module.exports = models;