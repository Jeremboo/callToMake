#include <RotoPhone.h>

int _notaryNumber;
boolean _isPick;

RotoPhone roto(4,6,2, false);

void setup() {
   Serial.begin(9600);
}

void loop() {

  // ##
  // Capture the rotary number
  _notaryNumber = roto.number();
  // - Send message
  if(_notaryNumber >= 0){
    Serial.println(_notaryNumber);
  }

  // ##
  // Capture the phone state
  boolean isPickUp = roto.isPick();
  // - Send message
  if(isPickUp != _isPick){
    if(isPickUp){
      Serial.println("hang up");
    } else {
      Serial.println("pick up");
    }
    _isPick = isPickUp;
  }

  delay(20);
}
