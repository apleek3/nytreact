const router = require("express").Router();
const articleRoutes = require("./articles");

// NYT Article routes
router.use("/articles", articleRoutes);

module.exports = router;