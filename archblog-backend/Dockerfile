# ---------- Stage 1: Build the JAR ----------
FROM maven:3.9.4-eclipse-temurin-17 AS build

# Set working directory in build container
WORKDIR /app

# Copy everything to the container
COPY . .

# Build the application (skip tests for faster build)
RUN mvn clean package -DskipTests


# ---------- Stage 2: Run the JAR ----------
FROM openjdk:17-jdk-slim

# Set working directory in runtime container
WORKDIR /app

# Copy the JAR file from the previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]