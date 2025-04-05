# Build stage
FROM maven:3.9.4-eclipse-temurin-21 as build
WORKDIR /app
COPY eventzen-api/pom.xml .
RUN mvn dependency:go-offline
COPY eventzen-api/src ./src
RUN mvn package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
