const { MongoClient, ObjectId } = require('mongodb');
const prompt = require('prompt-sync')();

const uri = 'mongodb+srv://phalgunisp:phalguni@phalguni.rjwjeii.mongodb.net/?retryWrites=true&w=majority'; // MongoDB connection URI
const dbName = 'camelWeightDB'; // Name of the database
const collectionName = 'camelWeights'; // Name of the collection

class CamelWeightDatabase {
  constructor(uri, dbName, collectionName) {
    this.uri = uri;
    this.dbName = dbName;
    this.collectionName = collectionName;
    this.client = new MongoClient(uri);
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to the MongoDB server');
      this.db = this.client.db(this.dbName);
      this.collection = this.db.collection(this.collectionName);
    } catch (error) {
      console.log('An error occurred while connecting to the MongoDB server:', error);
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log('Disconnected from the MongoDB server');
    } catch (error) {
      console.log('An error occurred while disconnecting from the MongoDB server:', error);
    }
  }

  async createCamelWeight(height, length, stomachRadius) {
    try {
      const weight = this.calculateCamelWeight(height, length, stomachRadius);
      const camelWeight = { height, length, stomachRadius, weight };
      const result = await this.collection.insertOne(camelWeight);
      console.log('Camel weight stored successfully:', result.insertedId);
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
      const cursor = this.collection.find();
      const camelWeights = await cursor.toArray();
      console.log('Camel weights:', camelWeights);
    } catch (error) {
      console.log('An error occurred while reading camel weights:', error);
    }
  }

  async updateCamelWeight(weightId, height, length, stomachRadius) {
    try {
      const objectId = new ObjectId(weightId);
      const weight = this.calculateCamelWeight(height, length, stomachRadius);
      const filter = { _id: objectId };
      const update = { $set: { height, length, stomachRadius, weight } };
      const result = await this.collection.updateOne(filter, update);
      console.log('Camel weight updated successfully:', result.modifiedCount);
    } catch (error) {
      console.log('An error occurred while updating camel weight:', error);
    }
  }

  async deleteCamelWeight(weightId) {
    try {
      const objectId = new ObjectId(weightId);
      const filter = { _id: objectId };
      const result = await this.collection.deleteOne(filter);
      console.log('Camel weight deleted successfully:', result.deletedCount);
    } catch (error) {
      console.log('An error occurred while deleting camel weight:', error);
    }
  }
}

async function main() {
  const camelWeightDB = new CamelWeightDatabase(uri, dbName, collectionName);
  await camelWeightDB.connect();

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
}

// Call the main function
main();
