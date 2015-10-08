#define CDS_INPUT 0

String stringResult, stringValue;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(CDS_INPUT);
  
  stringValue = "value:";
  stringResult = stringValue + value + ";";  
  Serial.println(stringResult);
  
  delay(1000);
}
