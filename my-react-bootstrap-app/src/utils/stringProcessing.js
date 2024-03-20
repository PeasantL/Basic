export function processStringBoth(inputString) {
  // Check for the presence of both asterisks and quotes
  if (inputString.includes("*") && inputString.includes('"')) {
    // Do nothing, string is correct
    console.log("File is correct, no processing done.");
    let finalString = inputString;
    return finalString;
  }

  // Check for the presence of only asterisks
  else if (inputString.includes("*")) {
    // Split the input string by '\n', capturing the newlines in the result
    let finalArray = inputString.split(/(\n+)/);

    // Process each element before splitting into sub-arrays
    finalArray = finalArray.map((element) => {
      // Directly return if the element is purely newline(s)
      if (/^(\n+)$/.test(element)) {
        return element;
      }
      // Process if the element contains text
      if (element[0] !== "*") {
        // Element does not start with an asterisk
        let parts = element
          .split("*")
          .filter((part) => part !== "")
          .map((part) => part.trim());
        return parts
          .map((part, index) => {
            if (index % 2 === 0) {
              // Odd element (even index), wrap with quotes
              return '"' + part + '"';
            } else {
              // Even element (odd index), wrap with asterisks
              return "*" + part + "*";
            }
          })
          .join(" ");
      } else {
        // Element starts with an asterisk
        let parts = element
          .split("*")
          .filter((part) => part !== "")
          .map((part) => part.trim());
        return parts
          .map((part, index) => {
            if (index % 2 === 0) {
              // Odd element (even index), wrap with asterisks
              return "*" + part + "*";
            } else {
              // Even element (odd index), wrap with quotes
              return '"' + part + '"';
            }
          })
          .join(" ");
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
        let addSpace = nextElement && /^(\n+)$/.test(nextElement) ? "" : " ";
        return acc + element + addSpace;
      }
    }, "");
    return finalString;
  }

  // Check for the presence of only quotes
  else if (inputString.includes('"')) {
    // Apply processing for quotes only

    // Split the input string by '\n', capturing the newlines in the result
    let finalArray = inputString.split(/(\n+)/);

    // Process each element before splitting into sub-arrays
    finalArray = finalArray.map((element) => {
      // Directly return if the element is purely newline(s)
      if (/^(\n+)$/.test(element)) {
        return element;
      }

      // Process if the element contains text
      if (element[0] !== '"') {
        // Element doescle not start with an asterisk
        let parts = element
          .split('"')
          .filter((part) => part !== "")
          .map((part) => part.trim());

        return parts
          .map((part, index) => {
            if (index % 2 === 0) {
              // Odd element (even index), wrap with quotes
              return "*" + part + "*";
            } else {
              // Even element (odd index), wrap with asterisks
              return '"' + part + '"';
            }
          })
          .join(" ");
      } else {
        // Element starts with an asterisk
        let parts = element
          .split('"')
          .filter((part) => part !== "")
          .map((part) => part.trim());
        return parts
          .map((part, index) => {
            if (index % 2 === 0) {
              // Odd element (even index), wrap with asterisks
              return '"' + part + '"';
            } else {
              // Even element (odd index), wrap with quotes
              return "*" + part + "*";
            }
          })
          .join(" ");
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
        let addSpace = nextElement && /^(\n+)$/.test(nextElement) ? "" : " ";
        return acc + element + addSpace;
      }
    }, "");
    return finalString;
  }
  // If none of the above, return the string unmodified or apply other logic
  else {
    console.log("Bad file - No processing done due to lack of special chars");
    let finalString = inputString;
    return finalString;
  }
}

export function processStringAsterisk(finalString) {
  let stringBoth = processStringBoth(finalString).replaceAll('"', "");
  return stringBoth;
}

export function processStringQuotes(finalString) {
  let stringBoth = processStringBoth(finalString);
  return stringBoth.replaceAll("*", "");
}

//preprosessing  of mes_examples to remove <START> and {+/w} structures
function modifyStringAndTrackPositions(inputString) {
  // Splitting the input string into lines
  const lines = inputString.split("\n");
  const trackedPatterns = [];
  const patternRegex = /<START>|{{\w+}}: /g; // Adjust regex as needed for different patterns

  // Iterate over the lines to find and track patterns
  lines.forEach((line, index) => {
    let match;
    while ((match = patternRegex.exec(line)) !== null) {
      // Tracking the pattern and its line position
      trackedPatterns.push({ pattern: match[0], line: index });
      // Remove the pattern from the line
      line = line.replace(match[0], "");
    }
    // Update the line without the patterns
    lines[index] = line;
  });

  // Joining the modified lines back into a single string
  const modifiedString = lines.join("\n");

  return {
    modifiedString,
    trackedPatterns,
  };
}

//post-processing of mes_examples to re-insert <START> and {+/w} structures
function reinsertStructures(modifiedString, trackedPatterns) {
  // Splitting the modified string into lines

  let lines = modifiedString.split("\n");

  /*
  console.log("ModifiedString");
  console.log(modifiedString);
  console.log("Tracked Patterns <START>");
  console.log(trackedPatterns);
  console.log("Lines");
  console.log(lines);
  */

  // Reinsert the patterns at their original positions
  trackedPatterns.forEach(({ pattern, line }) => {
    // Check if the line exists, otherwise, add empty lines
    if (line < lines.length) {
      lines[line] = pattern + lines[line];
    } else {
      while (lines.length < line) {
        lines.push("");
      }
      lines.push(pattern);
    }
  });

  // Join the lines back into a single string
  return lines.join("\n");
}

export function mes_exampleStringProcess(inputString, processingFunction) {
  const { modifiedString, trackedPatterns } =
    modifyStringAndTrackPositions(inputString);

  //implement function checking?
  const processedString = processingFunction(modifiedString);

  const finalString = reinsertStructures(processedString, trackedPatterns);

  return finalString;
}
