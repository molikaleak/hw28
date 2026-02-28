# Multi-stage Docker build
# Stage 1: Build the JAR
FROM eclipse-temurin:17-jdk-alpine AS builder

# Install necessary packages for Maven wrapper
RUN apk add --no-cache bash

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make mvnw executable and download Maven if needed
RUN chmod +x mvnw && \
    ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build the JAR file
RUN ./mvnw clean package -DskipTests

# Stage 2: Create runtime image
FROM eclipse-temurin:17-jre-alpine

# Set working directory
WORKDIR /app

# Copy the built JAR from builder stage
COPY --from=builder /app/target/demo.jar app.jar

# Expose the port that will be used (default 8080, but Render sets PORT=3000)
EXPOSE 3000

# Run the application with PORT environment variable support
ENTRYPOINT ["sh", "-c", "echo \"Using port: ${PORT:-8080}\" && java -Dserver.port=${PORT:-8080} -jar app.jar"]