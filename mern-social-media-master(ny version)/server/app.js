// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// // POST /api/compound-fractions/add
// app.post('/api/compound-fractions/add', (req, res) => {
//   const { fractions } = req.body;

//   if (!fractions || !Array.isArray(fractions)) {
//     return res.status(400).json({ error: 'Invalid input' });
//   }

//   let result = {
//     whole: 0,
//     numerator: 0,
//     denominator: 1
//   };

//   fractions.forEach(fraction => {
//     if (
//       !fraction ||
//       typeof fraction.whole !== 'number' ||
//       typeof fraction.numerator !== 'number' ||
//       typeof fraction.denominator !== 'number' ||
//       fraction.denominator === 0
//     ) {
//       return res.status(400).json({ error: 'Invalid fraction' });
//     }

//     result.whole += fraction.whole;
//     result.numerator = result.numerator * fraction.denominator +
//       fraction.numerator * result.denominator;
//     result.denominator *= fraction.denominator;
//   });

//   // Simplify the resulting fraction
//   const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
//   const commonFactor = gcd(result.numerator, result.denominator);
//   result.numerator /= commonFactor;
//   result.denominator /= commonFactor;

//   // Convert an improper fraction to a mixed number
//   result.whole += Math.floor(result.numerator / result.denominator);
//   result.numerator %= result.denominator;

//   res.json(result);
// });

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
