const express = require("express");
const router = express.Router();
const app = express();

const auth = require("../../middlewares/auth.middelware");
const betSlip = require("../../controllers/cms/bet-slip/betSlip");
const addBetSlip = require("../../controllers/cms/bet-slip/addBetSlip");
const editBetSlip = require("../../controllers/cms/bet-slip/editBetSlip");
const deleteBetSlip = require("../../controllers/cms/bet-slip/deleteBetSlip");
const content = require("../../controllers/cms/content/content");

const publishBetSlip = require("../../controllers/cms/bet-slip/publishBetSlip");
const addImageLibrary = require("../../controllers/cms/bet-slip/addImageLibrary");
const orderBetSlip = require("../../controllers/cms/bet-slip/orderBetSlip");

const addVariable = require("../../controllers/cms/variables/addVariable");
const variable = require("../../controllers/cms/variables/variable");
const allImages = require("../../controllers/cms/bet-slip/allImages");

const addCarousel = require("../../controllers/cms/carousel/addCarousel");
const editCarousel = require("../../controllers/cms/carousel/editCarousel");
const publishCarousel = require("../../controllers/cms/carousel/publishCarousel");
const orderCarousel = require("../../controllers/cms/carousel/orderCarousel");
const games = require("../../controllers/cms/casino/games");
const addHeroWidget = require("../../controllers/cms/hero-widget/addHeroWidget");
const editHeroWidget = require("../../controllers/cms/hero-widget/editHeroWidget");
const editVariable = require("../../controllers/cms/variables/editVariable");
const groups = require("../../controllers/cms/casino/groups");
const addGroup = require("../../controllers/cms/casino/addGroup");
const deleteGroup = require("../../controllers/cms/casino/deleteGroup");
const orderGroup = require("../../controllers/cms/casino/orderGroup");
const pageLayout = require("../../controllers/cms/page-layout/pageLayout");
const groupItems = require("../../controllers/cms/casino/groupItems");
const addGame = require("../../controllers/cms/casino/addGame");
const addPageLayout = require("../../controllers/cms/page-layout/addPageLayout");
const orderHeroWidget = require("../../controllers/cms/hero-widget/orderHeroWidget");
const publishHeroWidget = require("../../controllers/cms/hero-widget/publishHeroWidget");
const changeCountries = require("../../controllers/cms/changeCountries");
const pageContent = require("../../controllers/cms/page-content/pageContent");
const editGame = require("../../controllers/cms/casino/editGame");
const deletePageLayout = require("../../controllers/cms/page-layout/deletePageLayout");
const cmsOpenApi = require("../../controllers/cmsOpenApi");
const orderPageLayout = require("../../controllers/cms/page-layout/orderPageLayout");
const orderGame = require("../../controllers/cms/casino/orderGame");
const links = require("../../controllers/cms/footer-links/links");
const saveLinks = require("../../controllers/cms/footer-links/saveLinks");
const deleteLink = require("../../controllers/cms/footer-links/deleteLink");
const menuLinks = require("../../controllers/cms/menu-link/menuLinks");
const addMenuLink = require("../../controllers/cms/menu-link/addMenuLink");
const deleteMenuLinks = require("../../controllers/cms/menu-link/deleteMenuLinks");
const addHeroBanner = require("../../controllers/cms/hero-banner/addHeroBanner");
const orderMenuLinks = require("../../controllers/cms/menu-link/orderMenuLinks");
const addMessageCodes = require("../../controllers/cms/message-codes/addMessageCodes");
const editMessageCodes = require("../../controllers/cms/message-codes/editMessageCodes");
const messageCodes = require("../../controllers/cms/message-codes/messageCodes");
const orderLink = require("../../controllers/cms/footer-links/orderLink");
const editHeroBanner = require("../../controllers/cms/hero-banner/editHeroBanner");
const pushNotification = require("../../controllers/cms/push-notification/pushNotification");
const addPushNotifications = require("../../controllers/cms/push-notification/addPushNotifications");
const publishHeroBanner = require("../../controllers/cms/hero-banner/publishHeroBanner");

const addRaceWidget = require("../../controllers/cms/race-widget/addRaceWidget");
const editRaceWidget = require("../../controllers/cms/race-widget/editRaceWidget");
const orderRaceWidget = require("../../controllers/cms/race-widget/orderRaceWidget");
const publishRaceWidget = require("../../controllers/cms/race-widget/publishRaceWidget");
const deleteRaceWidget = require("../../controllers/cms/race-widget/deleteRaceWidget");
const getWidgetData = require("../../controllers/cms/race-widget/raceWidgetData");
const getRaceEventData = require("../../controllers/cms/race-widget/raceEventData");
const getWidgetList = require("../../controllers/cms/race-widget/raceWidgetList");

