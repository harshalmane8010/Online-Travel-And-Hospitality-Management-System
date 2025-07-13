package cts.suptick.service;
 
import cts.suptick.entity.SupportTicket;
import cts.suptick.exception.SupportTicketNotFoundException;
import cts.suptick.model.SupportTicketDto;
import cts.suptick.repository.SupportTicketRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import java.util.List;
import java.util.Optional;
import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
 
@ExtendWith(MockitoExtension.class)
public class SupportTicketServiceImplTest {
 
    @Mock
    private SupportTicketRepository repo;
 
    @InjectMocks
    private SupportTicketServiceImpl service;
 
    private ModelMapper mapper;
    private SupportTicket entity;
    private SupportTicketDto dto;
 
    @BeforeEach
    void setup() {
        mapper = new ModelMapper();
        ReflectionTestUtils.setField(service, "mapper", mapper);
        entity = new SupportTicket(1, 1001, "Test Issue", "Open", "Agent1");
        dto = mapper.map(entity, SupportTicketDto.class);
    }
 
    @Test
    void getAllSupportTickets() {
        when(repo.findAll()).thenReturn(List.of(entity));
        List<SupportTicketDto> tickets = service.getAllSupportTickets();
        assertEquals(1, tickets.size());
        verify(repo).findAll();
    }
 
    @Test
    void getAllSupportTickets_empty() {
        when(repo.findAll()).thenReturn(emptyList());
        assertTrue(service.getAllSupportTickets().isEmpty());
    }
 
    @Test
    void getSupportTicketById_found() {
        when(repo.findById(1)).thenReturn(Optional.of(entity));
        SupportTicketDto result = service.getSupportTicketById(1);
        assertEquals("Agent1", result.getAssignedAgent());
    }
 
    @Test
    void getSupportTicketById_notFound() {
        when(repo.findById(99)).thenReturn(Optional.empty());
        assertThrows(SupportTicketNotFoundException.class, () -> service.getSupportTicketById(99));
    }
 
    @Test
    void createSupportTicket() {
        when(repo.save(any())).thenReturn(entity);
        SupportTicketDto created = service.createSupportTicket(dto);
        assertEquals("Open", created.getStatus());
    }
 
    @Test
    void updateSupportTicket_found() {
        when(repo.findById(1)).thenReturn(Optional.of(entity));
        when(repo.save(any())).thenReturn(entity);
        dto.setIssue("Updated Issue");
        SupportTicketDto updated = service.updateSupportTicket(1, dto);
        assertEquals("Updated Issue", updated.getIssue());
    }
 
    @Test
    void updateSupportTicket_notFound() {
        when(repo.findById(99)).thenReturn(Optional.empty());
        assertThrows(SupportTicketNotFoundException.class, () -> service.updateSupportTicket(99, dto));
    }
 
    @Test
    void deleteSupportTicket_found() {
        when(repo.existsById(1)).thenReturn(true);
        doNothing().when(repo).deleteById(1);
        assertTrue(service.deleteSupportTicket(1));
    }
 
    @Test
    void deleteSupportTicket_notFound() {
        when(repo.existsById(99)).thenReturn(false);
        assertFalse(service.deleteSupportTicket(99));
    }
}
 