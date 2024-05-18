package com.example.registerapp.service;

import com.example.registerapp.entity.Donate;
import com.example.registerapp.repository.DonateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonateServiceImpl implements DonateService{

    @Autowired
    private DonateRepository donateRepository;
    @Override
    public Donate saveDonation(Donate donate) {
        return donateRepository.save(donate);
    }

    @Override
    public List<Donate> getAllDonations() {
        return donateRepository.findAll();
    }


}
