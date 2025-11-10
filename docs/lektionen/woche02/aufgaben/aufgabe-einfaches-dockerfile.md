---
sidebar_position: 3
---
# Aufgaben 1 - Einfaches Dockerfile

:::caution TODO

- Lösungen: https://classroom.github.com/a/dKJpFsTt

:::

## Übung 1

:::note

- Befehle: `LABEL`, `CMD`
- sowie: `-t`

:::

- Erstellen Sie ein _Dockerfile_, welches als Basis-Image `ubuntu` verwendet
  (`FROM`), das `Label Author="Ihr Name"` enthält (`LABEL`), und den Befehl
  `["echo", "Mein erstes Docker Image"]`ausführt`(CMD)`.
- Bilden Sie das Image mit dem Befehl `docker buildx build -t uebung01 .`
  (inklusive Punkt am Schluss)
- Überprüfen Sie, ob das Image vorhanden ist, indem Sie `docker image ls`
  ausführen. Das Image _uebung01_ sollte angezeigt werden.
- Erstellen Sie einen Container vom eben erstellten Image mit dem Befehl
  `docker run uebung01`.
  - Es sollte Mein erstes Docker Image ausgegeben werden.

## Übung 2

:::note

- Zusätzlicher Befehl: `ENTRYPOINT`

:::

- Erstellen Sie ein _Dockerfile_, welches als Basis-Image `alpine` verwendet,
  das `LABEL Author="Ihr Name"` enthält, den `ENTRYPOINT ["echo"]` und den
  Befehl `CMD ["Standard Ausgabe"]`.
- Bilden Sie das Image mit dem Tag `-t uebung02`
- Überprüfen Sie, ob das Image vorhanden ist, indem Sie `docker image ls`
  ausführen. Das Image _uebung02_ sollte angezeigt werden.
- Vergleichen Sie die Grösse der beiden Images _uebung01_ *und u*ebung02. Was
  fällt Ihnen auf? Woran könnte das liegen?
- Erstellen Sie einen Container vom eben erstellten Image mit dem Befehlt
  `docker run uebung02`.
  - Es sollte Standard Ausgabe ausgegeben werden.
- Erstellen Sie einen Container, sodass neue Ausgabe ausgegeben wird.

## Übung 3

:::note

- Zusätzlicher Befehl: `WORKDIR`

:::

- Erstellen Sie ein _Dockerfile_, welches als Basis-Image `python:alpine3.20`
  verwendet. Fügen Sie wieder das `LABEL Author="Ihr Name"` hinzu. Der
  Standard-Befehl soll `CMD ["pwd"]` sein (Ausgabe des Arbeitsverzeichnisses).
- Bilden Sie das Image mit dem Tag `-t uebung03`.
- Überprüfen Sie, ob das Image vorhanden ist. Vergleichen Sie die Grösse mit dem
  Image _uebung02_. Beide verwenden `alpine` als Basis-Image, trotzdem ist die
  Grösse unterschiedlich. Warum?
- Erstellen Sie einen Container vom eben erstellten Image mit dem Befehlt
  `docker run uebung03`.
  - Es sollte / ausgegeben werden.

## Übung 4

- Erstellen Sie ein _Dockerfile_, welches als Basis-Image `python:alpine3.20`
  verwendet. Fügen Sie wieder das `LABEL Author="Ihr Name"` hinzu. Ändern Sie
  das Arbeitsverzeichnis (`WORKDIR`) zu "/app". Der Standard-Befehl soll
  `CMD ["pwd"]` sein (Ausgabe des Arbeitsverzeichnisses).
- Bilden Sie das Image mit dem Tag `-t uebung04`
- Erstellen Sie einen Container vom eben erstellten Image mit dem Befehlt
  `docker run uebung04`.
  - Es sollte /app ausgegeben werden.

## Übung 5

:::note

- Zusätzlicher Befehl: `RUN`.

:::

Nun wollen wir selber Python installieren und verwenden als Basis-Image wieder
alpine.

- Erstellen Sie ein _Dockerfile_, welches als Basis-Image _alpine_ verwendet.
- Installieren Sie _python 3.12_, indem Sie folgende Befehle ergänzen:

```Dockerfile
# Use the latest Alpine image
FROM alpine:latest

# Update the package index and install Python 3.12 and pip
RUN apk add --no-cache python3=3.12.8-r1
RUN apk add --no-cache py3-pip

# Set the working directory
WORKDIR /app
```

- Fügen Sie wieder das `LABEL Author="Ihr Name"` hinzu. Ändern Sie das
  Arbeitsverzeichnis (WORKDIR) zu `"/app"`. Der Standard-Befehl soll
  `CMD ["python3"]` sein.
- Bilden Sie das Image mit dem Tag `-t uebung05`
- Überprüfen Sie, ob das Image vorhanden ist. Vergleichen Sie die Grösse mit dem
  Image _uebung04_. Beide verwenden Alpine als Basis-Image und haben Python
  installiert, trotzdem ist die Grösse unterschiedlich. **_Warum?_**

