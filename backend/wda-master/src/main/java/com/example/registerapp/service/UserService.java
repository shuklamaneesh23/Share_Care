package com.example.registerapp.service;

import com.example.registerapp.dto.LoginDto;
import com.example.registerapp.dto.RegisterDto;
import com.example.registerapp.entity.User;
import com.example.registerapp.repository.UserRepository;
import com.example.registerapp.util.EmailUtil;
import com.example.registerapp.util.OtpUtil;
import jakarta.mail.MessagingException;
import java.time.Duration;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private OtpUtil otpUtil;
  @Autowired
  private EmailUtil emailUtil;
  @Autowired
  private UserRepository userRepository;

  public String register(RegisterDto registerDto) {
    String otp = otpUtil.generateOtp();
    try {
      emailUtil.sendOtpEmail(registerDto.getEmail(), otp);
    } catch (MessagingException e) {
      throw new RuntimeException("Unable to send otp please try again");
    }
    User user = new User();
    user.setName(registerDto.getName());
    user.setEmail(registerDto.getEmail());
    user.setPassword(registerDto.getPassword());
    user.setGender(registerDto.getGender());
    user.setDob(registerDto.getDob());
    user.setPhoneno(registerDto.getPhoneno());
    user.setNationality(registerDto.getNationality());
    user.setAddress(registerDto.getAddress());
    
    user.setOtp(otp);
    user.setOtpGeneratedTime(LocalDateTime.now());
    userRepository.save(user);
    return "User registration successful";
  }

  public String verifyAccount(String email, String otp) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));
    if (user.getOtp().equals(otp) && Duration.between(user.getOtpGeneratedTime(),
        LocalDateTime.now()).getSeconds() < (1 * 60)) {
      user.setActive(true);
      userRepository.save(user);
      return "OTP verified you can login";
    }
    return "Please regenerate otp and try again";
  }

  public String regenerateOtp(String email) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));
    String otp = otpUtil.generateOtp();
    try {
      emailUtil.sendOtpEmail(email, otp);
    } catch (MessagingException e) {
      throw new RuntimeException("Unable to send otp please try again");
    }
    user.setOtp(otp);
    user.setOtpGeneratedTime(LocalDateTime.now());
    userRepository.save(user);
    return "Email sent... please verify account within 1 minute";
  }

  public Object login(LoginDto loginDto) {
    User user = userRepository.findByEmail(loginDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found with this email: " + loginDto.getEmail()));

    if (!loginDto.getPassword().equals(user.getPassword())) {
      return "Password is incorrect";
    } else if (!user.isActive()) {
      return "Your account is not verified";
    }

    return user;
  }



  public String forgotPassword(String email ) {
    User user = userRepository.findByEmail(email)
            .orElseThrow(
                    () -> new RuntimeException("User not found with this email: " + email));
    String otp = otpUtil.generateOtp(); // Generate OTP here
    try {
      emailUtil.sendSetPasswordEmail(email, otp);
    }
    catch (MessagingException e) {
      throw new RuntimeException("Unable to send set password email please try again");
    }
    return "Please check your email to set new Password to your account";
  }
  
//  
//  public String setPassword(String email,String newPassword ) {
//	  User user = userRepository.findByEmail(email)
//		        .orElseThrow(
//		            () -> new RuntimeException("User not found with this email: " + email));
//	  user.setPassword(newPassword);
//	  userRepository.save(user);
//	  return "New Password set successfully login with new password";
//  }

public String setPassword(String email, String newPassword) {
	// TODO Auto-generated method stub
	User user = userRepository.findByEmail(email)
	        .orElseThrow(
	            () -> new RuntimeException("User not found with this email: " + email));
  user.setPassword(newPassword);
  userRepository.save(user);
  return "New Password set successfully login with new password";
}

  public String contactUs(String email,String name) {
    try {
      emailUtil.sendContactUsEmail(email, name);
    } catch (MessagingException e) {
      throw new RuntimeException("Unable to contact you  please try again");
    }
    return "You have contacted with Share&Care";
  }


}

