const moment = require("moment");
const { query } = require("../services/db.service");
const {
  reportTypes,
  reportTypeFilters,
  queriesToMainDB,
  queriesToGS,
} = require("../constants/reportTypes");
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

function setSportName(sport_id) {
  const sportMap = {
    17: "American Football",
    2: "Australian Rules",
    271554: "Badminton",
    3: "Baseball",
    4: "Basketball",
    7950337: "Beach Volleyball",
    6: "Cricket",
    8: "Darts",
    10915624: "eSports",
    10: "Football",
    491393: "Futsal",
    99614: "Handball",
    208627: "Hockey",
    15: "Ice Hockey",
    300115: "Martial Arts/UFC",
    16: "Motor Sport",
    73743: "Rugby League",
    73744: "Rugby Union",
    22: "Snooker",
    269467: "Table Tennis",
    24: "Tennis",
    91189: "Volleyball",
    11205863: "Basketball 3x3",
    276032: "Water Polo",
    11205866: "Virtual Horse Racing",
    11205868: "Virtual Greyhound Racing",
    11205864: "Virtual Football",
    437727: "Squash",
    6463041: "Hurling",
    6463040: "Gaelic Football",
    8554: "Bowls",
    7: "Cycling",
    12: "Golf",
    5: "Boxing",
  };

  return sportMap[sport_id];
}

function setSportNameBySlug(sportNames, slug) {
  const sportMap = {
    esport: "eSports",
    tennis: "Tennis",
    cricket: "Cricket",
    basketball: "Basketball",
    tabletennis: "Table Tennis",
    icehockey: "Ice Hockey",
    futsal: "Futsal",
    football: "American Football",
    handball: "Handball",
    volleyball: "Volleyball",
    baseball: "Baseball",
    rugby: "Rugby League",
    motorsport: "Motor Sport",
    rugbyunion: "Rugby Union",
    snooker: "Snooker",
    hockey: "Hockey",
    darts: "Darts",
    martialarts: "Martial Arts/UFC",
    beachvolleyball: "Beach Volleyball",
    badminton: "Badminton",
    australianrules: "Australian Rules",
    soccer: "Football",
    basketball3x3: "Basketball 3x3",
    bowls: "Bowls",
    boxing: "Boxing",
    cycling: "Cycling",
    gaelicfootball: "Gaelic Football",
    golf: "Golf",
    hurling: "Hurling",
    squash: "Squash",
    virtualfootball: "Virtual Football",
    virtualgreyhoundfootball: "Virtual Greyhound Racing",
    virtualhorseracing: "Virtual Horse Racing",
    waterpolo: "Water Polo",
    greyhoundracing: "Greyhound Racing",
    festive: "Festive",
    horseracing: "Horse Racing",
    test: "Test Sport",
  };

  for (let i = 0; i < slug.length; i++) {
    const id = slug[i].trim();
    if (sportMap.hasOwnProperty(id)) {
      sportNames.push(sportMap[id]);
    }
  }

  return sportNames;
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
  var obj = {};
  var id = id;
  var name = name;
  for (var x = 0; x < arr.length; x++) {
    var row = arr[x];
    obj[row[id]] = row[name];
  }
  return obj;
}
const getCurrentDateTimeDatabase = () => {
  return moment.utc().format("YYYY-MM-DD HH:mm:ss");
};

const playerNameMarketsIds = [
  12, 13, 14, 42, 7100, 7121, 7739, 10504, 10523, 10989,
];

const slugs = [
  "americanfootball",
  "australianrules",
  "badminton",
  "baseball",
  "basketball",
  "beachvolleyball",
  "cricket",
  "darts",
  "esport",
  "soccer",
  "futsal",
  "handball",
  "hockey",
  "icehockey",
  "martialarts",
  "motorsport",
  "rugby",
  "rugbyunion",
  "snooker",
  "tabletennis",
  "tennis",
  "volleyball",
  "basketball3x3",
  "waterpolo",
  "virtualhorseracing",
  "virtualgreyhoundfootball",
  "virtualfootball",
  "squash",
  "hurling",
  "gaelicfootball",
  "bowls",
  "cycling",
  "golf",
  "boxing",
];

const setSportIdBySlug = (sport_name) => {
  const sportIds = {
    esport: 10915624,
    tennis: 24,
    cricket: 6,
    basketball: 4,
    tabletennis: 269467,
    icehockey: 15,
    futsal: 491393,
    football: 17,
    handball: 99614,
    volleyball: 91189,
    baseball: 3,
    rugby: 73743,
    motorsport: 16,
    rugbyunion: 73744,
    snooker: 22,
    hockey: 208627,
    darts: 8,
    martialarts: 300115,
    beachvolleyball: 7950337,
    badminton: 271554,
    australianrules: 2,
    soccer: 10,
    basketball3x3: 11205863,
    bowls: 8554,
    boxing: 5,
    cycling: 7,
    gaelicfootball: 6463040,
    golf: 12,
    hurling: 6463041,
    squash: 437727,
    virtualfootball: 11205864,
    virtualgreyhoundfootball: 11205868,
    virtualhorseracing: 11205866,
    waterpolo: 276032,
  };

  return sportIds[sport_name] || "";
};

