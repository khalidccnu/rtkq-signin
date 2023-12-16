require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const createJWT = (id) => {
  return jwt.sign({ _id: id }, "xyz", {
    expiresIn: "1h",
  });
};

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized access!" });
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, "xyz", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden access!" });

    req.decoded = decoded;
    next();
  });
};

const mdbClient = new MongoClient("mongodb://127.0.0.1:27017", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    const users = mdbClient.db("rtkq-signin").collection("users");

    app.post("/auth", async (req, res) => {
      const { email, password } = req.body;

      const user = await users.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "User not found!" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password!" });
      }

      const token = createJWT(user._id);
      delete user.password;

      res.json({
        message: "Sign in successful!",
        accessToken: token,
      });
    });

    app.post("/signup", async (req, res) => {
      const { email, password } = req.body;

      const existingUser = await users.findOne({ email });

      if (existingUser) {
        return res
          .status(409)
          .json({ message: "User with this email already exists!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        ...req.body,
        password: hashedPassword,
      };

      await users.insertOne(user);
      res.json({ message: "User registered successfully!" });
    });

    app.get("/user", verifyJWT, async (req, res) => {
      const options = {
        projection: { name: 1, email: 1 },
      };
      const query = { _id: new ObjectId(req.decoded._id) };
      const result = await users.findOne(query, options);

      res.json(result);
    });

    mdbClient
      .db("admin")
      .command({ ping: 1 })
      .then((_) => console.log("Successfully connected to MongoDB!"));
  } catch (err) {
    console.log("Did not connect to MongoDB! " + err.message);
  } finally {
    // await mdbClient.close();
  }
})();

app.get("/", (req, res) => {
  res.send("RTKQ is running...");
});

app.listen(port, () => {
  console.log(`RTKQ API is running on port: ${port}`);
});
