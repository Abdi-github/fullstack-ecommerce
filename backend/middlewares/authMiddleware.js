import admin from "../firebase";
import User from "../models/user";

// VERIFY USER BASED ON TOKEN

export const authVerify = async (req, res, next) => {
  // console.log("headers---------->", req.headers.usertoken);
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.usertoken);
    console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

// VERIFY USER BASED ON ITS ROLE

export const adminVerify = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      error: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};
