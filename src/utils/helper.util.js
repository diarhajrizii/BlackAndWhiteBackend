const { query } = require("../services/db.service");
const getSQLQuery = require("./getSQLQuery.js");

// Get IP from request header
function getIP(req) {
  return (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null)
  );
}

// Get Device from request header
function getDevice(req) {
  return req.headers["user-agent"];
}

// get Current Date Time
function getCurrentDateTime() {
  return moment().format("YYYY-MM-DD HH:mm:ss");
}
function getNewDate() {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York", // Set your desired timezone
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
function currentTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Get Database connection
function getConnection(connection) {
  switch (connection) {
    case "main":
      return dbMain;
    case "gs":
      return dbGS;
    case "cms":
      return dbCMS;
    default:
      break;
  }
}

function getFileParams(base64) {
  let split1 = base64.split("base64,");
  let data = split1[0].replace(";", "");
  let content = Buffer.from(split1[1], "base64");
  let file_type = "";
  let content_type = data.split(":");
  content_type = content_type[1];
  if (content_type == "image/png") {
    file_type = "png";
  } else if (content_type == "image/svg+xml") {
    file_type = "svg";
  } else if (content_type == "image/jpeg") {
    file_type = "jpeg";
  } else if (content_type == "image/jpg") {
    file_type = "jpg";
  } else if (content_type == "video/mp4") {
    file_type = "mp4";
  } else {
    file_type = content_type;
  }

  return { content, file_type, content_type, status: true };
}

function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateRandomNumber(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    if (i == 0) {
      result += characters.charAt(Math.floor(Math.random() * 9) + 1);
    } else {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }
  return result;
}

function generateUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

function activityLogs({ req }) {
  let event_temp = {
    headers: req.headers,
    body: req.body,
  };
  event_temp = JSON.parse(JSON.stringify(event_temp));

  // Hide Access Token in Header
  if (event_temp.headers.authorization) {
    event_temp.headers.authorization = "Token ***";
  }
  // Hide Access Token in Header
  if (event_temp.headers.Authorization) {
    event_temp.headers.Authorization = "Token ***";
  }
  // Hide Access Token
  if (event_temp.body.access_token) {
    event_temp.body.access_token = "Token ***";
    delete event_temp.rawBody;
  }
  // Hide Refresh Token
  if (event_temp.body.refresh_token) {
    event_temp.body.refresh_token = "Refresh Token ***";
    delete event_temp.rawBody;
  }
  // Hide Password
  if (event_temp.body.password) {
    event_temp.body.password = "Password ***";
    delete event_temp.rawBody;
  }

  // Hide Session
  if (event_temp.body.session_key) {
    event_temp.body.session_key = "Session Key ***";
    delete event_temp.rawBody;
  }

  // Hide Session
  if (event_temp.body.session) {
    event_temp.body.session = "Session ***";
    delete event_temp.rawBody;
  }

  // Hide MFA Code
  if (event_temp.body.mfa_token) {
    event_temp.body.mfa_token = "OTP Code ***";
    delete event_temp.rawBody;
  }

  delete event_temp.multiValueHeaders;
  if (process.env.STAGE != "local") {
    console.log(
      `${req.requestID} - ${JSON.stringify({
        headers: event_temp.headers,
        body: event_temp.body,
      })} `
    );
  }
}

// Get Test Users IDs
async function getTestUsersIds({ dbCMS }) {
  try {
    const userQuery = `SELECT real_user_id as id FROM users WHERE test_users = 1`;
    const { data } = await query({
      connection: dbCMS,
      sql: userQuery,
      params: [],
    });
    const testUsersIds = data.map((item) => item.id);
    return { status: true, data: testUsersIds };
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
}

function getUnixDateTimeForDb(value) {
  return moment(value).utc().format("YYYY-MM-DD HH:mm:ss");
}

function returnUniqueArray(arr) {
  var temp = {};
  var retArray = [];
  for (var i = 0; i < arr.length; i++) {
    if (!(arr[i] in temp)) {
      retArray.push(arr[i]);
      temp[arr[i]] = true;
    }
  }
  return retArray;
}

function arrayToObj(arr, id, name) {
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    obj[row[id]] = row[name];
  }
  return obj;
}

const getCurrentDateTimeDatabase = () => {
  return moment.utc().format("YYYY-MM-DD HH:mm:ss");
};

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function getS3Folder(type) {
  switch (type) {
    case "sport":
      return process.env.AWS_S3_SPORT;
    case "media":
      return process.env.AWS_S3_MEDIA;
    default:
      return process.env.AWS_S3_MEDIA;
  }
}

function capitalizeFirstLetter(string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return "";
  }
}

