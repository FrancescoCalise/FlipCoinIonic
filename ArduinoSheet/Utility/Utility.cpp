#include "Utility.h"
#include "Arduino.h"

void ConsoleLog(String comment, int delayValue ){
    Serial.println(comment);
    delay(delayValue);
}
