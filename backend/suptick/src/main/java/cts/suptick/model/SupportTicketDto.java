package cts.suptick.model;
 
import jakarta.validation.constraints.*;
 
import lombok.*;
 
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupportTicketDto {
 
   
    private int ticketID;

    private int userID;
 
    @NotBlank(message = "Issue cannot be blank")
    @Size(max = 255, message = "Issue should not exceed 255 characters")
    private String issue;
 
    @NotBlank(message = "Status cannot be blank")
    @Pattern(regexp = "Open|In Progress|Resolved|Closed", message = "Status must be one of: Open, In Progress, Resolved, Closed")
    private String status;
 
    @NotBlank(message = "Assigned agent cannot be blank")
    @Size(max = 100, message = "Assigned Agent name should not exceed 100 characters")
    private String assignedAgent;
}
 