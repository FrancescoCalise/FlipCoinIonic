#include "Arduino.h"
#include "MPU6050.h"
#include "Utility.h"
#include <display4Segmenti.h>
#include <SPI.h>
#include <Wire.h>
#include <avr/sleep.h>
#include <avr/power.h>
#include <EEPROM.h>

int16_t AcX,AcY,AcZ,InitAcX;
const int MPU_ADDR=0x68;
int valueRoll = 0;
bool isStarted = false;
unsigned long timerSleep;
const int maxTimerSleep = 30000;
const int tolleranceAccelerometer = 1500;
bool valueIsChanged=false;
unsigned long timerAcc;
unsigned long timerNumber;
unsigned long timerNumberBlank;
const int maxTimerAcc = 500;

String input="";
void StartSetup(){
 input =readStringFromEEPROM(10); 
  Serial.begin(9600);
  pinMode(2, INPUT_PULLUP);
  randomSeed(analogRead(0));
  setupAcceleromter();
  setupDisplay();
  timerSleep = millis();
  timerAcc = millis();
  timerNumber = millis();
  timerNumberBlank =millis();
} 

void setupAcceleromter(){
  Wire.begin();
  Wire.beginTransmission(MPU_ADDR); // Begins a transmission to the I2C slave (GY-521 board)
  Wire.write(0x6B); // PWR_MGMT_1 register
  Wire.write(0); // set to zero (wakes up the MPU-6050)
  Wire.endTransmission(true);
}

void loopCustom(){  
  readFormBluetooth();
 
  if (valueIsChanged){
    eePromClear();
    writeStringToEEPROM(10,input);
    delay(100);
    valueIsChanged=false;

  } 
  if(input != ""){
    if(valueRoll != 0){
      setNumber(valueRoll);
    }

    if(!isStarted && ReadValueFromAccelerometer()){
      isStarted = true;
      valueRoll = 0;
      if ( ( millis() - timerNumber) > maxTimerAcc){
        blank();
        do {
          setNumber(888);
          delay(100);
        } while (!ReadValueForLowValue());

        GetRandomNumber();
        updateTimer();
        InitAcX = 0;
        AcX = 0;
        timerNumber = millis();
        timerNumberBlank = millis();
        
      }
    }else
    {
      if(ReadValueFromAccelerometer()){
        isStarted= false;
      }else{
        isStarted= false;

        canGoToSleep();
      }
    }
  }else{

    setNumber(888);
  }
}

void readFormBluetooth(){
 
  char character;
  if(Serial.available()>0)
  {
    character = Serial.read();
    input = input + character;  
     valueIsChanged=true;
    updateTimer();
   
  }
}

boolean ReadValueFromAccelerometer(){
  if ( ( millis() - timerAcc) > maxTimerAcc){
    Wire.beginTransmission(MPU_ADDR);
    Wire.write(0x3B);
    Wire.endTransmission(false); 
    Wire.requestFrom(MPU_ADDR, 3*2, true);

    if(InitAcX == 0){
      InitAcX = Wire.read()<<8 | Wire.read();  
    }else{
      AcX = Wire.read()<<8 | Wire.read();  
    }

  
    timerAcc = millis();
    int acc = InitAcX - AcX;
    if(abs(acc) >= tolleranceAccelerometer){
   
      return true;
    }
  }
   return false;
}
boolean ReadValueForLowValue(){
  if ( ( millis() - timerAcc) > maxTimerAcc){
    Wire.beginTransmission(MPU_ADDR);
    Wire.write(0x3B); 
    Wire.endTransmission(false);
    Wire.requestFrom(MPU_ADDR, 3*2, true); 

      AcX = Wire.read()<<8 | Wire.read();  
    

    timerAcc = millis();
     int acc = InitAcX - AcX;
    if(abs(acc) <= 100){
      return true;
    }
  }
   return false;
}
void updateTimer(){
  timerSleep = millis();
  timerAcc = millis();
}

void GetRandomNumber(){
  int index = 0;
  int quantityDice;
  int typeDice;
  int otpionalIndex;
  valueRoll = 0;

  for(int x = 0; x < input.length(); x=x+1){
    if(input[x] == ','){
      quantityDice = input.substring(index,x).toInt();
      otpionalIndex =x+1;
    }
    if(input[x] == ';'){
      typeDice = input.substring(otpionalIndex,x).toInt();
      valueRoll = valueRoll + RollDice(quantityDice,typeDice);
      index = x+1;
    }
  }
}

int RollDice(int quantity,int value){
  int result;
  int maxvalue;
  maxvalue= (quantity*value) +1 ;
  result= random(quantity,maxvalue);
  return result; 
}

void canGoToSleep() {
  if ( ( millis() - timerSleep) > maxTimerSleep)
  {
    blank();
    attachInterrupt(digitalPinToInterrupt(2), Pin2Interrupt, LOW);
    delay(100);
    set_sleep_mode(SLEEP_MODE_PWR_DOWN);
    sleep_enable();  
    sleep_mode();
    // riparto qui

    sleep_disable();
    updateTimer();     
  }

}

void Pin2Interrupt() {
  detachInterrupt(digitalPinToInterrupt(2));  
}


String readStringFromEEPROM(int addrOffset)
{
  int newStrLen = EEPROM.read(addrOffset);
  if (newStrLen != 0){
    char data[newStrLen ];
    for (int i = 0; i < newStrLen; i++)
    {
      data[i] = EEPROM.read(addrOffset + i);
    }
    Serial.print("Data: ");
    Serial.println (String(data));
    return String(data);
  }
  return "";
}



void writeStringToEEPROM(int addrOffset,String strToWrite)
{
  
  byte len = strToWrite.length();
 Serial.print(EEPROM.length());
  for (int i = 0; i < len; i++)
  {
    EEPROM.write(addrOffset  + i, strToWrite[i]);
  }
}
void eePromClear(){
  for (int i = 0 ; i < EEPROM.length() ; i++) {
    EEPROM.write(i, 0);
  }
}