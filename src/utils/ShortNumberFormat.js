// function shortNumberFormat(number) {
//     const suffixes = ['', 'k', 'M', 'B', 'T'];
//     const precision = 0;
  
//     // Handle special cases
//     if (number < 1000) {
//         return number.toFixed();
//     }
//     if (number >= 1e15) {
//         return '∞';
//     }
  
//     // Determine the appropriate suffix and value
//     const exponent = Math.floor(Math.log10(number));
//     const suffixIndex = Math.floor(exponent / 3);
//     const suffix = suffixes[suffixIndex];
//     const value = number / Math.pow(10, suffixIndex * 3);
  
//     // Format the value with the appropriate precision and suffix
//     return `${value.toFixed(precision)}${suffix}`;
// }

function shortNumberFormat(number) {
    if(!number) return 0;
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const magnitude = Math.floor(Math.log10(number) / 3);
    const scaledNumber = number / Math.pow(10, magnitude * 3);
    const formattedNumber = scaledNumber.toFixed(1);
    
    return formattedNumber + suffixes[magnitude];
}

export default shortNumberFormat;