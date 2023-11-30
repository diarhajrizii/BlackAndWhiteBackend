const express = require("express");
const app = express();
const router = express.Router();

const sportTypeTest = require("./sportTypeTest");
// const sportType = require("../../controllers/sports/sportsType/sportType");
// const competitionsGroups = require("../../controllers/sports/competitionsGroups");
// const sportOrder = require("../../controllers/sports/sportsOrder/sportOrder");
// const editSportsType = require("../../controllers/sports/sportsType/editSportsType");
// const sportRegions = require("../../controllers/sports/sportRegions/sportRegions");
// const periodCompetitions = require("../../controllers/sports/periodCompetitions");
// const competitions = require("../../controllers/sports/competitions");
// const players = require("../../controllers/sports/Players/players");
// const defaultCompetitions = require("../../controllers/sports/defaultCompetitions");
// const venues = require("../../controllers/sports/venues");
// const competitors = require("../../controllers/sports/competitors");
// const favoriteCompetitionsData = require("../../controllers/sports/favoriteCompetitionsData");
// const addSportOrder = require("../../controllers/sports/sportsOrder/addSportOrder");
// const cloneSportOrder = require("../../controllers/sports/sportsOrder/cloneSportOrder");
// const editCompetitionsFavoriteStatus = require("../../controllers/sports/editCompetitionsFavoriteStatus");
// const createPeriodLeagues = require("../../controllers/sports/createPeriodLeagues");
// const deleteSportOrder = require("../../controllers/sports/sportsOrder/deleteSportOrder");
// const addDefaultLeauge = require("../../controllers/sports/addDefaultLeauge");
// const editCompetitionsGroup = require("../../controllers/sports/editCompetitionsGroup");
// const editCompetitions = require("../../controllers/sports/editCompetitions");
// const editPlayer = require("../../controllers/sports/editPlayer");
// const addPlayer = require("../../controllers/sports/addPlayer");
// const createCompetitionsGroup = require("../../controllers/sports/createCompetitionsGroup");
// const updateDefaultLeaguesOrder = require("../../controllers/sports/updateDefaultLeaguesOrder");
// const deleteDefaultLeagues = require("../../controllers/sports/deleteDefaultLeagues");
// const editRegions = require("../../controllers/sports/editRegions");
// const getCompetitionsGroups = require("../../controllers/sports/getCompetitionsGroups");
// const sportRoutes = require("./sport.routes");
// const competitionRoutes = require("./competition.routes");
// const regionRoutes = require("./region.routes");
// const competitorRoutes = require("./competitor.routes");
// const playerRoutes = require("./player.routes");
// const venueRoutes = require("./venue.routes");
// const defaultLeagueRoutes = require("./defaultLeague.routes");
// const periodLeagueRoutes = require("./periodLeague.routes");
// const orderSportType = require("../../controllers/sports/sportsType/orderSportType");
// const addCompetitors = require("../../controllers/sports/addCompetitors");
// const editCompetitors = require("../../controllers/sports/editCompetitors");
// const sportTiers = require("../../controllers/sports/liabilitiesSport/sportTiers");
// const getSportLiabilities = require("../../controllers/sports/liabilitiesSport/getSportLiabilities");
// const editSportTier = require("../../controllers/sports/liabilitiesSport/editSportTier");
// const addSportTier = require("../../controllers/sports/liabilitiesSport/addSportTier");
// const deleteSportTier = require("../../controllers/sports/liabilitiesSport/deleteSportTier");
// const orderSportTier = require("../../controllers/sports/liabilitiesSport/orderSportTier");
// const addSportEventConnection = require("../../controllers/sports/event_market_filters/addSportEventConnection");
// const orderSportEventConnection = require("../../controllers/sports/event_market_filters/orderSportEventConnection");
// const deleteSportEventConnection = require("../../controllers/sports/event_market_filters/deleteSportEventConnection");
// const addSportEvent = require("../../controllers/sports/event_market_filters/addSportEvent");
// const deleteSportEvent = require("../../controllers/sports/event_market_filters/deleteSportEvent");
// const editSportEvent = require("../../controllers/sports/event_market_filters/editSportEvent");
// const orderSportEvent = require("../../controllers/sports/event_market_filters/orderSportEvent");
// const getSportEventConnections = require("../../controllers/sports/event_market_filters/getSportEventConnections");
// const editDefaultLeague = require("../../controllers/sports/editDefaultLeague");
// const addCompetitions = require("../../controllers/sports/addCompetitions");
// const getSportEvents = require("../../controllers/sports/event_market_filters/getSportEvents");
// const editSportDefaultEventConnection = require("../../controllers/sports/event_market_filters/editSportDefaultEventConnection");

