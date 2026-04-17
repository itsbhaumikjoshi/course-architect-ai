package com.course_architect_ai.server.errors;

import com.course_architect_ai.server.dtos.ErrorResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.boot.json.JsonParseException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> notFound(NotFoundException notFoundException) {
        return ResponseEntity.status(404).body(new ErrorResponse(
                notFoundException.getMessage(),
                "NOT_FOUND"
        ));
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorResponse> forbidden(ForbiddenException forbiddenException) {
        return ResponseEntity.status(403).body(new ErrorResponse(
                forbiddenException.getMessage(),
                "FORBIDDEN"
        ));
    }

    @ExceptionHandler(EnhanceException.class)
    public ResponseEntity<ErrorResponse> enhanceError(EnhanceException enhanceException) {
        return ResponseEntity.status(400).body(new ErrorResponse(
                enhanceException.getMessage(),
                "BAD_REQUEST"
        ));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraint(ConstraintViolationException constraintViolationException) {
        return ResponseEntity.status(400).body(new ErrorResponse(
                constraintViolationException.getMessage(),
                "BAD_REQUEST"
        ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleConstraint(MethodArgumentNotValidException methodArgumentNotValidException) {
        String msg = methodArgumentNotValidException.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .findFirst()
                .orElse("Validation failed");
        return ResponseEntity.status(400).body(new ErrorResponse(
                msg,
                "BAD_REQUEST"
        ));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> illegalArg(
            IllegalArgumentException ex
    ) {
        return ResponseEntity.status(400)
                .body(new ErrorResponse(ex.getMessage(), "BAD_REQUEST"));
    }

    @ExceptionHandler(org.springframework.security.access.AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> accessDenied() {
        return ResponseEntity.status(403)
                .body(new ErrorResponse("Access denied", "FORBIDDEN"));
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorResponse> noHandlerFound(NoHandlerFoundException noHandlerFoundException) {
        return ResponseEntity.status(405)
                .body(new ErrorResponse(noHandlerFoundException.getMessage(), "METHOD_NOT_SUPPORTED"));
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorResponse> missingParam(
            MissingServletRequestParameterException missingServletRequestParameterException
    ) {
        return ResponseEntity.status(400)
                .body(new ErrorResponse(
                        missingServletRequestParameterException.getParameterName() + " is required",
                        "BAD_REQUEST"
                ));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> typeMismatch(
            MethodArgumentTypeMismatchException methodArgumentTypeMismatchException
    ) {
        String msg = methodArgumentTypeMismatchException.getName() + " should be of type " +
                methodArgumentTypeMismatchException.getRequiredType().getSimpleName();

        return ResponseEntity.status(400)
                .body(new ErrorResponse(msg, "BAD_REQUEST"));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> jsonError(
            HttpMessageNotReadableException httpMessageNotReadableException
    ) {
        return ResponseEntity.status(400)
                .body(new ErrorResponse("Invalid request body", "BAD_REQUEST"));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> badCred(BadCredentialsException badCredentialsException) {
        return ResponseEntity.status(404).body(new ErrorResponse("Email or password mismatch", "NOT_FOUND"));
    }

    @ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity<ErrorResponse> internalAuthError(InternalAuthenticationServiceException internalAuthenticationServiceException) {
        return ResponseEntity.status(404).body(new ErrorResponse("Email or password mismatch", "NOT_FOUND"));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> dBError(DataIntegrityViolationException dataIntegrityViolationException) {
        return ResponseEntity.status(400)
                .body(new ErrorResponse(dataIntegrityViolationException.getMessage(), "BAD_REQUEST"));
    }

    @ExceptionHandler(JsonMappingException.class)
    public ResponseEntity<ErrorResponse> jsonMappingError(JsonMappingException jsonMappingException) {
        return ResponseEntity.status(500)
                .body(new ErrorResponse("Unable to parse json. Please try again", "INTERNAL_SERVER_ERROR"));
    }

    @ExceptionHandler(JsonProcessingException.class)
    public ResponseEntity<ErrorResponse> jsonProcessingError(JsonProcessingException jsonProcessingException) {
        return ResponseEntity.status(500)
                .body(new ErrorResponse("Unable to parse json. Please try again", "INTERNAL_SERVER_ERROR"));
    }

    @ExceptionHandler(JsonParseException.class)
    public ResponseEntity<ErrorResponse> jsonParseError(JsonParseException jsonParseException) {
        return ResponseEntity.status(500)
                .body(new ErrorResponse("Unable to parse json. Please try again", "INTERNAL_SERVER_ERROR"));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> methodNotSupported(HttpRequestMethodNotSupportedException httpRequestMethodNotSupportedException) {
        return ResponseEntity.status(405)
                .body(new ErrorResponse(httpRequestMethodNotSupportedException.getMessage(), "METHOD_NOT_SUPPORTED"));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> exception() {
        return ResponseEntity.status(500).body(new ErrorResponse(
                "Something went wrong",
                "INTERNAL_SERVER_ERROR"
        ));
    }

}
