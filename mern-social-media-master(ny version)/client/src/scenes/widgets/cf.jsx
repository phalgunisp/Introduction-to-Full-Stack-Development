import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';
import React, { useState } from 'react';
const getUser = async () => {
  const response = await fetch(`http://localhost:3001/user/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  setUser(data);
};

// CompoundFraction class definition and functions
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
  
function CompoundFractionWidget() {
  const [n, setN] = useState(0);
  const [fractions, setFractions] = useState([]);

  const handleNChange = (event) => {
    const nValue = parseInt(event.target.value);
    setN(nValue);
    setFractions(Array(nValue).fill({ wholeNumber: 0, numerator: 0, denominator: 1 }));
  };

  const handleFractionChange = (event, index, field) => {
    const updatedFractions = [...fractions];
    updatedFractions[index][field] = parseInt(event.target.value);
    setFractions(updatedFractions);
  };

  const handleAddRow = () => {
    setFractions([...fractions, { wholeNumber: 0, numerator: 0, denominator: 1 }]);
  };

  const handleDeleteRow = (index) => {
    const updatedFractions = [...fractions];
    updatedFractions.splice(index, 1);
    setFractions(updatedFractions);
  };

  const calculateSum = () => {
    let sumFraction = new CompoundFraction(0, 0, 1);
    for (let i = 0; i < fractions.length; i++) {
      sumFraction = sumFraction.add(fractions[i]);
    }
    return sumFraction;
  };

  return (
    <div>
        {/* FIRST ROW */}
        <FlexBetween
      gap="0.5rem"
      pb="1.1rem"
      onClick={() => navigate(`/cf/${userId}`)}//for scene
        >
        </FlexBetween>  
  
      
      <label htmlFor="n">Number of Compound Fractions: </label>
      <input type="number" id="n" value={n} onChange={handleNChange} />

      <table>
        <thead>
          <tr>
            <th>Whole Number</th>
            <th>Numerator</th>
            <th>Denominator</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fractions.map((fraction, index) => (
            <tr key={index}>
              <td>
                <input type="number" value={fraction.wholeNumber} onChange={(e) => handleFractionChange(e, index, 'wholeNumber')} />
              </td>
              <td>
                <input type="number" value={fraction.numerator} onChange={(e) => handleFractionChange(e, index, 'numerator')} />
              </td>
              <td>
                <input type="number" value={fraction.denominator} onChange={(e) => handleFractionChange(e, index, 'denominator')} />
              </td>
              <td>
                <button onClick={() => handleDeleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleAddRow}>Add Fraction</button>

      <p>The sum of {n} compound fractions is: {calculateSum().toString()}</p>
    </div>
    
  );
}

export default CompoundFractionWidget;