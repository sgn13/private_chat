const express = require("express");
const friendController = require("../../controller/friendController");
const router = express();

router.post("/invite/:id", friendController.invite);
router.post("/invitetrue/:id", friendController.invitetrue);

router.get("/pending/:id", friendController.pending);
router.get("/allfriends/:id", friendController.friends);

router.delete("/delfriend", friendController.delete);
module.exports = router;
