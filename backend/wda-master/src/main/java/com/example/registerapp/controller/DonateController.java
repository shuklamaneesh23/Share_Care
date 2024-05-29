package com.example.registerapp.controller;

import com.example.registerapp.entity.Donate;
import com.example.registerapp.service.DonateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class DonateController {

    @Autowired
    private DonateService donateService;


    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/donate")
    public Donate saveDonation(@RequestBody Donate donate){
        return donateService.saveDonation(donate);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/volunteer")
    public List<Donate> getAllDonations(){
        return donateService.getAllDonations();
    }
}
