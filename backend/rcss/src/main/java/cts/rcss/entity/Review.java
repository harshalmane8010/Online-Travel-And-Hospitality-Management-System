package cts.rcss.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Review {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "reviewID", updatable = false, nullable = false)
	private int reviewID;

    private int userID;

    private int hotelID;

    private int rating;

    private String comment;

    private LocalDateTime timestamp;
}
