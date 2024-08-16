import { ReadlineParser } from "@serialport/parser-readline";
import mqtt from 'mqtt';
import { SerialPort } from "serialport";

// mqtt client
const client = mqtt.connect('http://localhost:1883');
// serial USB config
const serialport = new SerialPort({
    path: "COM6",
    baudRate: 9600,
  });
const parser = serialport.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// open serial port
serialport.on("open", () => {
    console.log("Serial Port is opened");
});

// recepción de los datos vía USB
parser.on('data', (data) => {
    console.log('Data:', data);
    client.publish('pot-topic', data);
});

// send data to mqtt broker
client.on('connect', () => {
    console.log('Connected to MQTT broker!');
});