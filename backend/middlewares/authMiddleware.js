import admin from "../firebase";

export const authVerify = async (req, res, next) => {
  //   console.log(req.headers);
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
