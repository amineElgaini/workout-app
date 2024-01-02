const express = require("express");

// controller functions
const {
    loginUser,
    signupUser,
    addUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    getMyProfile,
    updateMyProfile,
    deleteMyProfile,
} = require("../controllers/userController");

const requireAuth = require("../middleware/requireAuth");
const authorization = require("../middleware/authorization");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

router.use(requireAuth);

/* admin crud */
// get users
router.get("/admin", authorization("admin"), getUsers);

// add
router.post("/admin/add", authorization("admin"), addUser);

// get user
router.get("/admin/:id", authorization("admin"), getUser);

// update
router.patch("/admin/:id", authorization("admin"), updateUser);

// delete
router.delete("/admin/:id", authorization("admin"), deleteUser);

/* user crud */

// get user
router.get("/", getMyProfile);

// update
router.patch("/", updateMyProfile);

// delete
router.delete("/" /* , authorization("admin", "user") */, deleteMyProfile);

module.exports = router;
/* 
login / signup
add delete update read => admin or user
*/
