package com.cts.ops.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

	
   @ExceptionHandler(ResourceNotFoundException.class)
   public ResponseEntity<Map<String, Object>> handleResourceNotFound(ResourceNotFoundException ex) {
       Map<String, Object> body = new HashMap<>();
       body.put("timestamp", LocalDateTime.now());
       body.put("status", HttpStatus.NOT_FOUND.value());
       body.put("error", "Not Found");
       body.put("message", ex.getMessage());
       return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
   }

   
   @ExceptionHandler(MethodArgumentNotValidException.class)
   public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {
       Map<String, Object> body = new HashMap<>();
       body.put("timestamp", LocalDateTime.now());
       body.put("status", HttpStatus.BAD_REQUEST.value());
       body.put("error", "Validation Failed");
       Map<String, String> fieldErrors = new HashMap<>();
       ex.getBindingResult().getFieldErrors().forEach(err -> fieldErrors.put(err.getField(), err.getDefaultMessage()));
       body.put("fieldErrors", fieldErrors);
       return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
   }

   @ExceptionHandler(OfferNotFoundException.class)
   public ResponseEntity<Map<String, Object>> handleOfferNotFound(OfferNotFoundException ex) {

       Map<String, Object> body = new HashMap<>();
       body.put("timestamp", LocalDateTime.now());
       body.put("status", HttpStatus.NOT_FOUND.value());
       body.put("error", "Offer Not Found");
       body.put("message", ex.getMessage());
       return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
   }

   @ExceptionHandler(PromotionNotFoundException.class)
   public ResponseEntity<Map<String, Object>> handlePromotionNotFound(PromotionNotFoundException ex) {
       Map<String, Object> body = new HashMap<>();
       body.put("timestamp", LocalDateTime.now());
       body.put("status", HttpStatus.NOT_FOUND.value());
       body.put("error", "Promotion Not Found");
       body.put("message", ex.getMessage());
       return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
   }
       
   @ExceptionHandler(Exception.class)
   public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
       Map<String, Object> body = new HashMap<>();
       body.put("timestamp", LocalDateTime.now());
       body.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
       body.put("error", "Internal Server Error");
       body.put("message", ex.getMessage());
       return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
   }
}