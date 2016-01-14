
int pin = 9;

void setup() {
   Serial.begin(9600);
   pinMode(pin, INPUT);
}

void loop() {
  Serial.println(digitalRead(pin));
  delay(20);
}
