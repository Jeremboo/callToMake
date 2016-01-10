void setup() {
  Serial.begin(9600);
  Serial.println("Start");
}

void loop() {
  int microValue = analogRead(A0);
  float voltage = microValue / 100;
  // print out the value you read:
  Serial.println(voltage);
}