const setSportSlugById = (sport_id) => {
  const sportData = {
    17: {
      name: "American Football",
      slug: "americanfootball",
    },
    2: {
      name: "Australian Rules",
      slug: "australianrules",
    },
    271554: {
      name: "Badminton",
      slug: "badminton",
    },
    3: {
      name: "Baseball",
      slug: "baseball",
    },
    4: {
      name: "Basketball",
      slug: "basketball",
    },
    7950337: {
      name: "Beach Volleyball",
      slug: "beachvolleyball",
    },
    6: {
      name: "Cricket",
      slug: "cricket",
    },
    8: {
      name: "Darts",
      slug: "darts",
    },
    10915624: {
      name: "eSports",
      slug: "esport",
    },
    10: {
      name: "Football",
      slug: "soccer",
    },
    491393: {
      name: "Futsal",
      slug: "futsal",
    },
    99614: {
      name: "Handball",
      slug: "handball",
    },
    208627: {
      name: "Hockey",
      slug: "hockey",
    },
    15: {
      name: "Ice Hockey",
      slug: "icehockey",
    },
    300115: {
      name: "Martial Arts/UFC",
      slug: "martialarts",
    },
    16: {
      name: "Motor Sport",
      slug: "motorsport",
    },
    73743: {
      name: "Rugby League",
      slug: "rugby",
    },
    73744: {
      name: "Rugby Union",
      slug: "rugbyunion",
    },
    22: {
      name: "Snooker",
      slug: "snooker",
    },
    269467: {
      name: "Table Tennis",
      slug: "tabletennis",
    },
    24: {
      name: "Tennis",
      slug: "tennis",
    },
    91189: {
      name: "Volleyball",
      slug: "volleyball",
    },
    11205863: {
      name: "Basketball 3x3",
      slug: "basketball3x3",
    },
    276032: {
      name: "Water Polo",
      slug: "waterpolo",
    },
    11205866: {
      name: "Virtual Horse Racing",
      slug: "virtualhorseracing",
    },
    11205868: {
      name: "Virtual Greyhound Racing",
      slug: "virtualgreyhoundfootball",
    },
    11205864: {
      name: "Virtual Football",
      slug: "virtualfootball",
    },
    437727: {
      name: "Squash",
      slug: "squash",
    },
    6463041: {
      name: "Hurling",
      slug: "hurling",
    },
    6463040: {
      name: "Gaelic Football",
      slug: "gaelicfootball",
    },
    8554: {
      name: "Bowls",
      slug: "bowls",
    },
    7: {
      name: "Cycling",
      slug: "cycling",
    },
    12: {
      name: "Golf",
      slug: "golf",
    },
    5: {
      name: "Boxing",
      slug: "boxing",
    },
  };

  return sportData[sport_id] || { name: "", slug: "" };
};

function checkReportType(reportType) {
  return reportTypes.has(reportType);
}

function checkAvailableFilters(reportType, filters) {
  const availableFilters = reportTypeFilters.get(reportType);
  if (!availableFilters) return true; //return true since we don't have any filters for this report type
  return filters.every((filter) => availableFilters.includes(filter));
}

function selectConnection(reportType) {
  if (queriesToMainDB.includes(reportType)) {
    return dbMain;
  }
  if (queriesToGS.includes(reportType)) {
    return dbGS;
  }
  return dbCMS;
}

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

async function getFileNames(id) {
  const fileNamesArray = await Promise.all(
    id.map(async (mediaId) => {
      const {
        data: [{ filename }],
      } = await query({
        connection: dbCMS,
        sql: `SELECT filename FROM cms_media_library WHERE id = ?`,
        params: [mediaId],
      });
      return filename;
    })
  );
  return fileNamesArray;
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

// function addDecimalToNumber(num) {}

function kycStatusTranslate(string) {
  switch (string) {
    case "verified":
      return "Verified";

    case "inited":
      return "Started";

    case "pending":
      return "Pending";

    case "rejected":
      return "Rejected";

    default:
      return "Not Started";
  }
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

module.exports = {
  getIP,
  getDevice,
  getCurrentDateTime,
  getConnection,
  activityLogs,
  getFileParams,
  getTestUsersIds,
  setSportName,
  setSportNameBySlug,
  generateRandomString,
  getUnixDateTimeForDb,
  returnUniqueArray,
  arrayToObj,
  playerNameMarketsIds,
  setSportIdBySlug,
  getCurrentDateTimeDatabase,
  setSportSlugById,
  checkReportType,
  checkAvailableFilters,
  selectConnection,
  generateRandomNumber,
  isObjectEmpty,
  generateUID,
  getS3Folder,
  slugs,
  getFileNames,
  capitalizeFirstLetter,
  nullToEmpty,
  kycStatusTranslate,
  generateRandomPasswordString,
};
