package com.cts.ops.exception;

public class OfferNotFoundException extends RuntimeException {
   public OfferNotFoundException(String message) {
       super(message);
   }
}