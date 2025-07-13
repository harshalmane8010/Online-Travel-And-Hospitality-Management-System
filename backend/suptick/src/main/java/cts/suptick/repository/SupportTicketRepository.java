package cts.suptick.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cts.suptick.entity.SupportTicket;

public interface SupportTicketRepository extends JpaRepository<SupportTicket, Integer>{

}
