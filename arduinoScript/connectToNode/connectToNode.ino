#define CDS_INPUT 0

String stringResult, stringValue;

int pinButton = 12; //the pin where we connect the button


void setup() {
  Serial.begin(9600);
  pinMode(pinButton, INPUT); //set the button pin as INPUT
}

void loop() {
  int stateButton = digitalRead(pinButton); //read the state of the button
  String value;

  if(stateButton == 1) { //if is pressed
    value = "pressed";
  } else { //if not pressed
    value = "not pressed";
  }

  stringValue = "btn ";
  stringResult = stringValue + value + ";";  
  Serial.println(stringResult);
  
  delay(1000);
}
