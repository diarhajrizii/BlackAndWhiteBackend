const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth.middelware");
const app = express();

// TODO: Remove this routes
const paymentGateways = require("../../controllers/settings/payment-gateways/paymentGateways");
const countries = require("../../controllers/settings/countries/countries");
const editCountry = require("../../controllers/settings/countries/editCountry");
const getCMSActivityLog = require("../../controllers/settings/getCMSActivityLog");
const addCssStyle = require("../../controllers/settings/css-styles/addCssStyle");
const getCssStyle = require("../../controllers/settings/css-styles/getCssStyle");
const getCssStyleContent = require("../../controllers/settings/css-styles/getCssStyleContent");
const getEmailTemplates = require("../../controllers/settings/getEmailTemplates");
const postSendEmail = require("../../controllers/settings/postSendEmail");
const editCurrency = require("../../controllers/settings/currencies/editCurrency");
const getAllCurrencies = require("../../controllers/settings/currencies/getAllCurrencies");
const editEmailTemplates = require("../../controllers/settings/editEmailTemplates");
const addTraderOptions = require("../../controllers/settings/trader-options/addTraderOptions");
const addAffiliateUser = require("../../controllers/settings/affiliate-users/addAffiliateUser");
const getAffiliateUsers = require("../../controllers/settings/affiliate-users/getAffiliateUsers");
const deleteAffiliateUser = require("../../controllers/settings/affiliate-users/deleteAffiliateUser");
const createSeo = require("../../controllers/settings/seo/createSeo");
const getSeo = require("../../controllers/settings/seo/getSeo");
const getTraderOptions = require("../../controllers/settings/trader-options/getTraderOptions");
const editTraderOptions = require("../../controllers/settings/trader-options/editTraderOptions");
const deleteProvider = require("../../controllers/settings/providers/deleteProvider");
const getProviders = require("../../controllers/settings/providers/getProviders");
const getLanguages = require("../../controllers/settings/languages/getLanguages");
const editLanguageStatus = require("../../controllers/settings/languages/editLanguageStatus");
const deleteSeo = require("../../controllers/settings/seo/deleteSeo");
const updateSeo = require("../../controllers/settings/seo/updateSeo");
const editProvider = require("../../controllers/settings/providers/addProvider");
const translateText = require("../../controllers/settings/languages/translateText");
const traderChat = require("../../controllers/settings/trader-chat/traderChat");
const editTraderChat = require("../../controllers/settings/trader-chat/editTraderChat");
const affiliateUserRoutes = require("./affiliateUser.routes");
const cmsActivityLogRoutes = require("./cmsActivityLog.routes");
const countrieRoutes = require("./countrie.routes");
const currencyRoutes = require("./currency.routes");
const providerRoutes = require("./provider.routes");
const languageRoutes = require("./language.routes");
const paymentGatewayRoutes = require("./paymentGateway.routes");
const traderRoutes = require("./trader.routes");
const seoRoutes = require("./seo.routes");
const cssRoutes = require("./css.routes");
const emailTemplateRoutes = require("./emailTemplate.routes");
const oddsDisplay = require("../../controllers/settings/oddsDisplay");

// CMS Activity Log
app.use("/cms-activity-log", auth, cmsActivityLogRoutes);
// Countries
app.use("/countrie", auth, countrieRoutes);
// Currency
app.use("/currency", auth, currencyRoutes);
// Provider
app.use("/provider", auth, providerRoutes);
// Language
app.use("/language", auth, languageRoutes);
// Payment Gateway
app.use("/payment-gateway", auth, paymentGatewayRoutes);
// Trader
app.use("/trader", auth, traderRoutes);
// SEO
app.use("/seo", auth, seoRoutes);
// CSS
app.use("/css", auth, cssRoutes);
// Email Template
app.use("/email-template", auth, emailTemplateRoutes);

// Get
router.get("/payment-gateways", auth, paymentGateways); // TODO: Remove this route
router.get("/countries", auth, countries); // TODO: Remove this route
router.get("/cms-activity-log", auth, getCMSActivityLog); // TODO: Remove this route
router.get("/email-template", auth, getEmailTemplates); // TODO: Remove this route
router.get("/currencies", auth, getAllCurrencies); // TODO: Remove this route
router.get("/trader-options", auth, getTraderOptions); // TODO: Remove this route
// router.get("/affiliate-users", auth, getAffiliateUsers); // TODO: Remove this route
router.get("/css", auth, getCssStyle); // TODO: Remove this route
router.get("/css/content.css", getCssStyleContent); // TODO: Remove this route
router.get("/seo", auth, getSeo);
router.get("/providers", auth, getProviders); // TODO: Remove this route
router.get("/languages", auth, getLanguages); // TODO: Remove this route
router.get("/trader-chat", auth, traderChat); // TODO: Remove this route

// Post
router.post("/countries/edit", auth, editCountry); // TODO: Remove this route
router.post("/css/add", auth, addCssStyle); // TODO: Remove this route
router.post("/trader-option/add", auth, addTraderOptions); // TODO: Remove this route
router.post("/send-email", auth, postSendEmail); // TODO: Remove this route
router.post("/currency/edit", auth, editCurrency); // TODO: Remove this route
router.post("/email-template/edit", auth, editEmailTemplates); // TODO: Remove this route
// router.post("/affiliate-user/add", auth, addAffiliateUser); // TODO: Remove this route
router.post("/trader-options/update", auth, editTraderOptions); // TODO: Remove this route
router.post("/seo/add", auth, createSeo);
router.post("/provider/edit", auth, editProvider); // TODO: Remove this route
router.post("/language-status/edit", auth, editLanguageStatus); // TODO: Remove this route
router.post("/translate-text", auth, translateText); // TODO: Remove this route
router.post("/trader-chat/edit", auth, editTraderChat); // TODO: Remove this route

// Put
router.put("/seo/update", auth, updateSeo);
router.put("/odds/display", auth, oddsDisplay);

// Delete
// router.delete("/affiliate-user/:affiliateId", auth, deleteAffiliateUser); // TODO: Remove this route
router.delete("/provider/:providerId", auth, deleteProvider); // TODO: Remove this route
router.delete("/seo", auth, deleteSeo);

module.exports = router;
