const prompt = require('prompt-sync')();

class Camel {
  constructor(height, length, stomachRadius) {
    this.height = height;
    this.length = length;
    this.stomachRadius = stomachRadius;
  }

  calculateWeight() {
    const density = 1010; // Average density of camel in kg/m³
    const pi = Math.PI;

    const volume =
      (pi * Math.pow(this.stomachRadius, 2) * this.length) +
      (pi * Math.pow(this.stomachRadius * this.length, 2)) * this.height;

    return volume * density;
  }

  showCamel() {
    console.log("Camel Information:");
    console.log("Height:", this.height, "cm");
    console.log("Length:", this.length, "cm");
    console.log("Stomach Radius:", this.stomachRadius, "cm");
    console.log("Weight:", this.calculateWeight(), "kg");
  }
}

class CamelGroup {
  constructor() {
    this.camels = [];
  }

  addCamel(height, length, stomachRadius) {
    const camel = new Camel(height, length, stomachRadius);
    this.camels.push(camel);
  }

  calculateTotalWeight() {
    let totalWeight = 0;
    for (const camel of this.camels) {
      totalWeight += camel.calculateWeight();
    }
    return totalWeight;
  }
}

function getUserInput(promptMessage) {
  return parseFloat(prompt(promptMessage));
}

function main() {
  console.log("*** Camel Weight Calculator ***");

  const camelGroup = new CamelGroup();

  const numCamels = parseInt(prompt("Enter the number of camels:"));

  for (let i = 0; i < numCamels; i++) {
    console.log(`\nCamel ${i + 1}`);
    const height = getUserInput("Enter the height of the camel (in cm):");
    const length = getUserInput("Enter the length of the camel (in cm):");
    const stomachRadius = getUserInput("Enter the stomach radius of the camel (in cm):");

    camelGroup.addCamel(height, length, stomachRadius);
  }

  console.log("\nCamel Information:");
  for (const camel of camelGroup.camels) {
    camel.showCamel();
    console.log("-----------------------");
  }

  const totalWeight = camelGroup.calculateTotalWeight();
  console.log("Total Weight of all camels:", totalWeight, "kg");
}

// Call the main function
main();
