const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const { Provider } = require("oidc-provider");
const { nextTick } = require("process");
const configuration = {
  // ... see /docs for available configuration
  clients: [
    {
      client_id: "foo",
      client_secret: "bar",
      redirect_uris: ["https://mpvoxk.sse.codesandbox.io", "https://jwt.io"]
      // ... other client properties
    }
  ]
};

const oidc = new Provider(
  "https://mpvoxk.sse.codesandbox.io/oidc",
  configuration
);
oidc.proxy = true;
// oidc.listen(3000, () => {
//   console.log(
//     "oidc-provider listening on port 3000, check http://localhost:3000/.well-known/openid-configuration"
//   );
// });

app.use(express.json());
app.use(cors());
// assumes express ^4.0.0
app.use(
  "/oidc",
  (req, res, next) => {
    console.log(req);
    next();
  },
  oidc.callback(),
  (req, res) => {
    console.log(req);
  }
);

app.post("/", function (req, res) {
  console.log(req.body);
  res.send("thank you from post route");
});

app.get("/", (req, res) => {
  console.log(req.query);
  res.send("thank you from get route");
});

app.get("/handle", (req, res) => {
  console.log(req.query);
  res.send("thank you from get route");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
