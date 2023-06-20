const prompt = require('prompt-sync')();

class CompoundFraction {
  constructor(wholeNumber, numerator, denominator) {
    this.wholeNumber = wholeNumber;
    this.numerator = numerator;
    this.denominator = denominator;
  }

  toString() {
    if (this.wholeNumber !== 0) {
      return `${this.wholeNumber} ${this.numerator}/${this.denominator}`;
    } else {
      return `${this.numerator}/${this.denominator}`;
    }
  }

  add(fraction) {
    const numerator1 = this.wholeNumber * this.denominator + this.numerator;
    const numerator2 = fraction.wholeNumber * fraction.denominator + fraction.numerator;

    const sumNumerator = numerator1 * fraction.denominator + numerator2 * this.denominator;
    const sumDenominator = this.denominator * fraction.denominator;

    let wholeNumber = Math.floor(sumNumerator / sumDenominator);
    const numerator = sumNumerator % sumDenominator;
    const denominator = sumDenominator;

    const gcd = this.greatestCommonDivisor(numerator, denominator);
    const simplifiedNumerator = numerator / gcd;
    const simplifiedDenominator = denominator / gcd;

    wholeNumber += Math.floor(simplifiedNumerator / simplifiedDenominator);
    const simplifiedNumeratorFinal = simplifiedNumerator % simplifiedDenominator;

    return new CompoundFraction(wholeNumber, simplifiedNumeratorFinal, simplifiedDenominator);
  }

  greatestCommonDivisor(a, b) {
    if (b === 0) {
      return a;
    }
    return this.greatestCommonDivisor(b, a % b);
  }
}

class NCompoundFractions {
  constructor(n) {
    this.n = n;
    this.fractions = [];
  }

  addFraction(fraction) {
    this.fractions.push(fraction);
  }
}

function inputN() {
  const n = parseInt(prompt("Enter the number of compound fractions: "));
  return new NCompoundFractions(n);
}

function inputFraction() {
  const wholeNumber = parseInt(prompt("Enter the whole number of the compound fraction: "));
  const numerator = parseInt(prompt("Enter the numerator of the compound fraction: "));
  const denominator = parseInt(prompt("Enter the denominator of the compound fraction: "));
  return new CompoundFraction(wholeNumber, numerator, denominator);
}

function inputNFractions(nFractions) {
  for (let i = 0; i < nFractions.n; i++) {
    const fraction = inputFraction();
    nFractions.addFraction(fraction);
  }
}

function findSum(nFractions) {
  let sumFraction = new CompoundFraction(0, 0, 1);
  for (let i = 0; i < nFractions.n; i++) {
    sumFraction = sumFraction.add(nFractions.fractions[i]);
  }
  return sumFraction;
}

function output(nFractions, sumFraction) {
  console.log(`The sum of ${nFractions.n} compound fractions is: ${sumFraction.toString()}`);
}

function main() {
  const nFractions = inputN();
  inputNFractions(nFractions);
  const sumFraction = findSum(nFractions);
  output(nFractions, sumFraction);
}

main();