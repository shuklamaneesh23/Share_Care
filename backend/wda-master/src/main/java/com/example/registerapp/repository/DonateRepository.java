package com.example.registerapp.repository;

import com.example.registerapp.entity.Donate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonateRepository extends JpaRepository<Donate, Long> {

}
