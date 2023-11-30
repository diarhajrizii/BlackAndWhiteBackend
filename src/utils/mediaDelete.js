const { query, deletev2 } = require("../services/db.service");
const getMessageCodesByCodes = require("./getMessageCodesByCode");

module.exports = async function mediaDelete(component_id) {
  try {
    // Check if component_id is defined
    if (!component_id) {
      throw { message: "component_id is not defined" };
    }

    // Query the database to check if the component exists
    const item = await query({
      connection: dbCMS,
      sql: `SELECT * FROM cms_item WHERE id = ?;`,
      params: [component_id],
    });

    // Check if the query was successful
    if (!item.status) {
      throw item;
    }
    // Check if the component exists
    if (item.data.length == 0) {
      throw { message: await getMessageCodesByCodes(2214) };
    }

    const component = item.data[0];
    const { type } = component;

    // Delete media component
    const result = await deletev2({
      connection: dbCMS,
      query:
        "DELETE FROM cms_item_media_con WHERE component_id = ? AND type = ?;",
      query_values: [component_id, type],
    });

    // Check if the delete was successful
    if (!result.status) {
      throw result;
    }

    // Return success status if the media component has deleted successfully
    return { status: true };
  } catch (e) {
    console.log(e);
    // Return error status and message
    return { status: false, message: e.message };
  }
};
