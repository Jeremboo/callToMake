#include <RotoPhone.h>

int number ;
RotoPhone roto(4,5, true);

void setup() {
   Serial.begin(9600);
   number = 0;
}
void loop() {
  number = roto.number();
  if(number>= 0){
    Serial.println(number);
  }

  delay(20);
}
