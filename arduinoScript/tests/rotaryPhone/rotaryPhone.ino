const int buttonPinCircle = 2;
const int buttonPinState = 3;
int buttonState = 0;
int pinState = 0;
int pinCircle = 0;
int timer = 0;
bool startListener = false;
String checkCode = "";
int figure = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(buttonPinCircle, OUTPUT);
  pinMode(buttonPinState, OUTPUT);

  attachInterrupt(digitalPinToInterrupt(buttonPinState),numberComposed,CHANGE);
  
  attachInterrupt(digitalPinToInterrupt(buttonPinCircle),circleLocked,CHANGE);
}

void numberComposed() {
  pinState = digitalRead(buttonPinState);
  pinCircle = digitalRead(buttonPinCircle);
  Serial.println(pinState);
  if (pinCircle == 1){
    checkCode += pinState;
  }
}

void circleLocked() {
  pinCircle = digitalRead(buttonPinCircle);
  Serial.print("Circle locked : ");
  Serial.println(buttonState);
  if(buttonState == 0) {
    Serial.println(checkCode);
    figure = convertToFigure();
    Serial.print("Tu as choisi le chiffre... ");
    Serial.print(figure);
    Serial.println(" !");
    checkCode = "";
  }
}

int convertToFigure() {
  int myFigure = 0;
  Serial.println("CHECK PROCESSUS !");
  for (int i=0; i<=checkCode.length();i++) {
    if(checkCode[i] == '0' && checkCode[i+1] == '1'){
      myFigure++;
    }
  }

  if (myFigure == 10){
    myFigure = 0;
  }

  return myFigure;
}

void loop() {
  
  // put your main code here, to run repeatedly:
  //buttonState = digitalRead(buttonPinState);
  //buttonState = digitalRead(buttonPinCircle);
  //Serial.println(buttonState);
  //delay(90);

//  if (checkNextValue) {
//    timer += 1;
//    
//    if (buttonState == 1) {
//        startListener = false;
//        Serial.println(timer);
//        timer = 0;
//    }
//    checkNextValue = false;
//  }
//
//  if (startListener) {
//    timer += 1;
//
//    if (buttonState == 1) {
//      checkNextValue = true;
//    }
//  }
//  
//  if (buttonState == 0){
//    startListener = true;
//  }
}
