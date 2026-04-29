# ---- build stage ----
FROM maven:3.9.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# ---- runtime stage ----
FROM eclipse-temurin:17-jre
WORKDIR /app

# copy jar from builder
COPY --from=builder /app/target/your-app-*.jar app.jar

# Render provides PORT env
ENV PORT=8080

# expose (optional for clarity)
EXPOSE ${PORT}

# run app
CMD ["sh", "-c", "exec java -jar app.jar --server.port=${PORT}"]