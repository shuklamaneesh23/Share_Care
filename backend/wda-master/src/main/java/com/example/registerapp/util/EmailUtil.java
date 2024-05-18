package com.example.registerapp.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailUtil {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendOtpEmail(String email, String otp) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);

        String htmlContent = "<div style='font-family: Arial, sans-serif;'>" +
                "<h2>ShareAndCare</h2>" +
                "<p>Dear User,</p>" +
                "<p>Your OTP for registering with ShareAndCare is:</p>" +
                "<p style='font-size: 20px; font-weight: bold;'>" + otp + "</p>" +
                "<p>Thank you for choosing ShareAndCare.</p>" +
                "</div>";

        mimeMessageHelper.setSubject("OTP for Registering - ShareAndCare");
        mimeMessageHelper.setText(htmlContent, true);

        javaMailSender.send(mimeMessage);
    }


    public void sendSetPasswordEmail(String email, String otp) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Set Password");
        mimeMessageHelper.setText("""
	        <div>
	          <p>Use the OTP below to set your password:</p>
	          <p><strong>%s</strong></p>

	        </div>
	        """.formatted(otp, email), true);

        javaMailSender.send(mimeMessage);
    }


    public void sendContactUsEmail(String email, String name) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setText(name);

        String htmlContent = "<div style='font-family: Arial, sans-serif; padding: 20px;'>" +
                "<div style='text-align: center;'>" +
                "<h2 style='color: #0044cc;'>ShareAndCare</h2>" +
                "</div>" +
                "<div style='margin-top: 20px;'>" +
                "<p style='font-size: 16px; color: #333;'>Dear " + name + ",</p>" +
                "<p style='font-size: 16px; color: #333;'>Thank you for contacting ShareAndCare. We will get back to you soon.</p>" +
                "<p style='font-size: 16px; color: #333;'>We appreciate your interest and are here to assist you with any questions or concerns you may have.</p>" +
                "</div>" +
                "<div style='margin-top: 30px; text-align: center;'>" +
                "<p style='font-size: 14px; color: #888;'>Thank you for choosing ShareAndCare.</p>" +
                "<p style='font-size: 14px; color: #888;'>Best regards,</p>" +
                "<p style='font-size: 14px; color: #888;'>The ShareAndCare Team</p>" +
                "</div>" +
                "<div style='text-align: center; margin-top: 20px;'>" +
                "<img src='https://example.com/logo.png' alt='ShareAndCare Logo' style='width: 100px; height: auto;' />" +
                "</div>" +
                "</div>";


        mimeMessageHelper.setSubject("Contacting with  - ShareAndCare");
        mimeMessageHelper.setText(htmlContent, true);

        javaMailSender.send(mimeMessage);
    }
}
