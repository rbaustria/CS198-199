import React, { Component } from "react";
import AppleHealthKit from 'rn-apple-healthkit';

let options = {
      permissions: {
          read: ["Height", "Weight", "StepCount", "DateOfBirth", "BodyMassIndex"],
      }
  };

  AppleHealthKit.initHealthKit(options: Object, (err: string, results: Object) => {
      if (err) {
          console.log("error initializing Healthkit: ", err);
          return;
      }
      // Healthkit is initialized...
      // now safe to read and write Healthkit data...
  });
