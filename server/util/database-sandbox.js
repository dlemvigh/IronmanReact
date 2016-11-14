import mongoose from 'mongoose'
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ironman');

import models from '../models';

console.log("hello", models.SummaryModel);

process.exit();