package cts.suptick.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
//import lombok.EqualsAndHashCode;
//import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class SupportTicket {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
    private int ticketID;

	private int userID;
    private String issue;
    private String status;
    private String assignedAgent;	
}
