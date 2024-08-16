import mqtt from "mqtt";

// mqtt client
const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  client.subscribe("pot-topic");
});

client.on("message", (topic, message) => {
  console.log("Received from publisher: ", message.toString());
});