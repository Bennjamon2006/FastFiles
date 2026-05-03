import app from "./app/server";
import serverConfig from "./config/server";

app.listen(serverConfig.port, serverConfig.host, () => {
  console.log(
    `Server is running at http://${serverConfig.host}:${serverConfig.port}`,
  );
});
