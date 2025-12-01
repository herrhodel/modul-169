---
sidebar_position: 6
---

# Aufgabe 3 - Docker Networks

## uebung06: Docker Networking und DNS

### Ziel

Sie lernen, wie Docker-Netzwerke funktionieren, wie Container über ihre Namen,
IDs und IP-Adressen kommunizieren können und wie die Netzwerkkonfiguration den
Zugriff zwischen Containern beeinflusst.

### Schritte

#### 1. Erstelle die Docker-Images:

- Erstelle eine Datei namens Dockerfile mit folgendem Inhalt:

```Dockerfile title="Dockerfile"
FROM ubuntu:latest

RUN apt-get update && apt-get install -y iputils-ping \
  && rm -rf /var/lib/apt/lists/\*

CMD ["bash"]
```

:::note

- `iputils-ping` ermöglicht es, im Container einen anderen Container
  "anzupingen".

:::

#### 2. Bau das Docker-Image

- Erstellen Sie aus dem Dockerfile ein Docker-Image:

```bash
docker buildx build -t my-ubuntu-image .
```

#### 3. Erstelle Netzwerke

- Erstellen Sie folgende zwei Docker-Netzwerke:

```bash
docker network create mynetwork
docker network create othernetwork
```

#### 4. Starte die Container

- Starten Sie zwei Container im `mynetwork` und einen im `othernetwork`:

```bash title="bash auf dem Host"
docker run -itd --name container1 --network mynetwork my-ubuntu-image
docker run -itd --name container2 --network mynetwork my-ubuntu-image
docker run -itd --name container3 --network othernetwork my-ubuntu-image
```

:::note

- Mit dem Parameter `-itd` starten Sie den Container interaktiv _(it)_ im
  Hintergrund _(d)_, das heisst, der Container läuft weiter _(mit bash)_, auch
  wenn Sie nicht im Container sind.

:::

#### 5. Zugriff auf die Container

- Um innerhalb vom container1 Befehle ausführen zu können, öffnen Sie eine Shell
  im container1:

```bash title="bash auf dem Host"
docker exec -it container1 /bin/bash
```

#### 6. Pingen von container2

- In der Shell von container1, führe den folgenden Befehl aus:

```bash title="bash in container1"
ping container2
```

#### 7. Ermitteln der IP-Adresse und Container-ID von container2

- Öffnen Sie ein neues Host-Terminal (nicht in einem Container) und finden Sie
  die IP-Adresse mit folgendem dem Befehl:

```bash title="bash auf dem Host"
docker inspect container2
```

- Sie finden den Eintrag weit unten unter "Networks/mynetwork/IPAdress" (z.B.
  172.17.0.2).
- Mit `docker ps` sollten Sie die Container-ID ermitteln können (z.B.
  ef20d820ae81).

#### 8. Pingen von container2 über die Container-ID und IP-Adresse

Gehen Sie zurück zu der Shell von container1 und führen Sie die folgenden
Befehle aus:

```bash title="bash in container1"
ping <CONTAINER_ID> # via Container-ID
ping <CONTAINER_IP> # via Container-IP
```

#### 8. Pingen von container3

- Versuchen Sie, container3 vom container1 Terminal aus anzupingen:

```bash title="bash in container1"
ping container3
```

- **Erwartetes Ergebnis**: Der Ping sollte fehlschlagen, da container3 **in
  einem anderen Netzwerk** ist.

#### 9. Beobachtungen und Diskussion

- Diskutieren Sie mit der Nachbarin, warum der Ping zu container3 nicht
  funktioniert hat.
- Besprechen Sie die Bedeutung von Netzwerken in Docker und wie sie die
  Kommunikation zwischen Containern beeinflussen.

#### 10. Container stoppen und entfernen:

- Nachdem die Übung abgeschlossen ist, können Sie die Container stoppen und
  entfernen:

```bash
docker stop container1 container2 container3
docker rm container1 container2 container3
docker network rm mynetwork othernetwork
```

## uebung07: MariaDB und phpMyAdmin im Docker-Netzwerk

### Ziel

Sie sollen lernen, wie man einen MariaDB-Container und einen
phpMyAdmin-Container erstellt und konfiguriert, um über eine Weboberfläche auf
die Datenbank zuzugreifen.

### Schritte

#### 1. Erstellen Sie ein Netzwerk:

- Zuerst erstellen Sie ein Docker-Netzwerk mit dem Namen `db-net`, in dem die
  Container kommunizieren können:

```bash
docker network create db-net
```

#### 2. Starten Sie den MariaDB-Container

- Führen Sie den folgenden Befehl aus, um den MariaDB-Container zu starten:

```bash
docker run -d \
  --name mariadb \
  --network db-net \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=mydatabase \
  mariadb:latest
```

- **MYSQL_ROOT_PASSWORD**: Setzt das Passwort für den Root-Benutzer.
- **MYSQL_DATABASE**: Erstellt eine Datenbank mit dem Namen mydatabase.

#### 3. Starten Sie den phpMyAdmin-Container

- Führen Sie den folgenden Befehl aus, um den phpMyAdmin-Container zu starten:

```bash
docker run -d \
  --name phpmyadmin \
  --network db-net \
  -e PMA_HOST=mariadb \
  -e PMA_USER=root \
  -e PMA_PASSWORD=rootpassword \
  -p 8080:80 \
  phpmyadmin/phpmyadmin
```

- **PMA_HOST**: Gibt den Hostnamen des MariaDB-Containers an.
- **PMA_USER**: Setzt den Benutzer für den Zugriff auf die Datenbank.
- **PMA_PASSWORD**: Setzt das Passwort für den Benutzer.

#### 4. Zugriff auf phpMyAdmin

- Öffnen Sie einen Webbrowser und gehen Sie zu http://localhost:8080. Sie
  sollten die phpMyAdmin-Anmeldeseite sehen.

#### 5. Anmelden bei phpMyAdmin

- Melden Sie sich, falls nötig, mit den folgenden Anmeldedaten an:
  - **Benutzername**: root
  - **Passwort**: rootpassword

#### 6. Datenbank bearbeiten

- Nach der Anmeldung sollten Sie die Datenbank `mydatabase` sehen.
- Sie können Tabellen erstellen, Daten hinzufügen, bearbeiten und löschen.

#### 7. Beobachtungen und Diskussion

- Diskutieren Sie, wie die Container miteinander kommunizieren und welche Rolle
  das Docker-Netzwerk dabei spielt.
- Erklären Sie die Bedeutung von Umgebungsvariablen beim Starten der Container.

#### 8. Container stoppen und entfernen

- Nachdem die Übung abgeschlossen ist, können Sie die Container stoppen und
  entfernen:

```bash
docker stop mariadb phpmyadmin
docker rm mariadb phpmyadmin
docker network rm db-net
```

## Fazit

Diese Übung hilft Ihnen, ein praktisches Verständnis für die Verwendung von
MariaDB und phpMyAdmin in Docker zu entwickeln. Sie lernen, wie man Container
erstellt, konfiguriert und miteinander kommunizieren lässt, um eine Datenbank
über eine Weboberfläche zu verwalten.
