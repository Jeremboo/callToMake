#include <RotoPhone.h>

const int HANGUP = 10;
const int PICKUP = 20;

int _rotaryNumber;
boolean _isPick;

RotoPhone roto(4,6,2, false);

void setup() {
   Serial.begin(9600);
}

void loop() {

  // ##
  // Capture the rotary number
  _rotaryNumber = roto.number();
  // - Send message
  if(_rotaryNumber >= 0){
    Serial.println(_rotaryNumber);
  }

  // ##
  // Capture the phone state
  boolean isPickUp = roto.isPick();
  // - Send message
  if(isPickUp != _isPick){
    if(isPickUp){
      Serial.println(HANGUP);
    } else {
      Serial.println(PICKUP);
    }
    _isPick = isPickUp;
  }

  delay(20);
}
