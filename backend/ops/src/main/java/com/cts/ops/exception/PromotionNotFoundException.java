package com.cts.ops.exception;

public class PromotionNotFoundException extends RuntimeException {
   public PromotionNotFoundException(String message) {
       super(message);
   }
}