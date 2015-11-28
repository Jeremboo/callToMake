 const int ledPin =  13;      // the number of the LED pin
 const int thresholdvalue=400; //The threshold to turn the led on
 
 void setup() {
   Serial.begin(9600);
    pinMode(ledPin, OUTPUT); 
 }
 void loop() {
 int sensorValue = analogRead(A0); //use A0 to read the electrical signal
 Serial.println(sensorValue);
 //if(sensorValue>thresholdvalue)
 //digitalWrite(ledPin,HIGH); //if the value read from A0 is larger than 400,then light the LED
 delay(200);
 //digitalWrite(ledPin,LOW);
 }
