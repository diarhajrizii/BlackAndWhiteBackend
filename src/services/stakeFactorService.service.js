const {query} = require('./db.service');
const getSportCodeBySlug = require('../utils/getSportCodeBySlug');
const {activityLog} = require('./activityLog.service');
const userStateFactorModel = require('../models/usersV2/userStakeFactor.model');
const getMessageCodesByCodes = require('../utils/getMessageCodesByCode');
const getSQLQuery = require('../utils/getSQLQuery');
const {slugs} = require('../utils/helper.util');
const {executeMultiQuery} = require('../configs/dbConnection');
const {successfulReturn, errorReturn} = require('../utils/response');
const generalModel = require('../models/generalModel.model');

async function getUserStakeFactorPayload(sub_id, user_id) {
  const selectUserFactorsSql = `
      SELECT *
      FROM swiftyglobalapp_dev.user_stake_factor
      WHERE type IN ('prematch', 'inplay')
      AND sub_id = ?;
    `;

  const { data } = await query({
    connection: dbCMS,
    params: [sub_id],
    sql: selectUserFactorsSql,
  });

  const mappedFactors = data.reduce(
      (acc, { type, sport_slug, value, id }) => {
        const stakeFactorName = getSportCodeBySlug(sport_slug);

        const stakeFactorData = {
          id: id,
          slug: sport_slug,
          value,
          name: stakeFactorName,
        };

        acc[type].push(stakeFactorData);

        return acc;
      },
      { inplay: [], prematch: [] }
  );

  // get prematch_stakefactor, inplay_stakefactor from user settings
  const selectUsersSettingsStakeFactorSql = `
      SELECT prematch_stake_factor,inplay_stake_factor 
      FROM  swiftyglobalapp_dev.users_settings 
      WHERE swifty_id = ?;
    `;

  const selectUsersSettingsStakeFactorResult = await query({
    connection: dbCMS,
    params: [sub_id],
    sql: selectUsersSettingsStakeFactorSql,
  });

  if(selectUsersSettingsStakeFactorResult.status && selectUsersSettingsStakeFactorResult.data.length > 0) {
    mappedFactors.prematch_stake_factor = selectUsersSettingsStakeFactorResult.data[0].prematch_stake_factor;
    mappedFactors.inplay_stake_factor = selectUsersSettingsStakeFactorResult.data[0].inplay_stake_factor;
  }

  await activityLog({
    user_id: user_id,
    type: "retrieved_user_state_factor",
    description: `Successfully retrieved user state factor.`,
  });

  const returnData = userStateFactorModel({ data: mappedFactors });

  return returnData;
}

async function editUserStakeFactor(sub_id, user_id,value_slug, type) {
    // Return message
    let updateBoolean = false;
    let insertBoolean = false;
    let resultMessage = "";
    let stakeFactorQuery = ``;

    // Select data with sub id and type = inplay / prematch
    // Get data
    const { data: stakeFactorData } = await query({
      connection: dbMain,
      sql: getSQLQuery([1145]),
      params: [sub_id, type],
    });

    const checkArray = stakeFactorData.map((data) => data.sport_slug);

    for (let j = 0; j < value_slug.length; j++) {
      const { value, slug } = value_slug[j];

      const parsedValue = Number(value);
      if (checkArray.includes(slug)) {
        stakeFactorQuery += `UPDATE user_stake_factor SET value = '${parsedValue}' WHERE sub_id = '${sub_id}' AND type = '${type}' AND sport_slug = '${slug}'; `;
        updateBoolean = true;
      } else if (slugs.includes(slug)) {
        stakeFactorQuery += `INSERT INTO user_stake_factor (value, sport_slug, type, sub_id) VALUES ('${parsedValue}','${slug}','${type}','${sub_id}'); `;
        insertBoolean = true;
      } else if(slug === 'prematch_stake_factor') {
        stakeFactorQuery += `UPDATE users_settings SET prematch_stake_factor = '${parsedValue}' where swifty_id= '${sub_id}'; `;
      } else if(slug === 'inplay_stake_factor') {
        stakeFactorQuery += `UPDATE users_settings SET inplay_stake_factor = '${parsedValue}' where swifty_id= '${sub_id}'; `;
      } else {
        throw { message: "Wrong Slug!" };
      }
    }

    if (updateBoolean && insertBoolean) {
      resultMessage = await getMessageCodesByCodes(2201);
    } else if (updateBoolean) {
      resultMessage = await getMessageCodesByCodes(2202);
    } else if (insertBoolean) {
      resultMessage = await getMessageCodesByCodes(2203);
    } else {
      resultMessage = await getMessageCodesByCodes(2204);
    }

    await executeMultiQuery({
      dbType: "main",
      query: stakeFactorQuery,
      value: [],
    });

    return resultMessage;
}

module.exports = {
  getUserStakeFactorPayload,
  editUserStakeFactor
};
