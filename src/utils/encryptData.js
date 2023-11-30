const crypto = require("crypto");
const algorithm = "aes-256-cbc"; //Using AES encryption
const initVector = Buffer.from(process.env.ENCRYPT_IV, "utf-8");
const SecurityKey = Buffer.from(process.env.ENCRYPT_SECRET_KEY, "utf-8");
const manipulationKey = [
  "first_name",
  "surname",
  "email",
  "birthday",
  "address",
  "state",
  "nationality",
  "phone",
  "users_first_name",
  "users_surname",
  "users_email",
  "users_birthday",
  "users_address",
  "users_state",
  "users_nationality",
  "users_phone",
  "address_city",
  "address_country",
  "address_formatted",
  "address_state",
  "address_zip",
  "users_address_city",
  "users_address_country",
  "users_address_formatted",
  "users_address_state",
  "users_address_zip",
  "address_line1",
  "address_line2",
  "users_address_line1",
  "users_address_line2",
  "last_name",
  "cms_users_first_name",
  "cms_users_last_name",
  "cms_users_email",
  "card_holder",
  "card_brand",
  "card_last4",
  "card_exp_month",
  "card_token",
  "card_exp_year",
  "response_data",
  "manager_last_name",
  "manager_first_name",
];
// Encrypt Text
async function encryptText(text) {
  let return_array = [];

  try {
    if (Array.isArray(text)) {
      for (let i = 0; i < text.length; i++) {
        return_array.push(text[i] ? encrypt(text[i]) : "");
      }
      return return_array;
    } else {
      text = text || "";
      return text ? encrypt(text) : text;
    }
  } catch (e) {
    console.log("Encrypt Text", e);
    if (Array.isArray(text)) {
      for (let i = 0; i < text.length; i++) {
        return_array.push(text[i]);
      }
    } else {
      return text;
    }
  }
}

async function encryptTextV2(encryptedData) {
  const { column, column_value } = encryptedData;

  if (!Array.isArray(column)) return;

  try {
    for (let i = 0; i < column.length; i++) {
      if (!column_value[i]) continue;

      if (manipulationKey.includes(column[i])) {
        if (column_value[i].includes("%")) {
          const arr = column_value[i].split("%");

          if (column_value[i].includes("'%")) {
            column_value[i] = `LIKE '%${encrypt(arr[1])}%'`;
          } else {
            column_value[i] = `LIKE %${encrypt(arr[1])}%`;
          }
        } else {
          column_value[i] = encrypt(column_value[i].toLowerCase());
        }
      }
    }

    return column_value;
  } catch (e) {
    console.log(e);
    console.log("Invalid parameters");
  }
}

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, SecurityKey, initVector);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
}

// Decrypt Text
async function decryptText(text) {
  let return_array = [];
  try {
    if (Array.isArray(text)) {
      for (let i = 0; i < text.length; i++) {
        return_array.push(text[i] ? decrypt(text[i]) : "");
      }
      return return_array;
    } else {
      text = text || "";
      return text ? decrypt(text) : text;
    }
  } catch (e) {
    console.log("Decrypt Text", e);
    if (Array.isArray(text)) {
      for (let i = 0; i < text.length; i++) {
        return_array.push(text[i]);
      }
    } else {
      return text;
    }
  }
}

async function decryptTextV2(decryptedData) {
  // Check if is array with objects
  if (Array.isArray(decryptedData)) {
    for (let i = 0; i < decryptedData.length; i++) {
      var obj = decryptedData[i];
      Object.keys(obj).forEach((key) => {
        // Check if key is for decrypt
        if (manipulationKey.includes(key)) {
          try {
            // Decrypt value
            obj[key] = decrypt(obj[key]);
          } catch (e) {}
        }
      });
      decryptedData[i] = obj;
    }
    // Return data
    return decryptedData;
  } else {
    // If parameter is object
    var obj = decryptedData;
    Object.keys(obj).forEach((key) => {
      if (manipulationKey.includes(key)) {
        try {
          obj[key] = decrypt(obj[key]);
        } catch (e) {
          obj[key] = obj[key];
        }
      }
    });
    return obj;
  }
}
function decrypt(text) {
  const decipher = crypto.createDecipheriv(algorithm, SecurityKey, initVector);
  let decryptedData = decipher.update(text, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
}

module.exports = {
  encryptText,
  encryptTextV2,
  encrypt,
  decryptText,
  decryptTextV2,
  decrypt,
};
