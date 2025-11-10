---
sidebar_position: 4
---
# Aufgaben 2 - Multistage Dockerfile

:::caution TODO

- Lösungen: https://classroom.github.com/a/dKJpFsTt

:::

# Übung 1 _(11)_

In dieser Übung ist das Ziel, ein Multistage Build zu kreieren. Es soll zeigen,
wie das grundsätzlich funktioniert und was der Vorteil davon ist.

- Im Stage 1 werden Dateien mithilfe eines Pythonskripts erzeugt, welche im
  Stage 2 verwendet werden. Das Pythonskript wird im finalen Docker Image nicht
  mehr verwendet, sondern dient nur der Erstellung der Dateien.
- Kreieren Sie eine Datei mit dem Namen `generate_files.py` und kopieren Sie den
  untenstehenden Inhalt hinein. Achten Sie auf die Einrückungen.

```python title="generate_files.py"
with open("file1.txt", "w") as f:
    f.write("This is file 1\n")
with open("file2.txt", "w") as f:
    f.write("This is file 2\n")
with open("file3.txt", "w") as f:
    f.write("This is file 3\n")
```

Nun erstellen wir das _Dockerfile_ mit mehreren Stages.

```Dockerfile title="Dockerfile"
# Stage 1: Build stage
FROM python:3.9-slim AS builder
WORKDIR /app
COPY generate_files.py .
RUN python generate_files.py

# Stage 2: Runtime stage
FROM python:3.9-slim
WORKDIR /app
COPY --from=builder /app/\*.txt .
CMD ["cat", "file1.txt", "file2.txt", "file3.txt"]
```

- Erklären Sie, was die einzelnen Schritte machen.
- Bilden Sie das Image mit dem Tag `-t uebung11`
- Erstellen Sie einen Container mit dem Befehl `docker run --rm uebung11`
- Führen Sie den Container interaktiv aus und überprüfen Sie mit dem Befehl `ls`
  im Ordner `/app`, ob wirklich nur die Textdateien vorhanden sind.

## Übung 2 _(12)_

Nun erstellen wir einen Webserver mithilfe von _NodeJs_ und _ExpressJs_. Dies
soll der Nutzen von multistage Builds ein wenig deutlicher zeigen.

Wir kreieren zuerst ein _Dockerfile_ ohne Multistage Build, danach mit
Multistage Build, um den Unterschied untersuchen zu können.

- Erstellen Sie eine Datei mit dem Namen `package.json` und kopieren Sie den
  untenstehenden Inhalt hinein. In dieser Datei werden die Abhängigkeiten und
  weiteres gespeichert.

```json title="package.json"
{
  "name": "multistage-node-example",
  "version": "1.0.0",
  "description": "A simple Node.js web server using Express.js",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

- Kreieren Sie die Datei für den Server mit dem Namen `server.js` und kopieren
  Sie folgenden Code hinein:

```javascript title="server.js"
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(
    "Hello, World! This is a simple Node.js web server using Express.js.",
  );
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

- Nun erstellen wir das _Dockerfile_, in diesem Fall noch nicht als Multistage
  Build.

```Dockerfile
FROM node:14
WORKDIR /app
# Copy package.json and package-lock.json
COPY package.json ./
# Copy the rest of the application code
COPY server.js .
# Install dependencies
RUN npm install
# Expose the port the app runs on
EXPOSE 3000
CMD ["npm", "start"] # Command to run the application
```

- Bilden Sie das Image mit dem Tag `-t uebung12`
- Erstellen Sie einen Container mit dem Befehl
  `docker run --rm -p 3000:3000 uebung12` und testen Sie den Webserver, indem
  Sie auf http://localhost:3000 gehen.
- Nun optimieren wir das Image, indem wir ein Multistage Build kreieren. Das
  heisst, wir verlagern die Installation der Abhängigkeiten in einen separaten
  Build Stage.
  - Kreieren Sie eine Datei mit dem Namen _Dockerfile_MultiStage_ und kopieren
    Sie den folgenden Inhalt hinein.

```Dockerfile title="Dockerfile_MultiStage"
# Stage 1: Build stage
FROM node:14 AS builder
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Copy the rest of the application code
COPY server.js ./
# Install dependencies
RUN npm install

# Stage 2: Production stage
FROM node:14-slim
# Set the working directory
WORKDIR /app
# Copy only the necessary files from the builder stage
COPY --from=builder /app .
# Expose the port the app runs on
EXPOSE 3000
# Command to run the application
CMD ["npm", "start"]
```

- Bilden Sie das Image mit dem Tag mit dem Befehl
  `docker buildx build -t uebung12ms -f Dockerfile_MultiStage .`.
  - Mit `-f Dockerfile_MultiStage` geben wir an, welches _Dockerfile_ verwendet
    werden soll.
- Vergleichen Sie die beiden _Dockerfiles_.
- Vergleichen Sie die beiden Images auf Grösse und Layers.