## Übung 6

:::note

- Zusätzliches Feature: Optimierung

:::

Wir optimieren das _Dockerfile_ der Übung 5, indem wir die Installation von
Python und Pip in **einen `RUN` Befehl** vereinen.

- Ersetzen Sie die beiden Zeilen (rot) mit folgendem Befehl (grün). Dies führt
  dazu, dass die Installation von Python und Pip nur eine Schicht in Anspruch
  nehmen.

```Dockerfile
...
# Update the package index and install Python 3.12 and pip
//highlight-red-start
RUN apk add --no-cache python3=3.12.8-r1
RUN apk add --no-cache py3-pip
//highlight-red-end
//highlight-green-start
RUN apk add --no-cache \
  python3=3.12.8-r1 \
  py3-pip
//highlight-green-end
...
```

- Fügen Sie wieder das `LABEL Author="Ihr Name"` hinzu. Ändern Sie das
  Arbeitsverzeichnis (WORKDIR) zu `"/app"`. Der Standard-Befehl soll wieder
  `CMD ["python3"]` sein.
- Bilden Sie das Image mit dem Tag `-t uebung06`
- Überprüfen Sie, ob das Image vorhanden ist. Vergleichen Sie die Grösse mit dem
  Image _uebung05_. Sie sollten einen kleinen Grössenunterschied feststellen
  können. In diesem Fall ist es nicht viel, kann aber je nach Installation viel
  ausmachen.
- Sie können die erstellten Layer sehen, indem Sie folgenden Befehl ausführen:
  `docker image inspect uebung05`. Unter dem zweitletzten Eintrag RootFS des
  angezeigten JSON sieht man die Layer. Bei _uebung05_ sollten es 4 sein, bei
  _uebung06_ nur noch 3. Zu sehen sind die Hash-Werte der Layer (sha256).

## Übung 7

:::note

- Zusätzlicher Befehl: `COPY`.

:::

Jetzt wollen wir ein einfaches Python-Programm laufen lassen. Wir benützen als
Basis-Image python:3.13.1-alpine3.20. Dies bedeutet, dass wir die Python-Version
3.13.1 und die alpine-Version 3.20 verwenden. Es ist gute Praxis, konkrete
Versionen des Base-Images zu wählen, um Versions-Konflikte mit dem Programm,
welches im Container läuft, zu verhindern.

- Erstellen Sie ein Dockerfile mit der Basis `python:3.13.1-alpine3.20`
- Definieren Sie als Arbeitsverzeichnis `/app`.
- Erstellen Sie im Ordner dieser Übung die Datei `app.py` und kopieren Sie
  folgenden Inhalt hinein.
  - Achten Sie darauf, dass die Einrückungen gleich sind!

```python title="app.py"
import os

def list_folders_in_root():
    # Get the list of all entries in the root directory
    entries = os.listdir('/')
    # Filter out only directories
    folders = [entry for entry in entries if os.path.isdir(os.path.join('/', entry))]
    return folders

if **name** == "**main**":
    folders = list_folders_in_root()
    print("Folders in the root directory:")
    for folder in folders:
        print(folder)
```

- Kopieren Sie `app.py` mit dem `COPY` Befehl in das Arbeitsverzeichnis.
- Sorgen Sie mit dem `CMD` Befehl dafür, dass die App ausgeführt wird.
- Bilden Sie das Image mit dem Tag `-t uebung07`
- Erstellen Sie einen Container vom eben erstellten Image mit dem Befehlt
  `docker run uebung07`.
- Sie sollten eine Ausgabe aller Ordner im Root-Verzeichnis bekommen: _home,
  bin, run…_

## Übung 8

:::note

- Zusätzliches Feature: ".dockerignore"

:::

Wir wollen nun ein Image erstellen, wo zu Laufzeit angegeben werden kann,
welches Python-Skript laufen soll. Zudem wollen wir mit einem sogenannten
_.dockerignore_ File definieren, was ignoriert werden soll, wenn wir ein ganzes
Verzeichnis kopieren.

- Kopieren Sie den Ordner von _uebung07_ und nennen Sie in um in _uebung08_.
- Erstellen Sie ein weiteres Python-Skript mit dem Namen `guess_the_number.py`
  und kopieren Sie das unten stehende Skript hinein.
  - Achten Sie wieder auf die Einrückungen.

```python title="guess_the_number.py"
import random

def guess_the_number():
    number_to_guess = random.randint(1, 100)
    attempts = 0
    print("Welcome to 'Guess the Number'!")
    print("I'm thinking of a number between 1 and 100.")
    while True:
        try:
            guess = int(input("Take a guess: "))
            attempts += 1
            if guess < number_to_guess:
                print("Too low! Try again.")
            elif guess > number_to_guess:
                print("Too high! Try again.")
            else:
                print(f"Congratulations! You've guessed the number {number_to_guess} in {attempts} attempts.")
                break
        except ValueError:
            print("Please enter a valid integer.")

if __name__ == "__main__":
    guess_the_number()
```

