#include "display4Segmenti.h"
#include "Arduino.h"
#include "Utility.h"
#include <SevSeg.h>

SevSeg sevseg;

int pinE  = 3;
int pinD  = 4;
int pinC  = 5;
int pinG  = 6;
int pinB  = 7;
int DIG3  = 8;
int DIG2  = 9;
int pinF  = 10;
int pinA  = 11;
int DIG1  = 12;
int pinPunto = 13;

void setupDisplay()
{
  byte numDigits = 3;
  byte digitPins[] = {DIG1, DIG2, DIG3};
  byte segmentPins[] = {pinA, pinB, pinC, pinD, pinE, pinF, pinG,pinPunto};
  bool resistorOnSegments = false;
  byte hardwareConfig = COMMON_ANODE;
  bool updateWithDelays = false;
  bool leadingZeros = false;
  sevseg.begin(hardwareConfig, numDigits, digitPins, segmentPins,
  resistorOnSegments, updateWithDelays, leadingZeros);
  sevseg.setBrightness(90);
}

void setNumber(int number){
  sevseg.setNumber(number, 0);
  sevseg.refreshDisplay();
}

void blank(){
  sevseg.blank();
  sevseg.refreshDisplay();
}