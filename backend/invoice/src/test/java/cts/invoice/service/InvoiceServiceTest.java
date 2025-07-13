package cts.invoice.service;

import cts.invoice.entity.Invoice;
import cts.invoice.exception.ResourceNotFoundException;
import cts.invoice.model.InvoiceDto;
import cts.invoice.repository.InvoiceRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InvoiceServiceTest {

    @Mock
    private InvoiceRepository invoiceRepository;

    @InjectMocks
    private InvoiceServiceImp invoiceService;

    private InvoiceDto invoiceDto;
    private Invoice invoice;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        invoiceDto = InvoiceDto.builder()
                .bookingId(101L)
                .userId(202L)
                .totalAmount(1500.0)
                .timestamp(LocalDateTime.now())
                .build();

        invoice = Invoice.builder()
                .invoiceId(1L)
                .bookingId(invoiceDto.getBookingId())
                .userId(invoiceDto.getUserId())
                .totalAmount(invoiceDto.getTotalAmount())
                .timestamp(invoiceDto.getTimestamp())
                .build();
    }

    @Test
    void testCreateInvoice() {
        when(invoiceRepository.save(any(Invoice.class))).thenReturn(invoice);

        Invoice result = invoiceService.createInvoice(invoiceDto);

        assertNotNull(result);
        assertEquals(202L, result.getUserId());
        verify(invoiceRepository, times(1)).save(any(Invoice.class));
    }

    @Test
    void testGetInvoiceById_Found() {
        when(invoiceRepository.findById(1L)).thenReturn(Optional.of(invoice));

        Optional<Invoice> result = invoiceService.getInvoiceById(1L);

        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getInvoiceId());
    }

    @Test
    void testGetInvoiceById_NotFound() {
        when(invoiceRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Invoice> result = invoiceService.getInvoiceById(99L);

        assertFalse(result.isPresent());
    }

    @Test
    void testGetAllInvoices() {
        when(invoiceRepository.findAll()).thenReturn(List.of(invoice));

        List<Invoice> result = invoiceService.getAllInvoices();

        assertEquals(1, result.size());
        assertEquals(202L, result.get(0).getUserId());
    }

    @Test
    void testDeleteInvoice_Success() {
        when(invoiceRepository.findById(1L)).thenReturn(Optional.of(invoice));
        doNothing().when(invoiceRepository).deleteById(1L);

        assertDoesNotThrow(() -> invoiceService.deleteInvoice(1L));
        verify(invoiceRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteInvoice_NotFound() {
        when(invoiceRepository.findById(99L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            invoiceService.deleteInvoice(99L);
        });

        assertEquals("Invoice not found with ID: 99", exception.getMessage());
    }
}
