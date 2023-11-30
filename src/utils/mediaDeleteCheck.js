const { query } = require("../services/db.service");
const getMessageCodesByCodes = require("./getMessageCodesByCode");

// Function to check image if can be deleted
module.exports = async function mediaDeleteCheck(media_id) {
  try {
    // Check if media_id is defined
    if (!media_id) {
      throw { message: await getMessageCodesByCodes(2215) };
    }

    // Query the database to check if the media is in use
    const images = await query({
      connection: dbCMS,
      sql: `SELECT * FROM cms_item_media_con WHERE media_id = ?`,
      params: [media_id],
    });

    // Check if the query was successful
    if (!images.status) {
      throw images;
    }

    // Check if the image is in use
    if (images.data.length > 0) {
      throw {
        message: await getMessageCodesByCodes(2216),
      };
    }

    // Return success status if the image is not in use
    return { status: true };
  } catch (e) {
    console.log(e);
    // Return error status and message
    return { status: false, message: e.message };
  }
};
