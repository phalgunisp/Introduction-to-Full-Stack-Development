const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

const uri = 'mongodb+srv://phalgunisp:phalguni@phalguni.rjwjeii.mongodb.net/?retryWrites=true&w=majority'; // MongoDB connection URI
const dbName = 'camelWeightDB'; // Name of the database
const collectionName = 'camelWeights'; // Name of the collection

// Create a Mongoose schema
const camelWeightSchema = new mongoose.Schema({
  height: { type: Number, required: true },
  length: { type: Number, required: true },
  stomachRadius: { type: Number, required: true },
  weight: { type: Number, required: true }
});

// Create a Mongoose model based on the schema
const CamelWeight = mongoose.model('CamelWeight', camelWeightSchema);

class CamelWeightDatabase {
  constructor(uri, dbName, collectionName) {
    this.uri = uri;
    this.dbName = dbName;
    this.collectionName = collectionName;
  }

  async connect() {
    try {
      await mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to the MongoDB server');
    } catch (error) {
      console.log('An error occurred while connecting to the MongoDB server:', error);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from the MongoDB server');
    } catch (error) {
      console.log('An error occurred while disconnecting from the MongoDB server:', error);
    }
  }

  async createCamelWeight(height, length, stomachRadius) {
    try {
      const weight = this.calculateCamelWeight(height, length, stomachRadius);
      const camelWeight = new CamelWeight({ height, length, stomachRadius, weight });
      const savedCamelWeight = await camelWeight.save();
      console.log('Camel weight stored successfully:', savedCamelWeight._id);
    } catch (error) {
      console.log('An error occurred while creating a camel weight:', error);
    }
  }

  calculateCamelWeight(height, length, stomachRadius) {
    const density = 1010; // Average density of camel's flesh in kg/m³
    const pi = Math.PI;

    const volume =
      (pi * Math.pow(stomachRadius, 2) * length) +
      (pi * Math.pow(stomachRadius * length, 2)) * height;

    const weight = volume * density;
    return weight;
  }

  async readCamelWeights() {
    try {
      const camelWeights = await CamelWeight.find();
      console.log('Camel weights:', camelWeights);
    } catch (error) {
      console.log('An error occurred while reading camel weights:', error);
    }
  }

  async updateCamelWeight(weightId, height, length, stomachRadius) {
    try {
      const weight = this.calculateCamelWeight(height, length, stomachRadius);
      const updatedCamelWeight = await CamelWeight.findByIdAndUpdate(weightId, {
        height,
        length,
        stomachRadius,
        weight
      }, { new: true });
      console.log('Camel weight updated successfully:', updatedCamelWeight._id);
    } catch (error) {
      console.log('An error occurred while updating camel weight:', error);
    }
  }

  async deleteCamelWeight(weightId) {
    try {
      const deletedCamelWeight = await CamelWeight.findByIdAndDelete(weightId);
      console.log('Camel weight deleted successfully:', deletedCamelWeight._id);
    } catch (error) {
      console.log('An error occurred while deleting camel weight:', error);
    }
  }
}

async function main() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const camelWeightDB = new CamelWeightDatabase(uri, dbName, collectionName);

  const choice = prompt('Enter your choice (C: Create, R: Read, U: Update, D: Delete): ');

  if (choice === 'C') {
    const height = parseFloat(prompt('Enter the height of the camel (in cm):'));
    const length = parseFloat(prompt('Enter the length of the camel (in cm):'));
    const stomachRadius = parseFloat(prompt('Enter the stomach radius of the camel (in cm):'));
    await camelWeightDB.createCamelWeight(height, length, stomachRadius);
  } else if (choice === 'R') {
    await camelWeightDB.readCamelWeights();
  } else if (choice === 'U') {
    const weightId = prompt('Enter the ID of the camel weight to update: ');
    const height = parseFloat(prompt('Enter the new height of the camel (in cm):'));
    const length = parseFloat(prompt('Enter the new length of the camel (in cm):'));
    const stomachRadius = parseFloat(prompt('Enter the new stomach radius of the camel (in cm):'));
    await camelWeightDB.updateCamelWeight(weightId, height, length, stomachRadius);
  } else if (choice === 'D') {
    const weightId = prompt('Enter the ID of the camel weight to delete: ');
    await camelWeightDB.deleteCamelWeight(weightId);
  } else {
    console.log('Invalid choice');
  }

  await camelWeightDB.disconnect();
  await mongoose.disconnect();
}

// Call the main function
main();
