package cts.invoice.service;

import cts.invoice.model.InvoiceDto;
import cts.invoice.entity.Invoice;

import java.util.List;
import java.util.Optional;

public interface InvoiceService {

    Invoice createInvoice(InvoiceDto invoiceDto);
    Optional<Invoice> getInvoiceById(Long id);
    List<Invoice> getAllInvoices();
    void deleteInvoice(Long id);
}
