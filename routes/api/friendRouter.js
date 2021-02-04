const express = require("express");
const friendController = require("../../controller/friendController");
const router = express();

router.post("/invite/:id", friendController.invite);
router.post("/invitetrue/:id", friendController.invitetrue);

router.get("/pending", friendController.pending);
router.get("/allfriends/:id", friendController.friends);
module.exports = router;
