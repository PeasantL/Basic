export function processStringBoth(inputString) {
  // Check for the presence of both asterisks and quotes
  if (inputString.includes('*') && inputString.includes('"')) {
      // Do nothing, string is correct
      console.log("File is correct, no processing done.")
      let finalString = inputString;
      return finalString;
  } 


  // Check for the presence of only asterisks
  else if (inputString.includes('*')) {
    // Split the input string by '\n', capturing the newlines in the result
    let finalArray = inputString.split(/(\n+)/);

    // Process each element before splitting into sub-arrays
    finalArray = finalArray.map(element => {
        // Directly return if the element is purely newline(s)
        if (/^(\n+)$/.test(element)) {
            return element;
        }
        // Process if the element contains text
        if (element[0] !== '*') {
            // Element does not start with an asterisk
            let parts = element.split('*').filter(part => part !== '').map(part => part.trim());
            return parts.map((part, index) => {
                if (index % 2 === 0) { // Odd element (even index), wrap with quotes
                    return '"' + part + '"';
                } else { // Even element (odd index), wrap with asterisks
                    return '*' + part + '*';
                }
            }).join(' ');
        } else {
            // Element starts with an asterisk
            let parts = element.split('*').filter(part => part !== '').map(part => part.trim());
            return parts.map((part, index) => {
                if (index % 2 === 0) { // Odd element (even index), wrap with asterisks
                    return '*' + part + '*';
                } else { // Even element (odd index), wrap with quotes
                    return '"' + part + '"';
                }
            }).join(' ');
        }
    });

    // Convert the array back into a string, handling spacing around newlines
    let finalString = finalArray.reduce((acc, element, index, array) => {
        if (/^(\n+)$/.test(element)) {
            // Element is newline(s), add without space
            return acc + element;
        } else {
            // Element is text, add with space unless the next element is a newline
            let nextElement = array[index + 1];
            let addSpace = nextElement && /^(\n+)$/.test(nextElement) ? '' : ' ';
            return acc + element + addSpace;
        }
    }, '').trim(); // Trim the final string to remove any leading/trailing spaces
    return finalString
  } 


  // Check for the presence of only quotes
  else if (inputString.includes('"')) {
      // Apply processing for quotes only

      // Split the input string by '\n', capturing the newlines in the result
      let finalArray = inputString.split(/(\n+)/);

      // Process each element before splitting into sub-arrays
      finalArray = finalArray.map(element => {
          // Directly return if the element is purely newline(s)
          if (/^(\n+)$/.test(element)) {
              return element;
          }

          // Process if the element contains text
          if (element[0] !== '"') {
              // Element doescle not start with an asterisk
              let parts = element.split('"').filter(part => part !== '').map(part => part.trim());

              return parts.map((part, index) => {
                  if (index % 2 === 0) { // Odd element (even index), wrap with quotes
                      return '*' + part + '*';
                  } else { // Even element (odd index), wrap with asterisks
                      return '"' + part + '"';
                  }
              }).join(' ');
          } else {
              // Element starts with an asterisk
              let parts = element.split('"').filter(part => part !== '').map(part => part.trim());
              return parts.map((part, index) => {
                  if (index % 2 === 0) { // Odd element (even index), wrap with asterisks
                      return '"' + part + '"';
                  } else { // Even element (odd index), wrap with quotes
                      return '*' + part + '*';
                  }
              }).join(' ');
          }
      });

      // Convert the array back into a string, handling spacing around newlines
      let finalString = finalArray.reduce((acc, element, index, array) => {
          if (/^(\n+)$/.test(element)) {
              // Element is newline(s), add without space
              return acc + element;
          } else {
              // Element is text, add with space unless the next element is a newline
              let nextElement = array[index + 1];
              let addSpace = nextElement && /^(\n+)$/.test(nextElement) ? '' : ' ';
              return acc + element + addSpace;
          }
      }, '').trim(); // Trim the final string to remove any leading/trailing spaces
      return finalString


  } 
  // If none of the above, return the string unmodified or apply other logic
  else {
      console.log("Bad file - No processing done due to lack of special chars");
      let finalString = inputString;
      return(finalString)
  }
}

export function processStringAsterisk(finalString) {
    console.log("Processing asterisk")
    console.log(finalString)
    let stringBoth = processStringBoth(finalString).replaceAll('"', "");
    console.log(stringBoth)
    return stringBoth;
}

export function processStringQuotes(finalString) {
    let stringBoth = processStringBoth(finalString);
    return stringBoth.replaceAll('*', "");
}


/*
//Remove export tag to test

const testString = "part1 *test* someime *adg*\n\n\n*part2 agfsarfgs*part3 part4 *yes* part 6\n\n\npart4*dass*dsfgsdgdgfd*f*";
const quoteString = 'part1 \"test\" someime \"adg\"\n\n\n\"part2 agfsarfgs\"part3 part4 \"yes\" part 6\n\n\npart4\"dass\"dsfgsdgdgfd\"f\"'


console.log(processStringQuotes(testString))

console.log(processStringBoth(testString))
console.log(processStringBoth(quoteString))
*/