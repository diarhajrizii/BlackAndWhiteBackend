const admin = 1;
const customer_service = 1;
const finance = 1;
const trader = 1;
// const compliance = 1; // We dont use this one anymore
// const configurator = 1; // We dont use this one anymore

const role_all = { admin, customer_service, trader, finance };
const role_ac = { admin, customer_service };
const role_af = { admin, finance };
const role_acf = { admin, customer_service, finance };
const role_at = { admin, trader };
const role_act = { admin, customer_service, trader };

const user_roles = {
  dashboard: {
    dashboard: role_all,
  },
  users: {
    users: role_acf,
    users_list: role_acf,
    user_profile: role_acf,
    // User Profile -> Reject / Approve KYC
    user_profile_kyc: role_ac,
    // User Profile -> Edit Balance
    user_profile_balance: {},
    // User Profile -> Suspend / Unsuspend Account
    user_profile_suspend: {},
    // User Profile -> Exclude / Include Account
    user_profile_exclude: {},
    // User Profile -> Add Note
    user_profile_note: {},
    // User Profile -> Edit User data
    user_profile_edit: {},
    safer_gambling: role_acf,
    duplicate_accounts: role_acf,
  },
  sports: {
    view: role_all,
    edit: role_at,
    default_leagues_country: role_at,
  },
  betting: {
    markets: role_act,
    bets: role_act,
    manual_bets: role_at,
    custom_bets: role_act,
  },
  financial: {
    financial_log: role_acf,
    deposits: role_acf,
    withdrawals: role_acf,
    manual_adjustment: role_acf,
    unclosed_bets: role_acf,
    net_session: role_acf,
  },
  settings: {
    default_leagues: role_at,
    activity_log: role_ac,
    countries: role_ac,
    terms: { admin },
    policy: { admin },
    variables: { admin },
    email_template: { admin },
    page_content: { admin },
    users: role_all,
    push_notification: role_ac,
    message_codes: { admin },
    bet_slip: { admin },
    casino: { admin },
    page_layout: { admin },
    footer_links: { admin },
    menu_links: { admin },
    banner: { admin },
    sport_widget: { admin },
    racing_widget: { admin },
    css_style: { admin },
    seo: { admin },
    image_library: { admin },
    trader_chat: { admin },
  },
  trading: {
    sports: { admin },
    events: { admin },
    markets: { admin },
  },
};

function checkPermission(menu, page, user_role) {
  return typeof user_roles[menu][page][user_role] != "undefined" || false;
}

function getUserRole(user_role) {
  let menus = Object.keys(user_roles);
  let return_role = {};
  for (let m = 0; m < menus.length; m++) {
    const menu = user_roles[menus[m]];
    return_role[menus[m]] = {};
    let pages = Object.keys(menu);
    for (let p = 0; p < pages.length; p++) {
      const page = user_roles[menus[m]][pages[p]];
      if (typeof page[user_role] != "undefined" && page[user_role] === 1) {
        return_role[menus[m]][pages[p]] = true;
      } else {
        return_role[menus[m]][pages[p]] = false;
      }
    }
  }
  return return_role;
}

module.exports = {
  user_roles,
  checkPermission,
  getUserRole,
};