const sportWidget = require("../../controllers/cms/sport-widget/sportWidget");
const addSportWidget = require("../../controllers/cms/sport-widget/addSportWidget");
const editSportWidget = require("../../controllers/cms/sport-widget/editSportWidget");
const deleteSportWidget = require("../../controllers/cms/sport-widget/deleteSportWidget");
const addRacingWidget = require("../../controllers/cms/racing-widget/addRacingWidget");
const editRacingWidget = require("../../controllers/cms/racing-widget/editRacingWidget");
const editContent = require("../../controllers/cms/page-content/editContent");
const publishedContent = require("../../controllers/cms/content/publishedContent");
const terms = require("../../controllers/cms/terms/terms");
const termVersion = require("../../controllers/cms/terms/termVersion");
const policies = require("../../controllers/cms/policies/policies");
const generalDelete = require("../../controllers/cms/generalDelete");
const editPolicies = require("../../controllers/cms/policies/editPolicies");
const editTerm = require("../../controllers/cms/terms/editTerm");
const deletePageContent = require("../../controllers/cms/page-content/deletePageContent");
const linkGroups = require("../../controllers/cms/footer-links/linkGroups");
const editSentStop = require("../../controllers/cms/push-notification/editSentStop");
const editMenuLinks = require("../../controllers/cms/menu-link/editMenuLinks");
const changeMenuLinksShow = require("../../controllers/cms/menu-link/changeMenuLinksShow");
const deleteImage = require("../../controllers/cms/bet-slip/deleteImage");
const getListBetTicker = require("../../controllers/cms/bet-ticker/getListBetTicker");
const editBetTickerStatus = require("../../controllers/cms/bet-ticker/editBetTickerStatus");
const editBetFlag = require("../../controllers/cms/bet-ticker/editBetFlag");

const contentRoutes = require("./content.routes");
const variableRoutes = require("./variable.routes");
const imageRoutes = require("./image.routes");
const countryRoutes = require("./country.routes");
const betSlipRoutes = require("./betSlip.routes");
const casinoRoutes = require("./casino.routes");
const layoutRoutes = require("./layout.routes");
const menuLinkRoutes = require("./menuLink.routes");
const messageCodesRoutes = require("./messageCodes.routes");
const pushNotificationRoutes = require("./pushNotification.routes");
const footerLinksRoutes = require("./footerLinks.routes");
const policieRoutes = require("./policie.routes");
const sportWidgetRoutes = require("./sportWidget.routes");
const termRoutes = require("./term.routes");
const cmsOpenApiRoutes = require("./cmsOpenApi.routes");
const carouselRoutes = require("./carousel.routes");
const heroWidgetRoutes = require("./heroWidget.routes");
const heroBannerRoutes = require("./heroBanner.routes");
const racingWidgetRoutes = require("./racingWidget.routes");
const addCarouselGroup = require("../../controllers/cms/carousel/addCarouselGroup");
const carouselGroups = require("../../controllers/cms/carousel/carouselGroups");
const deleteCarouselGroup = require("../../controllers/cms/carousel/deleteCarouselGroup");
const deleteFooterImage = require("../../controllers/cms/footer-links/deleteFooterImage");
const deleteFooterLink = require("../../controllers/cms/footer-links/deleteFooterLink");
const orderCasinoGame = require("../../controllers/cms/casino/orderCasinoGame");
const editPolicies2 = require("../../controllers/cms/policies/editPolicies2");
const editTerm2 = require("../../controllers/cms/terms/editTerm2");
const editFromOffer = require("../../controllers/cms/bet-ticker/updateStatusFromOffer");

// Content
app.use("/content", auth, contentRoutes);

// Variable
app.use("/variable", auth, variableRoutes);

// Image
app.use("/image", auth, imageRoutes);

// Country
app.use("/country", auth, countryRoutes);

// Bet slip
app.use("/bet-slip", auth, betSlipRoutes);

// Casino
app.use("/casino", auth, casinoRoutes);

// Layout
app.use("/layout", auth, layoutRoutes);

// Menu link
app.use("/menu-link", auth, menuLinkRoutes);

// Message codes
app.use("/message-code", auth, messageCodesRoutes);

// Push notification
app.use("/push-notification", auth, pushNotificationRoutes);

// Footer links
app.use("/footer-link", auth, footerLinksRoutes);

// Policies
app.use("/policie", auth, policieRoutes);

// Sport widget
app.use("/sport-widget", auth, sportWidgetRoutes);

// Term
app.use("/term", auth, termRoutes);

// CMS Open API
app.use("/open-api", auth, cmsOpenApiRoutes);

