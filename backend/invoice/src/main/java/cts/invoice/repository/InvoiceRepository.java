package cts.invoice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cts.invoice.entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}
