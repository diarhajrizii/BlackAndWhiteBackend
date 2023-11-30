const { decryptTextV2 } = require("./encryptData");
module.exports = async function decryptAndCompareData(
  params,
  dbData,
  collectColumn
) {
  // Decrypt the data
  const decryptedData = await decryptTextV2(dbData);

  // Get the column names from the params object
  const columns = Object.keys(params);

  // Array to store the matching IDs
  const matchingIds = [];

  // Iterate through the decrypted data
  for (let i = 0; i < decryptedData.length; i++) {
    const data = decryptedData[i];
    let insertID = true; // Flag to determine if the ID should be inserted

    // Iterate through the columns
    for (let j = 0; j < columns.length; j++) {
      const column = columns[j];

      // Check if both params[column] and data[column] exist
      if (params[column] && data[column]) {
        // Check if the data[column] includes the value from params[column]
        if (
          !data[column].toLowerCase().includes(params[column].toLowerCase())
        ) {
          insertID = false; // Set insertID to false if a mismatch is found
          continue; // Get out of loop (continue) if a mismatch is found
        }
      } else {
        insertID = false; // Set insertID to false if params[column] or data[column] is missing
        continue; // Get out of loop (continue) if params[column] or data[column] is missing
      }
    }

    if (insertID) {
      // Push the matching ID to the array
      matchingIds.push(data[collectColumn]);
    }
  }

  // Remove duplicate matching IDs and return the result
  return [...new Set(matchingIds)];
};
