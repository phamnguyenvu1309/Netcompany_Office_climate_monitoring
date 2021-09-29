#include <dht11.h>
#include <SoftwareSerial.h>

String agAdi = "minhthu";                                     // write the name of our network here.
String agSifresi = "baanhminhanh";                             // write the password of our network here.

int rxPin = 10;                                                //ESP8266 RX pin
int txPin = 11;                                                //ESP8266 TX pin
int dht11Pin = 2;
String ip = "184.106.153.149";                                //Thingspeak ip Address
float temp, humi;
float noise, airquality;

dht11 DHT11;
SoftwareSerial esp(rxPin, txPin);                              // make serial communication pin settings.

void setup() {
  Serial.begin(9600);                                          // We are starting our communication with the serial port.
  Serial.println("Started");
  esp.begin(115200);                                           //starting serial communication with ESP8266.
  esp.println("AT");                                           //the module control with the AT command.
  Serial.println("AT  sent ");
  while (!esp.find("OK")) {                                    //wait until the module is ready.
    esp.println("AT");
    Serial.println("ESP8266 Not Find.");
  }
  Serial.println("OK Command Received");
  esp.println("AT+CWMODE=1");                                   //set the ESP8266 module as a client.
  while (!esp.find("OK")) {                                     //wait until the setting is done.
    esp.println("AT+CWMODE=1");
    Serial.println("Setting is ....");
  }
  Serial.println("Set as client");
  Serial.println("Connecting to the Network ...");
  esp.println("AT+CWJAP=\"" + agAdi + "\",\"" + agSifresi + "\""); //connecting to our network.
  while (!esp.find("OK"));                                       //connected to the network.
  Serial.println("connected to the network.");
  delay(1000);
}

void loop() {
  esp.println("AT+CIPSTART=\"TCP\",\"" + ip + "\",80");         //connect to Thingspeak.
  if (esp.find("Error")) {                                      //check the connection error.
    Serial.println("AT+CIPSTART Error");
  }
  DHT11.read(dht11Pin);
  temp = (int)DHT11.temperature;
  humi = (int)DHT11.humidity;
  airquality = (int)analogRead(0);
  noise = (int)analogRead(2);

  String veri = "GET https://api.thingspeak.com/update?api_key=1TN7PO7B8AUI3M7W&field1=0";   //write our own api key in the key part.
  veri += "&field1=";
  veri += String(temp);                                         // Send Temperature Data

  veri += "&field2=";
  veri += String(humi);                                         // Send Humidity Data

  veri += "&field3=";
  veri += String(airquality);                                   // Send Air Quality Data

  veri += "&field4=";
  veri += String(noise);                                        // Send Noise Level Data
  veri += "\r\n\r\n";

  esp.print("AT+CIPSEND=");                                     // give the length of data that we will send to ESP.
  esp.println(veri.length() + 2); 
  delay(2000);
  if (esp.find(">")) {                                          // The commands in it are running when ESP8266 is ready..
    esp.print(veri);                                            // send the data.
    Serial.println(veri);
    Serial.println("Data sent.");
    delay(1000);
  }
  Serial.println("Connection Closed.");
  esp.println("AT+CIPCLOSE");                                   // close the link
  delay(1000);                                                  // wait 5 second for sending new data.
}
