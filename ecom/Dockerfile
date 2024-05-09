# Używamy oficjalnego obrazu OpenJDK
FROM openjdk:17-jdk-slim

# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy plik JAR z katalogu Maven do kontenera
COPY target/ecom-0.0.1-SNAPSHOT.jar /app/ecom-0.0.1-SNAPSHOT.jar

# Ustawiamy punkt wejścia, aby uruchomić aplikację
ENTRYPOINT ["java", "-jar", "ecom-0.0.1-SNAPSHOT.jar"]