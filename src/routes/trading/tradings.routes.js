const express = require("express");
const router = express.Router();
const app = express();

const auth = require("../../middlewares/auth.middelware");
const betRoutes = require("./bet.routes");
const marketRoutes = require("./market.routes");

const specials = require("../../controllers/trading/specials/specials");
const editSelectionStatus = require("../../controllers/trading/editSelectionStatus");

// TODO delete all this call functions
const changeBetResult = require("../../controllers/trading/changeBetResult");
const changeBetStatus = require("../../controllers/trading/changeBetStatus");
const deleteSelectMarketType = require("../../controllers/trading/deleteSelectMarketType");
const deleteMarketType = require("../../controllers/trading/deleteMarketType");
const addMarketType = require("../../controllers/trading/addMarketType");
const editMarketSelection = require("../../controllers/trading/editMarketSelection");
const addCustomBets = require("../../controllers/trading/addCustomBets");
const addMarketsGroup = require("../../controllers/trading/addMarketsGroup");
const editMarketType = require("../../controllers/trading/editMarketType");
const marketSelection = require("../../controllers/trading/marketSelection");
const betsOdds = require("../../controllers/trading/betsOdds");
const bets = require("../../controllers/trading/bets");
const markets = require("../../controllers/trading/markets");
const marketsGroup = require("../../controllers/trading/marketsGroup");
const getCompetition = require("../../controllers/trading/getCompetition");
const liabilitieRoutes = require("./liabilitie.routes");
const liabilitie = require("../../controllers/trading/liabilitie");
const liabilitieSelections = require("../../controllers/trading/liabilitieSelections");
const getSport = require("../../controllers/trading/getSport");
const editCompetition = require("../../controllers/trading/editCompetition");
const orderCompetition = require("../../controllers/trading/orderCompetition");
const editVenue = require("../../controllers/trading/editVenue");
const addVenue = require("../../controllers/trading/addVenue");
const getEventMatches = require("../../controllers/trading/events/getEventMatches");
const editEventMatches = require("../../controllers/trading/events/editEventMatches");
const getTradingMarket = require("../../controllers/trading/getTradingMarket");
const getMarketsData = require("../../controllers/trading/getMarketsData");
const saveTradingMarket = require("../../controllers/trading/saveTradingMarket");
const getTradingMarketSelections = require("../../controllers/trading/getTradingMarketSelections");
const getTradingResult = require("../../controllers/trading/getTradingResult");
const getMarketTypeBySport = require("../../controllers/trading/getMarketTypeBySport");
const editMarketResult = require("../../controllers/trading/editMarketResult");

// Market routes
app.use("/market", auth, marketRoutes);

// Bet routes
app.use("/bet", auth, betRoutes);

// Liabiliti routes

// app.use("/liabilities", auth, liabilitiesRoutes);

// Get trading
router.get("/markets-group", auth, marketsGroup); // TODO Remove this endpoint
router.get("/markets", auth, markets); // TODO Remove this endpoint
router.get("/bets", auth, bets); // TODO Remove this endpoint
router.get("/bets-odds", auth, betsOdds); // TODO Remove this endpoint
router.get("/market-selection", auth, marketSelection); // TODO Remove this endpoint
router.get("/competition", auth, getCompetition);
router.get("/liabilitie/list", auth, liabilitie);
router.get("/liabilitie/selections", liabilitieSelections);
router.get("/sport/get-sport", getSport);

// Post trading

router.post("/specials", auth, specials); // TODO Remove this endpoint
router.post("/market-type/edit", auth, editMarketType); // TODO Remove this endpoint
router.post("/market-group/add", auth, addMarketsGroup); // TODO Remove this endpoint
router.post("/selection-status/edit", auth, editSelectionStatus); // TODO Remove this endpoint
router.post("/custom-bets/add", auth, addCustomBets); // TODO Remove this endpoint
router.post("/market-selection/edit", auth, editMarketSelection); // TODO Remove this endpoint
// router.post("/market-selection-type/add", auth, addMarketSelectionType); // TODO: Remove this route
router.post("/market-selection/add", auth, addMarketType); // TODO Remove this endpoint
router.post("/market-type/delete", auth, deleteMarketType); // TODO Remove this endpoint
router.post("/select-market-type/delete", auth, deleteSelectMarketType); // TODO Remove this endpoint
router.post("/change-bet-status", auth, changeBetStatus); // TODO Remove this endpoint
router.post("/change-bet-result", auth, changeBetResult); // TODO Remove this endpoint
router.post("/venue", auth, addVenue);

router.put("/venue", auth, editVenue);

router.put("/competition", auth, editCompetition);
router.put("/competition/order", auth, orderCompetition);

// General Events
router.get("/general/event", auth, getEventMatches);
router.put("/general/event", auth, editEventMatches);

// Markets
router.get("/trading/market", auth, getTradingMarket);
router.get("/trading/result", auth, getTradingResult);
router.post("/markets", auth, getMarketsData);
router.get("/trading/market/selection", auth, getTradingMarketSelections);
router.post("/trading/market", auth, saveTradingMarket);
router.get("/market/type", auth, getMarketTypeBySport);
router.put("/market/result", auth, editMarketResult);

module.exports = router;
