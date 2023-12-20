import jwt from "jsonwebtoken";

class Verification {
  // Middleware for login (user, company, and admin)
  static async verifyLogin(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ alert: "No login token provided" });
    }

    const splitToken = token.split(" ")[1];
    jwt.verify(splitToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error(err.message);
        return res.status(403).json({ message: "Failed to authenticate login token" });
      }
      req.id = decoded.id;
      next();
    });
  }

  // Middleware for login (user and admin)
  static async verifyUser(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ alert: "No login token provided" });
    }

    const splitToken = token.split(" ")[1];
    jwt.verify(splitToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error(err.message);
        return res.status(403).json({ message: "Failed to authenticate login token" });
      } else if (!(decoded.role === "User" || decoded.role === "Admin")) {
        return res.status(403).json({ message: "Unauthorized!" });
      }
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  }

  // Middleware for login (admin)
  static async verifyAdmin(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ alert: "No login token provided" });
    }

    const splitToken = token.split(" ")[1];
    jwt.verify(splitToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error(err.message);
        return res.status(403).json({ message: "Failed to authenticate login token" });
      } else if (decoded.role !== "Admin") {
        return res.status(403).json({ message: "Unauthorized!" });
      }
      req.id = decoded.id;
      next();
    });
  }

  // Middleware for login (company)
  static async verifyCompany(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ alert: "No login token provided" });
    }

    const splitToken = token.split(" ")[1];
    jwt.verify(splitToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error(err.message);
        return res.status(403).json({ message: "Failed to authenticate login token" });
      } else if (!(decoded.isCompany || decoded.role === "Admin")) {
        return res.status(403).json({ message: "Unauthorized!" });
      }
      req.id = decoded.id;
      next();
    });
  }
}

export default Verification;
