package com.example.registerapp.controller;

import com.example.registerapp.entity.Donate;
import com.example.registerapp.service.DonateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class DonateController {

    @Autowired
    private DonateService donateService;

    @PostMapping("/donate")
    public Donate saveDonation(@RequestBody Donate donate){
        return donateService.saveDonation(donate);
    }

    @GetMapping("/volunteer")
    public List<Donate> getAllDonations(){
        return donateService.getAllDonations();
    }
}
