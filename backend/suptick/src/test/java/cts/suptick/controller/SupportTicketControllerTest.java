package cts.suptick.controller;
 
import cts.suptick.exception.SupportTicketNotFoundException;
import cts.suptick.model.SupportTicketDto;
import cts.suptick.service.SupportTicketService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.List;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
 
@WebMvcTest(SupportTicketController.class)
public class SupportTicketControllerTest {
 
    @Autowired
    private MockMvc mockMvc;
 
    @MockBean
    private SupportTicketService supportTicketService;
 
    @Autowired
    private ObjectMapper objectMapper;
 
    private SupportTicketDto dto;
 
    @BeforeEach
    void setup() {
        dto = new SupportTicketDto(1, 1001, "Sample Issue", "Open", "AgentX");
    }
 
    @Test
    void getAllSupportTickets() throws Exception {
        Mockito.when(supportTicketService.getAllSupportTickets()).thenReturn(List.of(dto));
        mockMvc.perform(get("/api/support-tickets"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].ticketID").value(1));
    }
 
    @Test
    void getTicketById_found() throws Exception {
        Mockito.when(supportTicketService.getSupportTicketById(1)).thenReturn(dto);
        mockMvc.perform(get("/api/support-tickets/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ticketID").value(1));
    }
 
    @Test
    void getTicketById_notFound() throws Exception {
        Mockito.when(supportTicketService.getSupportTicketById(99))
                .thenThrow(new SupportTicketNotFoundException("Ticket not found"));
        mockMvc.perform(get("/api/support-tickets/99"))
                .andExpect(status().isNotFound());
    }
 
    @Test
    void createSupportTicket() throws Exception {
        Mockito.when(supportTicketService.createSupportTicket(any())).thenReturn(dto);
        mockMvc.perform(post("/api/support-tickets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ticketID").value(1));
    }
 
    @Test
    void updateSupportTicket_found() throws Exception {
        Mockito.when(supportTicketService.updateSupportTicket(eq(1), any())).thenReturn(dto);
        mockMvc.perform(put("/api/support-tickets/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ticketID").value(1));
    }
 
    @Test
    void updateSupportTicket_notFound() throws Exception {
        Mockito.when(supportTicketService.updateSupportTicket(eq(1), any()))
                .thenThrow(new SupportTicketNotFoundException("Not found"));
        mockMvc.perform(put("/api/support-tickets/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isNotFound());
    }
 
    @Test
    void deleteSupportTicket_found() throws Exception {
        Mockito.when(supportTicketService.deleteSupportTicket(1)).thenReturn(true);
        mockMvc.perform(delete("/api/support-tickets/1"))
                .andExpect(status().isOk());
    }
 
    @Test
    void deleteSupportTicket_notFound() throws Exception {
        Mockito.when(supportTicketService.deleteSupportTicket(99)).thenReturn(false);
        mockMvc.perform(delete("/api/support-tickets/99"))
                .andExpect(status().isNotFound());
    }
}