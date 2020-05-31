#ifndef MPU6050_h
#define MPU6050_h

	#include "Arduino.h"
	#include <SPI.h>
	#include <Wire.h>
	
	void StartSetup();
	boolean ReadValueFromAccelerometer();
	void readFormBluetooth();
	void loopCustom();
	int  RollDice(int quantity,int value);
	void StartSleep();
	void Pin2Interrupt();
	void resetTimer();
	void updateTimer();
	void canGoToSleep();
	void GetRandomNumber();
	void setupAcceleromter();
#endif
