package cts.suptick.service;

import cts.suptick.model.SupportTicketDto;
import cts.suptick.entity.SupportTicket;
import cts.suptick.exception.SupportTicketNotFoundException;
import cts.suptick.repository.SupportTicketRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupportTicketServiceImpl implements SupportTicketService {
	
   @Autowired
   private SupportTicketRepository repo;
   
   @Autowired
   private ModelMapper mapper;
   
   @Override
   public List<SupportTicketDto> getAllSupportTickets() {
       return repo.findAll().stream()
               .map(t -> mapper.map(t, SupportTicketDto.class))
               .collect(Collectors.toList());
   }
   @Override
   public SupportTicketDto getSupportTicketById(int id) {
       return repo.findById(id).map(t -> mapper.map(t, SupportTicketDto.class)).orElseThrow(() -> new SupportTicketNotFoundException("Support ticket with ID " + id + "not found."));
   }
   
   @Override
   public SupportTicketDto createSupportTicket(SupportTicketDto dto) {
       SupportTicket entity = mapper.map(dto, SupportTicket.class);
       return mapper.map(repo.save(entity), SupportTicketDto.class);
   }
   
   @Override
   public SupportTicketDto updateSupportTicket(int id, SupportTicketDto dto) {
       return repo.findById(id).map(t -> {
           t.setUserID(dto.getUserID());
           t.setIssue(dto.getIssue());
           t.setStatus(dto.getStatus());
           t.setAssignedAgent(dto.getAssignedAgent());
           return mapper.map(repo.save(t), SupportTicketDto.class);
       }).orElseThrow(() -> new SupportTicketNotFoundException("Support ticket with ID" + id + "not found."));
   }
   
   @Override
   public boolean deleteSupportTicket(int id) {
       if (!repo.existsById(id)) return false;
       repo.deleteById(id);
       return true;
   }
}