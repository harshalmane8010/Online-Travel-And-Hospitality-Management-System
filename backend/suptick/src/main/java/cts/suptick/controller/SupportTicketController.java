package cts.suptick.controller;

import cts.suptick.model.SupportTicketDto;
import cts.suptick.service.SupportTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.validation.Valid;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api/support-tickets")
public class SupportTicketController {
	
   @Autowired
   private SupportTicketService supportTicketService;
   
   @GetMapping
   public List<SupportTicketDto> getAllSupportTickets() {
       return supportTicketService.getAllSupportTickets();
   }
   
   @GetMapping("/{id}")
   public ResponseEntity<SupportTicketDto> getTicketById(@PathVariable int id) {
       SupportTicketDto dto = supportTicketService.getSupportTicketById(id);
       return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
   }
   
   @PostMapping
   public SupportTicketDto create(@RequestBody SupportTicketDto dto) {
       return supportTicketService.createSupportTicket(dto);
   }
   
   @PutMapping("/{id}")
   public ResponseEntity<SupportTicketDto> update(@PathVariable int id, @RequestBody SupportTicketDto dto) {
       SupportTicketDto updated = supportTicketService.updateSupportTicket(id, dto);
       return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
   }
   
   @DeleteMapping("/{id}")
   public ResponseEntity<Void> delete(@PathVariable int id) {
       return supportTicketService.deleteSupportTicket(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
   }
}