- Kopieren Sie im _Dockerfile_ den gesamten Ordnerinhalt in das
  Arbeitsverzeichnis hinein. Dies erreichen Sie, indem Sie `COPY . .` ergänzen.
  Den anderen COPY Befehl brauchen Sie nicht mehr.
- Damit das _Dockerfile_ selber nicht in das Image kopiert wird, erstellen Sie
  eine Datei mit dem Namen `.dockerignore` und ergänzen sie mit dem Eintrag
  `Dockerfile` wie folgt.

```txt title=".dockerignore"
Dockerfile
```

- Ändern Sie den Rest vom _Dockerfile_ so ab, dass standardmässig `app.py`
  ausgeführt wird. Man soll jedoch beim Starten des Containers auch
  `guess_the_number.py` wählen können.
- Bilden Sie das Image mit dem Tag `-t uebung08`
- Erstellen Sie einen Container vom eben erstellten Image mit dem Befehlt
  `docker run uebung08`. Sie sollten die gleiche Ausgabe wie bei _uebung07_
  erhalten.
- Damit Sie das Spiel spielen können, müssen Sie den Container interaktiv
  starten: `docker run -it --rm uebung08 guess_the_number.py`
  - `-it` startet den Container im interaktiven Modus, das heisst, Sie befinden
    sich nach dem Starten im Container.
  - `--rm` führt dazu, dass der Container gelöscht wird, sobald Sie den
    Container beenden.
  - Mit dem Zusatz `guess_the_number.py` überschreiben Sie den Standartwert des
    im _Dockerfile_ definierten `CMD` Befehl.

## Übung 9

:::note

- Zusätzlicher Befehl: `ENV`.

:::

Wir kreieren nun ein Image, bei welchem Umgebungsvariablen im Dockerfile gesetzt
werden. Umgebungsvariablen sind nützlich, um z.B. eine Applikation zu
konfigurieren, oder um Credentials auf eine sichere Art und Weise zur Verfügung
zu stellen. So kann man in einer Umgebungsvariable die URL zu einer Datenbank
und in einer weiteren Umgebungsvariablen das Passwort der Datenbank speichern.

- Kreieren Sie ein _Dockerfile_, welches auf `ubuntu` basiert.
- Setzen Sie die Umgebungsvariablen `VERSION="1.0"`, `MY_NAME="Ihr Name"`.
  - Sie können alle Umgebungsvariablen mit dem Befehl `env` ausgeben.
- Erstellen Sie das Image mit dem Tag `-t uebung09`.
- Erstellen Sie einen Container mit dem Befehl `docker run -it --rm uebung09`.
  Sie sollten unter anderem die von Ihnen gesetzten Umgebungsvariablen sehen.
- Mit `docker image inspect uebung09` sollten Sie unter Config einen Unterpunkt
  mit dem Namen Env finden, wo Sie die von Ihnen gesetzten Umgebungsvariablen
  sehen können.

## Übung 10

Wir kreieren ein Image, bei welchem nginx installiert und verwendet wird. Nginx
kann man unter anderem als Webserver verwenden. Damit der Webserver erreichbar
ist, muss man den entsprechenden Port im Dockerfile "exponieren". Dies geschieht
mit dem EXPOSE Befehl.

- Kreieren Sie folgendes _Dockerfile_:

```Dockerfile title="Dockerfile"
FROM ubuntu:24.04
LABEL Author="Ihr Name"
RUN apt-get update && apt-get -y upgrade && \
apt-get install -y nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

- Erstellen Sie das Image mit dem Tag `-t uebung10`
- Erstellen Sie einen Container mit dem Befehl `docker run --rm uebung10`.
  Versuchen Sie, die Standard-Webseite in Ihrem Browser zu öffnen, indem Sie auf
  die URL http://localhost:80 gehen.
  - (Es wird nicht funktionieren.) Sie können den laufenden Container mit Ctrl +
    C beenden.
- Docker öffnet den Port nur für Kommunikation zwischen Containern im internen
  Docker-Netzwerk. Es öffnet den Port nicht für Zugriff vom Host-Computer. Um
  den Zugriff vom Host-Computer zu ermöglichen, müssen Sie den Port mit
  `-p 80:80` freischalten.

  ```shell
  docker run --rm -p 80:80 uebung10
  ```

:::tip

- Klappt dies nicht, Windows hat den Port 80 ab und zu belegt, könnt Ihr auch
  ein anderen Host-Port verwenden. Links ist immer der Host und rechts vom `:`
  der Port im Container.

  ```shell
  docker run --rm -p 8080:80 uebung10
  ```

  :::
