---
sidebar_position: 4
---

# Aufgabe 1 - Bind Mounts

## uebung01: HTML-Datei in einen Nginx-Container mounten

### Ziel

Sie erstellen eine eigene HTML-Datei in einem Ordner auf ihrem Host-System und
mounten diesen in einen Nginx-Container, sodass die Datei über den Webserver
zugänglich ist. Wenn Sie die Datei ändern, soll auch der Webinhalt geändert
werden.

### Schritte

#### 1. Starten Sie einen nginx-Container und betrachten Sie die Standard-Seite:

```bash
docker run --rm -p 8080:80 nginx
```

- Öffnen Sie einen Webbrowser und gehen Sie zu
  [http://localhost:8080](http://localhost:8080). Sie sollten die
  Standard-Webseite von nginx sehen.
- Stoppen Sie den Container mit `CTRL + c`.

#### 2. Erstellen Sie einen Ordner auf Ihrem Host-System:

- Erstellen Sie einen neuen Ordner mit dem Namen HTML, in dem Sie die HTML-Datei
  speichern möchten.

#### 3. Erstellen Sie eine HTML-Datei:

- Erstellen Sie eine einfache HTML-Datei in dem neu erstellten Ordner mit dem
  Namen index.html. Zum Beispiel:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meine Nginx-Seite</title>
  </head>

  <body>
    <h1>Willkommen auf meiner Webseite!</h1>
  </body>
</html>
```

#### 4. Starten Sie den Nginx-Container mit einem Bind Mount:

- Starten Sie den Nginx-Container und mounten Sie den Ordner, der die HTML-Datei
  enthält, in den Container. Verwenden Sie den folgenden Befehl:

```bash
docker run --rm -p 8080:80 -v ./html:/usr/share/nginx/html nginx
```

:::info

- auf Windows müssen `./html` mit `.\html` ersetzen

:::

#### 5. Überprüfen Sie die Nginx-Seite:

- Öffnen Sie einen Webbrowser und gehen Sie zu http://localhost:8080. Sie
  sollten die Nachricht "Willkommen auf meiner Webseite!" sehen.

#### 6. Ändern Sie die HTML-Datei:

- Ändern Sie die HTML-Datei auf Ihrem Host-System, um den Inhalt zu
  aktualisieren. Zum Beispiel:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meine Nginx-Seite</title>
  </head>

  <body>
    <h1>Willkommen auf meiner Webseite!</h1>

    <p>Hier ist mein Text.</p>
  </body>
</html>
```

#### 7. Aktualisieren Sie die Nginx-Seite:

- Aktualisieren Sie die Seite im Webbrowser. Sie sollten zusätzlich "Hier ist
  mein Text" sehen.

## uebung02: Lokalen Ordner in einen Docker-Container mounten

### Ziel

Sie sollen einen lokalen Ordner in einen Docker-Container mounten und
demonstrieren, dass Dateien, die im lokalen Ordner erstellt oder geändert
werden, auch im Container sichtbar sind und umgekehrt.

### Schritte

#### 1. Erstellen Sie einen lokalen Ordner:

- Erstellen Sie einen neuen Ordner mit dem Namen `shared` auf Ihrem Host-System,
  der für das Mounten verwendet wird.

#### 2. Starten Sie einen Container mit dem gemounteten Ordner:

- Starten Sie einen Container (z.B. mit einem einfachen Ubuntu-Image) und
  mounten Sie den lokalen Ordner in den Container. Verwenden Sie den folgenden
  Befehl:

```bash
docker run -it --rm -v ./shared:/shared ubuntu bash
```

:::info

- Auf Windows müssen Sie `./shared` mit `.\shared` ersetzen.

:::

#### 3. Erstellen Sie eine Datei im Container:

- Sobald Sie im Container sind (Sie sollten sich in einer Shell des
  Ubuntu-Containers befinden), erstellen Sie eine Datei im gemounteten Ordner:

```bash
echo "Dies ist eine Datei aus dem Container." > /shared/container_file.txt
```

#### 4. Überprüfen Sie die Datei im lokalen Ordner:

- Öffnen Sie ein neues Terminalfenster (lassen Sie den Container laufen) und
  überprüfen Sie, ob die Datei im lokalen Ordner sichtbar ist:

```bash
cat ./shared/container_file.txt`
```

- Sie können dies auch über den Explorer überprüfen.

#### 5. Erstellen Sie eine Datei im lokalen Ordner:

- Erstellen Sie eine Datei im lokalen Ordner (shared) von **Ihrem Host-System**
  mit dem Namen **host_file.txt**.

#### 6. Überprüfen Sie die Datei im Container:

- Gehen Sie zurück zum **Terminal des Containers** und überprüfen Sie, ob die
  Datei im gemounteten Ordner sichtbar ist:

```bash
ls /shared
```

#### 7. Container stoppen und Dateien überprüfen:

- Beenden Sie den Container mit `exit`, dadurch wird er wegen `--rm` auch gleich
  entfernt.
- Überprüfen Sie, ob beide Dateien noch im Ordner shared vorhanden sind.

## uebung03: Lokalen Ordner zwischen zwei Docker-Containern teilen

### Ziel

Sie erstellen einen lokalen Ordner und teilen diesen Ordner zwischen zwei
Docker-Containern. Demonstrieren Sie, dass Dateien, die in einem Container
erstellt oder geändert werden, auch im anderen Container sichtbar sind.

### Schritte

#### 1. Erstellen Sie einen lokalen Ordner:

- Erstellen Sie einen neuen Ordner mit dem Namen `shared` auf Ihrem Host-System,
  der für das Mounten verwendet wird.

#### 2. Starten Sie den ersten Container mit dem gemounteten Ordner:

- Starten Sie den ersten Container (z. B. mit einem Ubuntu-Image) und mounten
  Sie den lokalen Ordner in den Container. Verwenden Sie den folgenden Befehl:

```bash
docker run -it --rm -v ./shared:/shared ubuntu bash
```

#### 3. Erstellen Sie eine Datei im ersten Container:

- Sobald Sie im ersten Container sind, erstellen Sie eine Datei im gemounteten
  Ordner:

```bash
echo "Dies ist eine Datei aus Container 1." > /shared/file_from_container1.txt
```

#### 4. Starten Sie den zweiten Container mit dem gleichen gemounteten Ordner:

- Öffnen Sie ein neues Terminalfenster (lassen Sie den ersten Container laufen)
  und starten Sie den zweiten Container, der ebenfalls den lokalen Ordner
  mountet:

```bash
docker run -it --rm -v ./shared:/shared ubuntu bash
```

#### 5. Überprüfen Sie die Datei im zweiten Container:

- Sobald Sie im zweiten Container sind, überprüfen Sie, ob die Datei, die im
  ersten Container erstellt wurde, sichtbar ist:

```bash
cat /shared/file_from_container1.txt
```

#### 6. Erstellen Sie eine Datei im zweiten Container:

- Erstellen Sie eine Datei im zweiten Container im gemounteten Ordner:
  `echo "Dies ist eine Datei aus Container 2." > /shared/file_from_container2.txt`

#### 7. Überprüfen Sie die Datei im ersten Container:

- Gehen Sie zurück zum Terminal des ersten Containers und überprüfen Sie, ob die
  Datei, die im zweiten Container erstellt wurde, sichtbar ist:

```bash
cat /shared/file_from_container2.txt
```

## uebung04: Automatisches Aktualisieren einer Webseite

<!-- mit Node.js und npm in einem Docker-Container (mit nodemon und live-server) -->

### Ziel

Sie sollen eine Node.js-Anwendung erstellen, die eine einfache Webseite
bereitstellt. Sie werden den lokalen Source-Code in einen Docker-Container
mounten und `nodemon` sowie live-server verwenden, um die Webseite automatisch
zu aktualisieren, wenn Änderungen am Code, einschließlich HTML-Dateien,
vorgenommen werden.

### Schritte

#### 1. Erstellen Sie einen lokalen Ordner für die Node.js-Anwendung:

- Erstellen Sie einen neuen Ordner mit dem Namen my_node_app auf Ihrem
  Host-System, der die Node.js-Anwendung enthalten wird.

#### 2. Initialisieren Sie ein neues Node.js-Projekt:

- Führen Sie den folgenden Befehl im eben erstellten Ordner aus, um ein neues
  Node.js-Projekt zu initialisieren:

```bash
npm init -y
```

#### 3. Installieren Sie die erforderlichen Pakete:

- Installieren Sie express, `nodemon` und `live-server`:

```bash
npm install express
npm install --save-dev nodemon live-server
```

#### 4. Erstellen Sie die Server-Datei:

- Erstellen Sie eine Datei namens `server.js` mit folgendem Inhalt:

```javascript
const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

// Statische Dateien bereitstellen
app.use(express.static(path.join(\_\_dirname, 'public')));

// Routen definieren
app.get('/', (req, res) => {
  res.sendFile(path.join(\_\_dirname, 'public', 'index.html'));
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
```

#### 5. Erstellen Sie den Ordner für statische Dateien:

Erstellen Sie in my_node_app einen Ordner namens public und in diesem Ordner
eine HTML-Datei namens index.html mit folgendem Inhalt:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meine Node.js App</title>
  </head>

  <body>
    <h1>Willkommen zu meiner Node.js App!!</h1>
  </body>
</html>
```

#### 6. Aktualisieren Sie das `package.json`:

- Fügen Sie ein Skript für `nodemon` und `live-server` in die Datei
  `package.json` ein und konfigurieren Sie `nodemon`, um HTML-Dateien zu
  überwachen:

```json title="package.json > scripts part"
"scripts": {
  "start": "nodemon server.js",
    "live": "live-server public --port=3001 --no-browser"
  }
```

#### 7. Erstellen Sie ein Dockerfile:

- Erstellen Sie eine Datei namens `Dockerfile` im Verzeichnis `my_node_app` mit
  folgendem Inhalt:

```Dockerfile
# Verwenden Sie das offizielle Node.js-Image
FROM node:18

# Setzen Sie das Arbeitsverzeichnis
WORKDIR /usr/src/app

# Kopieren Sie die package.json und package-lock.json
COPY package\*.json ./

# Installieren Sie die Abhängigkeiten
RUN npm install

# Kopieren Sie den Rest des Codes
COPY . .

# Exponieren Sie die Ports
EXPOSE 3000
EXPOSE 3001

# Starten Sie die Anwendung
CMD ["npm", "start"]
```

#### 8. Bauen Sie das Docker-Image:

- Führen Sie den folgenden Befehl aus, um das Docker-Image zu erstellen:

```bash
docker buildx build -t my_node_app .
```

#### 9. Starten Sie den Docker-Container mit dem gemounteten Source-Code:

- Starten Sie den Container und mounten Sie den lokalen Ordner in den Container.
  Verwenden Sie den folgenden Befehl:

```bash
docker run -it --name my_node_app_container -p 3000:3000 -p 3001:3001 -v /tmp/my_node_app:/usr/src/app my_node_app
```

#### 10. Überprüfen Sie die Anwendung im Browser:

- Öffnen Sie einen Webbrowser und gehen Sie zu
  [http://localhost:3000](http://localhost:3000). Sie sollten die Nachricht
  **"Willkommen zu meiner Node.js App!"** sehen.

#### 11. Starten Sie live-server:

- Öffnen Sie ein neues Terminalfenster (oder eine neue Terminal-Session) und
  navigieren Sie zu Ihrem Projektverzeichnis:

```bash
cd my_node_app
```

- Führen Sie den folgenden Befehl aus, um `live-server` zu starten:

```bash
npm run live
```

- live-server wird nun auf **Port 3001** laufen und die Dateien im Ordner
  `public` überwachen.

#### 12. Überprüfen Sie die Anwendung im Browser:

- Öffnen Sie einen Webbrowser und gehen Sie zu http://localhost:3001. Sie
  sollten die Nachricht **"Willkommen zu meiner Node.js App!"** sehen.

#### 13. Ändern Sie die HTML-Datei und beobachten Sie die Aktualisierung:

- Öffnen Sie die Datei `public/index.html` in einem Texteditor und ändern Sie
  den Inhalt, z.B.:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meine Node.js App</title>
  </head>

  <body>
    <h1>Willkommen zu meiner aktualisierten Node.js App!</h1>
  </body>
</html>
```

- Speichern Sie die Datei. Der `live-server` sollte automatisch erkennen, dass
  die Datei geändert wurde, und die Seite im Browser neu laden.

#### 14. Beenden Sie den Docker-Container:

- Um den Container zu stoppen, drücken Sie `Ctrl + C` im Terminal, in dem der
  Container läuft. Alternativ können Sie den Container auch mit folgendem Befehl
  stoppen:

```bash
docker stop my_node_app_container
```

#### 15. Optional: Container und Image aufräumen:

- Wenn Sie mit der Übung fertig sind und die Ressourcen freigeben möchten,
  können Sie den Container und das Image entfernen:

```bash
docker rm my_node_app_container
docker rmi my_node_app
```

## Fazit

In dieser Übung haben Sie gelernt, wie Sie eine einfache Node.js-Anwendung mit
Express erstellen und `nodemon` sowie `live-server` verwenden, um Änderungen an
HTML-Dateien automatisch zu überwachen und die Seite im Browser neu zu laden.
Durch das Mounten des lokalen Quellcodes in den Docker-Container konnten Sie
Änderungen in Echtzeit sehen, ohne den Container neu starten zu müssen. Dies ist
eine effektive Methode, um die Entwicklung von Webanwendungen in einer
containerisierten Umgebung zu optimieren.
