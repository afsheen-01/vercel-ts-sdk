import * as dotenv from "dotenv";

dotenv.config();

const fetchDeploy = async () => {
  await fetch("https://api.vercel.com/v6/deployments", {
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    },
    method: "get",
  }).then((res) => console.log(res.json().then(console.log)));
};

fetchDeploy();
