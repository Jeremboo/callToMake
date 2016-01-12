void setup() {
  Serial.begin(9600);
  Serial.println("Start");
}

void loop() {
  float microValue = analogRead(A0);
  float voltage = microValue;
  // print out the value you read:
  Serial.println(voltage);
}
