# Build the Spring Boot application with Java 21.
FROM eclipse-temurin:21-jdk-jammy AS builder

WORKDIR /workspace
COPY . .

RUN chmod +x gradlew && ./gradlew clean bootJar --no-daemon

# Run the application with a smaller Java 21 runtime image.
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

RUN useradd --system --uid 10001 spring
COPY --from=builder /workspace/build/libs/*.jar app.jar
RUN chown spring:spring app.jar

USER spring

ENV JAVA_OPTS=""
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar /app/app.jar"]
