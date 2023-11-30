const { query, insert, update } = require("../services/db.service");

module.exports = async function mediaAdd(type, component_id, media_id) {
  const { data: selectImages } = await query({
    connection: dbCMS,
    sql: `SELECT * FROM cms_item_media_con WHERE type = ? AND component_id = ?`,
    params: [type, component_id],
  });

  if (selectImages.length > 0) {
    await update({
      connection: dbCMS,
      query: `UPDATE cms_item_media_con SET media_id = ? WHERE type = ? AND component_id = ?`,
      query_values: [media_id, type, component_id],
    });
  } else {
    await insert({
      connection: dbCMS,
      query: `INSERT INTO cms_item_media_con (type, component_id, media_id) VALUES (?, ?, ?)`,
      query_values: [type, component_id, media_id],
    });
  }
};