function nullToEmpty(obj) {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      let arrayKeys = Object.keys(obj[i]);
      for (let j = 0; j < arrayKeys.length; j++) {
        obj[i][arrayKeys[j]] =
          obj[i][arrayKeys[j]] == null ? "" : String(obj[i][arrayKeys[j]]);
      }
    }
  }
  return obj;
}

function generateRandomPasswordString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Check if user exists function
async function checkIfUserExists(email) {
  const sql = "SELECT * FROM users WHERE email = ?";
  const [user] = await query({
    sql,
    params: [email],
    connection: dbMain,
  });
  return !!user;
}

// Regular expression for email validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const fetchYearlyTotalSalesFromMonthlyTable = async (year) => {
  const sql = `
    SELECT CAST(TotalSales AS DECIMAL(10,2)) AS TotalSales
    FROM MonthlySales
    WHERE Year = ${year}
  `;

  const { data } = await query({
    sql,
    params: [],
    connection: dbMain,
  });

  return Array.isArray(data)
    ? data.map((result) => parseFloat(result.TotalSales))
    : [];
};
function getQuantitySoldArray(salesArray) {
  const quantityArray = salesArray.map((monthData) =>
    parseInt(monthData.QuantitySold || 0)
  );

  return quantityArray;
}

function getTotalSalesArray(array) {
  const salesArray = Array.from({ length: 12 }, (_, monthIndex) => {
    const monthData = array.find(
      (row) => row.Month === (monthIndex + 1).toString().padStart(2, "0")
    );

    // Use a conditional statement to set the value based on the monthData
    return monthData ? parseFloat(monthData.TotalSales) : 0;
  });
  return salesArray;
}
function getCategoryCode(type) {
  let categoryCode;
  switch (type) {
    case "shoes":
      categoryCode = [1003];
      break;
    case "textile":
      categoryCode = [1004];
      break;
    case "accessories":
      categoryCode = [1005];
      break;
    case "quantity":
      categoryCode = [1006];
      break;
    case "onlinePrices":
      categoryCode = [1007];
      break;
    case "bankPrices":
      categoryCode = [1008];
      break;
    default:
      categoryCode = [1002];
      break;
  }
  return categoryCode;
}
const fetchYearlyTotalSales = async (years, type) => {
  try {
    const categoryCode = getCategoryCode(type);
    const sql = getSQLQuery(categoryCode, years);

    const { data: result } = await query({
      sql,
      connection: dbMain,
      params: [],
    });

    const resultArray =
      type === "quantity"
        ? getQuantitySoldArray(result)
        : getTotalSalesArray(result);
    return resultArray;
  } catch (error) {
    console.error(error);
    return Array.from({ length: 12 }, () => 0);
  }
};

module.exports = {
  checkIfUserExists,
  validateEmail,
  getIP,
  getDevice,
  getCurrentDateTime,
  getNewDate,
  getConnection,
  activityLogs,
  getFileParams,
  getTestUsersIds,
  generateRandomString,
  getUnixDateTimeForDb,
  returnUniqueArray,
  arrayToObj,
  getCurrentDateTimeDatabase,
  generateRandomNumber,
  isObjectEmpty,
  generateUID,
  getS3Folder,
  capitalizeFirstLetter,
  nullToEmpty,
  generateRandomPasswordString,
  fetchYearlyTotalSales,
  currentTimeZone,
  formatter,
  fetchYearlyTotalSalesFromMonthlyTable,
  getTotalSalesArray,
};
