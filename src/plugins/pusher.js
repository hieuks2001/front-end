import Pusher from "pusher-js";


const apiKey = "e12429393cd2807ef684";
const cluster = "ap1";

const pusher = new Pusher(apiKey, {
  cluster: cluster,
});

export default pusher;
