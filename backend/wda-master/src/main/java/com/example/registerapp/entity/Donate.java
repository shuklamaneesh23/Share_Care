package com.example.registerapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter

public class Donate {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long donationId;
    private String name;
    private String email;
    private String phoneno;
    private String sourceType;
    private String address;
    private String date;
    private String foodTime;
    private String foodType;
    private Long quantity;
    private String time;
}
