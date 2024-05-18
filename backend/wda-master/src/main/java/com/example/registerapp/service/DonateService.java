package com.example.registerapp.service;

import com.example.registerapp.entity.Donate;

import java.util.List;

public interface DonateService {
    Donate saveDonation(Donate donate);


    List<Donate> getAllDonations();
}
