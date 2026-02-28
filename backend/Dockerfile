# Use Eclipse Temurin JRE 17 Alpine as base image (small, reliable, and widely available)
FROM eclipse-temurin:17-jre-alpine

# Set working directory
WORKDIR /app

# Copy the built JAR file
COPY target/demo.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]