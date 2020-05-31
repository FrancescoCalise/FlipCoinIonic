#include "Arduino.h"
#include "MPU6050.h"
#include "Utility.h"
#include <display4Segmenti.h>
#include <SPI.h>
#include <Wire.h>
#include <avr/sleep.h>
#include <avr/power.h>

int16_t AcX,AcY,AcZ,InitAcX;
const int MPU_ADDR=0x68;
int valueRoll = 100;
bool isStarted = false;
unsigned long timerSleep;
const int maxTimerSleep = 30000;
const int tolleranceAccelerometer = 5000;

unsigned long timerAcc;
unsigned long timerNumber;
unsigned long timerNumberBlank;
const int maxTimerAcc = 500;

String input ="1,6;";
void StartSetup(){
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
        } while ( ( millis() - timerNumberBlank) < 3000);

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
    //canGoToSleep();
    //Serial.println("Dadi non assegnati.");
    setNumber(888);
    delay(100);
  }
}

void readFormBluetooth(){
  char character;
  if(Serial.available()>0)
  {
    character = Serial.read();
    input = input + character;  
    Serial.println(input);
    updateTimer();
  }
}

boolean ReadValueFromAccelerometer(){
  if ( ( millis() - timerAcc) > maxTimerAcc){
    Wire.beginTransmission(MPU_ADDR);
    Wire.write(0x3B); // starting with register 0x3B (ACCEL_XOUT_H) [MPU-6000 and MPU-6050 Register Map and Descriptions Revision 4.2, p.40]
    Wire.endTransmission(false); // the parameter indicates that the Arduino will send a restart. As a result, the connection is kept active.
    Wire.requestFrom(MPU_ADDR, 3*2, true); // request a total of 7*2=14 registers

    if(InitAcX == 0){
      InitAcX = Wire.read()<<8 | Wire.read();  // 0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)
      AcX = InitAcX;
    }else{
      AcX = Wire.read()<<8 | Wire.read();  // 0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)
    }

    //AcY = Wire.read()<<8 | Wire.read();  // 0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)
    //AcZ = Wire.read()<<8 | Wire.read();  // 0x3F (ACCEL_ZOUT_H) & 0x40 (ACCEL_ZOUT_L)
    //Serial.print(" | aY = "); Serial.print(AcY);
    //Serial.print(" | aZ = "); Serial.println(AcZ); 

    timerAcc = millis();
    int acc = InitAcX - AcX;
    //Serial.print("initACX = "); Serial.println(InitAcX);
    //Serial.print("aX = "); Serial.println(AcX);
    
    if(abs(acc) >= tolleranceAccelerometer){
    //  Serial.print("Acc "); Serial.println(acc);
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