// Carousel
app.use("/carousel", auth, carouselRoutes);

// Hero widget
app.use("/hero-widget", auth, heroWidgetRoutes);

// Hero banner
app.use("/hero-banner", auth, heroBannerRoutes);

// Racing widget
app.use("/racing-widget", auth, racingWidgetRoutes);

// Get endpoints
router.get("/content", auth, content); // TODO: Remove this endpoint
router.get("/variable", auth, variable); // TODO: Remove this endpoint
router.get("/all-images", auth, allImages); // TODO: Remove this endpoint
router.get("/change-countries", auth, changeCountries); // TODO: Remove this endpoint
router.get("/published-content", auth, publishedContent); // TODO: Remove this endpoint

// bet ticker
router.get("/list/bet-ticker", auth, getListBetTicker);
router.post("/bet-ticker/edit-status", auth, editBetTickerStatus);
router.post("/bet-ticker/edit-flag/:bet_id", auth, editBetFlag);
router.post("/bet-ticker/offer/edit", auth, editFromOffer);

// Get Bet Slip
router.get("/bet-slip", auth, betSlip); // TODO: Remove this endpoint

// Get Casino
router.get("/casino/games", auth, games); // TODO: Remove this endpoint
router.get("/casino/groups", auth, groups); // TODO: Remove this endpoint
router.get("/casino/group-items", auth, groupItems); // TODO: Remove this endpoint

// Get Page Layout
router.get("/page-layout", auth, pageLayout); // TODO: Remove this endpoint
router.get("/page-content", auth, pageContent); // TODO: Remove this endpoint

// Get Menu Links
router.get("/menu-links", auth, menuLinks); // TODO: Remove this endpoint

// Get Message codes
router.get("/message-codes", auth, messageCodes); // TODO: Remove this endpoint

// Get Push Notification
router.get("/push-notifications", auth, pushNotification); // TODO: Remove this endpoint

// Get Footer Links
router.get("/footer-link", auth, links); // TODO: Remove this endpoint
router.get("/grouped-footer-links", auth, linkGroups); // TODO: Remove this endpoint

// Get Policies
router.get("/policies", auth, policies); // TODO: Remove this endpoint

// Get sport widget
router.get("/sport-widget", auth, sportWidget); // TODO: Remove this endpoint

// Get terms
router.get("/terms", auth, terms); // TODO: Remove this endpoint
router.get("/term-version", auth, termVersion); // TODO: Remove this endpoint
router.get("/carousel-groups", auth, carouselGroups); // TODO: Remove this endpoint

// Post endpoints
router.post("/edit-variables", auth, editVariable); // TODO: Remove this endpoint
router.post("/image-library/add", auth, addImageLibrary); // TODO: Remove this endpoint
router.post("/content/delete", auth, deleteBetSlip); // TODO: Remove this endpoint
router.post("/add-variable", auth, addVariable); // TODO: Remove this endpoint
router.post("/images/delete", auth, deleteImage); // TODO: Remove this endpoint
router.post("/cms-open-api", auth, cmsOpenApi); // TODO: Remove this endpoint

// Post Bet Slip
router.post("/add-bet-slip", auth, addBetSlip); // TODO: Remove this endpoint
router.post("/edit-bet-slip", auth, editBetSlip); // TODO: Remove this endpoint
router.post("/delete-bet-slip", auth, deleteBetSlip); // TODO: Remove this endpoint
router.post("/publish-bet-slip", auth, publishBetSlip); // TODO: Remove this endpoint
router.post("/order-bet-slip", auth, orderBetSlip); // TODO: Remove this endpoint

// Post Casino
router.post("/casino/add-group", auth, addGroup); // TODO: Remove this endpoint
router.post("/casino/delete-group", auth, deleteGroup); // TODO: Remove this endpoint
router.post("/casino/order-group", auth, orderGroup); // TODO: Remove this endpoint
router.post("/casino/add-game", auth, addGame); // TODO: Remove this endpoint
router.post("/casino/edit-game", auth, editGame); // TODO: Remove this endpoint
router.post("/casino/order-game", auth, orderGame); // TODO: Remove this endpoint

// Post Carousel
router.post("/carousel/add", auth, addCarousel); // TODO: Remove this endpoint
router.post("/carousel/edit", auth, editCarousel); // TODO: Remove this endpoint
router.post("/carousel/publish", auth, publishCarousel); // TODO: Remove this endpoint
router.post("/carousel/order", auth, orderCarousel); // TODO: Remove this endpoint

