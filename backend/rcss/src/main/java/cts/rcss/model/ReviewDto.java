package cts.rcss.model;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {

    private int reviewID; // No @NotNull — it's auto-generated

    @NotNull
    private int userID;

    @NotNull
    private int hotelID;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private int rating;

    @NotBlank(message = "Comment cannot be blank")
    @Size(max = 500, message = "Comment must be less than 500 characters")
    private String comment;

    private LocalDateTime timestamp; // No validation — backend sets it
}
