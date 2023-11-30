const { query } = require("./db.service");
const jwt_decode = require("jwt-decode");
const { decryptTextV2 } = require("../utils/encryptData");
const getMessageCodesByCodes = require("../utils/getMessageCodesByCode");

module.exports = {
  async getUserData(vars) {
    try {
      let JWTtoken = "";
      if (vars?.authorization || vars?.Authorization || vars?.host) {
        const { authorization, Authorization } = vars;
        const accessToken = Authorization || authorization;
        if (!accessToken) {
          throw { message: await getMessageCodesByCodes(2212) };
        }
        let auth =
          accessToken.indexOf(" ") > -1
            ? accessToken.split(" ")[1]
            : accessToken;
        JWTtoken = auth;
      } else {
        JWTtoken = vars;
      }

      if (!JWTtoken) throw { message: "No vars found" };

      const { sub } = jwt_decode(JWTtoken);

      const result = await query({
        connection: dbCMS,
        sql: "SELECT * FROM cms_users WHERE sub_id = ?",
        params: [sub],
      });

      if (result.status) {
        let userData = result.data;
        if (!userData || userData.length == 0) {
          throw { error: "No user data found" };
        }

        userData = await decryptTextV2(userData);
        return userData[0];
      }
    } catch (e) {
      console.log(e);
      return e.message;
    }
  },
};