// Post Hero Widget
router.post("/hero-widget/add", auth, addHeroWidget); // TODO: Remove this endpoint
router.post("/hero-widget/edit", auth, editHeroWidget); // TODO: Remove this endpoint
router.post("/hero-widget/order", auth, orderHeroWidget); // TODO: Remove this endpoint
router.post("/hero-widget/publish", auth, publishHeroWidget); // TODO: Remove this endpoint

// Post Page Layout
router.post("/page-layout/add", auth, addPageLayout); // TODO: Remove this endpoint
router.post("/delete-page-layout", auth, deletePageLayout); // TODO: Remove this endpoint
router.post("/order-page-layout", auth, orderPageLayout); // TODO: Remove this endpoint

// Post Page Content
router.post("/page-content/edit", auth, editContent); // TODO: Remove this endpoint
router.post("/page-content/delete", auth, deletePageContent); // TODO: Remove this endpoint
router.post("/carousel-group/add", auth, addCarouselGroup); // TODO: Remove this endpoint

// Post Menu Links
router.post("/save-menu-links", auth, addMenuLink); // TODO: Remove this endpoint
router.post("/delete-menu-links", auth, deleteMenuLinks); // TODO: Remove this endpoint
router.post("/edit-menu-links", auth, editMenuLinks); // TODO: Remove this endpoint
router.post("/order-menu-links", auth, orderMenuLinks); // TODO: Remove this endpoint
router.post("/show-menu-links", auth, changeMenuLinksShow); // TODO: Remove this endpoint

// Post Footer Links
router.post("/footer-link/save", auth, saveLinks); // TODO: Remove this endpoint
router.post("/footer-link/delete", auth, deleteLink); // TODO: Remove this endpoint
router.post("/order-footer-links", auth, orderLink); // TODO: Remove this endpoint
router.delete("/footer-link/:id", auth, deleteFooterLink); // TODO: Remove this endpoint

// Post Messages Codes
router.post("/message-codes/add", auth, addMessageCodes); // TODO: Remove this endpoint
router.post("/message-codes/edit", auth, editMessageCodes); // TODO: Remove this endpoint

// Post Push Notifications
router.post("/push-notifications/add", auth, addPushNotifications); // TODO: Remove this endpoint
router.post("/push-notifications/edit-sent-stop", editSentStop); //     TODO: Remove this endpoint

// Post Hero Banner
router.post("/add-hero-banner", auth, addHeroBanner); // TODO: Remove this endpoint
router.post("/hero-banner/edit", auth, editHeroBanner); // TODO: Remove this endpoint
router.post("/hero-banner/publish", auth, publishHeroBanner); // TODO: Remove this endpoint

// Post Sport Widget
router.post("/sport-widget/add", auth, addSportWidget); // TODO: Remove this endpoint
router.post("/sport-widget/edit", auth, editSportWidget); // TODO: Remove this endpoint
router.post("/delete-sport-widget", auth, deleteSportWidget); // TODO: Remove this endpoint

// Post Policies
router.post("/policies/edit", auth, editPolicies); // TODO: Remove this endpoint
router.post("/policies/edit-2", auth, editPolicies2);
router.post("/general-delete", auth, generalDelete); // TODO: Remove this endpoint

// Post Racing Widget
router.post("/racing-widget/add", auth, addRacingWidget); // TODO: Remove this endpoint
router.post("/racing-widget/edit", auth, editRacingWidget); // TODO: Remove this endpoint

// Race Widget
router.post("/race-widget/add", auth, addRaceWidget); // TODO: Remove this endpoint

// Put Race Widget
router.put("/race-widget/edit", auth, editRaceWidget); // TODO: Remove this endpoint
router.put("/casino/order", auth, orderCasinoGame); // TODO: Remove this endpoint

// Patch Race Widget
router.patch("/race-widget/order", auth, orderRaceWidget); // TODO: Remove this endpoint
router.patch("/race-widget/publish", auth, publishRaceWidget); // TODO: Remove this endpoint

// Delete Race Widget
router.delete("/race-widget/delete", auth, deleteRaceWidget); // TODO: Remove this endpoint

//API calls to SIS data
router.get("/race-widget/data", auth, getWidgetData); // TODO: Remove this endpoint
router.get("/race-widget/race/:id", auth, getRaceEventData); // TODO: Remove this endpoint
router.get("/race-widget/list", auth, getWidgetList); // TODO: Remove this endpoint

// Post Terms
router.post("/term/edit", auth, editTerm); // TODO: Remove this endpoint
router.post("/term/edit-2", auth, editTerm2);
router.post("/carousel-group/delete", auth, deleteCarouselGroup); // TODO: Remove this endpoint

// Delete Footer Image
router.delete("/footer-link/image/:id", auth, deleteFooterImage);

module.exports = router;