// Sport
// app.use("/sport", auth, sportRoutes);

// // Competition
// app.use("/competition", auth, competitionRoutes);

// // Region
// app.use("/region", auth, regionRoutes);

// // Competitor
// app.use("/competitor", auth, competitorRoutes);

// // Player
// app.use("/player", auth, playerRoutes);

// // Venue
// app.use("/venue", auth, venueRoutes);

// // Default League
// app.use("/default-league", auth, defaultLeagueRoutes);

// // Period League
// app.use("/period-league", auth, periodLeagueRoutes);

router.get("/sport", sportTypeTest); // TODO: Remove this route
// router.get("/sport-order", auth, sportOrder); // TODO: Remove this route
// router.get("/competitions-groups", auth, competitionsGroups); // TODO: Remove this route
// router.get("/sport-regions", auth, sportRegions); // TODO: Remove this route
// router.get("/period-competitions", auth, periodCompetitions); // TODO: Remove this route
// router.get("/competitions", auth, competitions); // TODO: Remove this route
// router.get("/competitors", auth, competitors); // TODO: Remove this route
// router.post("/competitors", auth, addCompetitors); // TODO: Remove this route
// router.put("/competitors", auth, editCompetitors); // TODO: Remove this route
// router.get("/player", auth, players); // TODO: Remove this route
// router.get("/default-competitions", auth, defaultCompetitions); // TODO: Remove this route
// router.get("/venues", auth, venues); // TODO: Remove this route
// router.get(
//   "/competitions/favorite-competition-data",
//   auth,
//   favoriteCompetitionsData
// ); // TODO: Remove this route
// router.get("/group-competitions/edit", auth, getCompetitionsGroups); // TODO: Remove this route

// Post sports
// router.post("/edit-sports", auth, editSportsType); // TODO: Remove this route
// router.post("/sport-order/add", auth, addSportOrder); // TODO: Remove this route
// router.post("/sport-order/clone", auth, cloneSportOrder); // TODO: Remove this route
// router.post("/sport-order/delete", auth, deleteSportOrder); // TODO: Remove this route
// router.post(
//   "/competitions-favorite-status/edit",
//   auth,
//   editCompetitionsFavoriteStatus
// ); // TODO: Remove this route

// router.put("/order", orderSportType);
// router.post("/default-league/add", auth, addDefaultLeauge); // TODO: Remove this route
// router.post("/competitions-group/edit", auth, editCompetitionsGroup); // TODO: Remove this route
// router.post("/competitions/edit", auth, editCompetitions); // TODO: Remove this route
// router.post("/player/edit", auth, editPlayer); // TODO: Remove this route
// router.post("/player/add", auth, addPlayer); // TODO: Remove this route
// router.post("/competitions-group/add", auth, createCompetitionsGroup); // TODO: Remove this route
// router.post("/default-leagues-order/update", auth, updateDefaultLeaguesOrder); // TODO: Remove this route
// router.post("/default-leagues/delete", auth, deleteDefaultLeagues); // TODO: Remove this route
// router.post("/regions/edit", auth, editRegions); // TODO: Remove this route
// router.post("/period-leagues/add", auth, createPeriodLeagues); // TODO: Remove this route
// router.post("/default/leagues/edit", auth, editDefaultLeague);
// router.post("/competitions/add", auth, addCompetitions);
// // Sport Tier
// // Get
// router.get("/tiers", sportTiers);
// router.get("/sport_liabilities", getSportLiabilities);
// // Post
// router.post("/tier", addSportTier);
// router.post("/tier", deleteSportTier);
// // Put
// router.put("/tier", editSportTier);
// // Delete
// router.delete("/tier/:tier_id", deleteSportTier);

// // Events
// router.get("/event", getSportEvents);
// router.post("/event", addSportEvent);
// router.delete("/event/:id", deleteSportEvent);
// router.put("/event", editSportEvent);
// router.put("/event/order", orderSportEvent);

// // Event connections
// router.get("/event/connection", getSportEventConnections);
// router.post("/event/connection", addSportEventConnection);
// router.delete("/event/connection/:id", deleteSportEventConnection);
// router.put("/event/connection/order", orderSportEventConnection);
// router.put("/event/connection/default/:id", editSportDefaultEventConnection);

module.exports = router;
