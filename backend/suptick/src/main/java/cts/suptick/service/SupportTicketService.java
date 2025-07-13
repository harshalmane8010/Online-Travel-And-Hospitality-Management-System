package cts.suptick.service;


import cts.suptick.model.SupportTicketDto;

import java.util.List;

public interface SupportTicketService {
    List<SupportTicketDto> getAllSupportTickets();
    SupportTicketDto getSupportTicketById(int id);
    SupportTicketDto createSupportTicket(SupportTicketDto dto);
    SupportTicketDto updateSupportTicket(int id, SupportTicketDto dto);
    boolean deleteSupportTicket(int id);
}
