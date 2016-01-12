#include <RotoPhone.h>

int notaryNumber;
boolean _isPick;

RotoPhone roto(4,5,3, false);

void setup() {
   Serial.begin(9600);
   Serial.println("Void setup");
}

void loop() {

  // Capture the rotary number
  notaryNumber = roto.number();
  if(notaryNumber >= 0){
    Serial.println(notaryNumber);
  }
  
  // Capture the phone state
  boolean isPickUp = roto.isPick();
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
