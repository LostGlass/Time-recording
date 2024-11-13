var express = require("express");
var mongoose = require("mongoose");
var serverRouterExport = require("./serverRouter");

var PORT = process.env.PORT || 2000;
var app = express();

app.use(express.json());
app.use("/server", serverRouterExport);
var start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://Ilua_Chursin:CrfuQDdthrnWXUFe@cluster88.lvtd80q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster88`
    );
    app.listen(PORT, () => console.log(`server  started on port ${PORT} `));
  } catch (e) {
    console.log(e);
  }
};
//Feb$B8A@xnGyiEx(parol BD)
start();
