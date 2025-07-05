package com.cts.urcs.exception;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.cts.urcs.model.ApiException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestControllerAdvice
public class ApplicationGlobalException {

    @ExceptionHandler(UserIdIsNotFoundException.class)
    public ApiException handleUserIdNotFound(UserIdIsNotFoundException e,
    		 								 HttpServletRequest request,
    		 								 HttpServletResponse response) {
        return ApiException.builder()
                .code(HttpServletResponse.SC_NOT_FOUND)
                .message(e.getMessage())
                .path(request.getRequestURI())
                .when(new Date())
                .build();
    }

    @ExceptionHandler(UserUpdateFailureException.class)
    public ApiException handleUserUpdateFailure(UserUpdateFailureException e,
                                                HttpServletRequest request,
                                                HttpServletResponse response) {
        return ApiException.builder()
                .code(HttpServletResponse.SC_INTERNAL_SERVER_ERROR)
                .message(e.getMessage())
                .path(request.getRequestURI())
                .when(new Date())
                .build();
    }
    
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, Object>> handleBadCredentialsException(BadCredentialsException ex) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.UNAUTHORIZED.value());
        errorResponse.put("error", "Unauthorized");
        errorResponse.put("message", "Invalid username or password");

        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiException handleValidationException(MethodArgumentNotValidException e,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) {
        String errorMessages = e.getFieldErrors().stream()
                .map(err -> err.getField() + " : " + err.getDefaultMessage())
                .collect(Collectors.joining(System.lineSeparator()));

        return ApiException.builder()
                .code(HttpServletResponse.SC_BAD_REQUEST)
                .message(errorMessages)
                .path(request.getRequestURI())
                .when(new Date())
                .build();
    }
}
