const { query } = require("./db.service");
const jwt_decode = require("jsonwebtoken").decode;

module.exports = {
  async getUserData(vars) {
    try {
      let JWToken = "";
      if (vars?.authorization || vars?.Authorization || vars?.host) {
        const { authorization, Authorization } = vars;
        const accessToken = Authorization || authorization;

        if (!accessToken) {
          throw { message: "Access Token is missing!" };
        }

        let auth =
          accessToken.indexOf(" ") > -1
            ? accessToken.split(" ")[1]
            : accessToken;
        JWToken = auth;
      } else {
        throw { message: "Authorization header is missing!" }; // Handle case where authorization header is not defined
      }

      if (!JWToken) throw { message: "No vars found" };

      const { id, company_id } = jwt_decode(JWToken);

      const { data: user } = await query({
        connection: dbMain,
        sql: "SELECT * FROM users WHERE id = ? AND company_id = ?",
        params: [id, company_id],
      });

      if (!user || user.length == 0) {
        throw { error: "No user data found" };
      }

      return user[0];
    } catch (e) {
      console.error("Error in getUserData function:", e);
      throw e; // Re-throw the error to be caught by the caller
    }
  },
};
