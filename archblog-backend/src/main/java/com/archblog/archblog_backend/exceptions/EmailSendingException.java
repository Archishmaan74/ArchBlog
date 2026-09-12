package com.archblog.archblog_backend.exceptions;

public class EmailSendingException extends RuntimeException {

    public EmailSendingException(String message) {
        super(message);
    }
}