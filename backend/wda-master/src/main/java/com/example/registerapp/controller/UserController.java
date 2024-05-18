package com.example.registerapp.controller;

import com.example.registerapp.dto.LoginDto;
import com.example.registerapp.dto.RegisterDto;
import com.example.registerapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.bind.annotation.RequestHeader;


@RestController
public class UserController {

  @Autowired
  private UserService userService;



  @CrossOrigin(origins = "http://localhost:5173")
  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
    return new ResponseEntity<>(userService.register(registerDto), HttpStatus.OK);
  }

  @CrossOrigin(origins = "http://localhost:5173")
  @PutMapping("/verify-account")
  public ResponseEntity<String> verifyAccount(@RequestParam String email,
      @RequestParam String otp) {
    return new ResponseEntity<>(userService.verifyAccount(email, otp), HttpStatus.OK);
  }

  @PutMapping("/regenerate-otp")
  public ResponseEntity<String> regenerateOtp(@RequestParam String email) {
    return new ResponseEntity<>(userService.regenerateOtp(email), HttpStatus.OK);
  }

  @CrossOrigin(origins = "http://localhost:5173")
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
    return new ResponseEntity<>(userService.login(loginDto), HttpStatus.OK);
  }
  @CrossOrigin(origins = "http://localhost:5173")
  @PutMapping("/forgot-password")
  public ResponseEntity<String> forgotPassword(@RequestParam String email ) {
	  return new ResponseEntity<>(userService.forgotPassword(email),HttpStatus.OK);
	  
  }

  @CrossOrigin(origins = "http://localhost:5173")
  @PutMapping("/set-password")
  public ResponseEntity<String> setPassword(@RequestParam String email,@RequestParam String newPassword ) {
	  return new ResponseEntity<>(userService.setPassword(email,newPassword),HttpStatus.OK);
	  
  }

  @CrossOrigin(origins = "http://localhost:5173")
  @GetMapping("/Contact")
    public ResponseEntity<?> sendContactUs(@RequestParam String email,@RequestParam String name ) {
    return new ResponseEntity<>(userService.contactUs(email, name),HttpStatus.OK);
    }
}
