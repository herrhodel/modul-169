---
sidebar_position: 4
---
# Aufgaben

## Installation von Docker Desktop oder Docker

Damit wir Docker verwenden können, müssen wir es zuerst installieren. Bei
Windows und MacOS geschieht dies über Docker Desktop, auf Linux kann man Docker
oder Docker Desktop erwenden. Wenn man Docker Desktop verwendet, läuft Docker in
einer virtuellen Maschine.

Wählen Sie die für Sie passende Anleitung unten aus und installieren Sie Docker
Desktop oder Docker.

- Eine Anleitung zur Installation von Docker Desktop auf Windows findet man
  [hier](https://marvelous-son-96f.notion.site/Installation-von-Docker-Desktop-c0e254db94104e659468ea73461d6c1f)
  oder
  [hier](https://marvelous-son-96f.notion.site/Installation-von-Docker-Desktop-c0e254db94104e659468ea73461d6c1f)
  (Original-Anleitung).
- Eine Anleitung zur Installation von Docker Desktop auf MacOS findet man
  [hier](https://docs.docker.com/desktop/setup/install/mac-install/#install-and-run-docker-desktop-on-mac).
- Eine Anleitung zur Installation von Docker Desktop auf Linux findet man
  [hier](https://docs.docker.com/desktop/setup/install/linux/). Arch-basierte
  Distributionen werden nur experimentel unterstützt.
- Eine Anleitung zur Installation von Docker auf Linux findet man
  [hier](https://docs.docker.com/engine/install/).

## Docker CLI und Docker Desktop

Die Docker CLI (Command Line Interface) ist ein Befehlszeilenwerkzeug, mit dem
Benutzer Docker-Container und -Images verwalten können. Mit der Docker CLI
können Sie Container erstellen, starten, stoppen und löschen sowie Images
herunterladen und verwalten. Sie ermöglicht eine einfache Interaktion mit der
Docker-Engine über Befehle, die in einem Terminal eingegeben werden. Die CLI ist
ein wichtiges Tool für Entwickler und Systemadministratoren, um
Container-basierte Anwendungen effizient zu steuern und zu orchestrieren.

## Hier sind einige der wichtigsten Docker CLI Befehle mit einer kurzen Beschreibung:

- **docker run**: Startet einen neuen Container aus einem angegebenen Image.
  Beispiel: docker run hello-world.
- **docker ps**: Listet alle laufenden Container auf. Mit der Option -a (docker
  ps -a) werden auch gestoppte Container angezeigt.
- **docker images**: Zeigt eine Liste aller lokal gespeicherten Docker-Images
  an.
- **docker rmi**: Entfernt ein oder mehrere Docker-Images. Beispiel: docker rmi
  image_name.
- **docker rm**: Löscht einen oder mehrere Container. Beispiel: docker rm
  container_id.
- **docker exec**: Führt einen Befehl in einem laufenden Container aus.
  Beispiel: docker exec -it container_id bash öffnet eine interaktive
  Bash-Sitzung im Container.
- **docker pull**: Lädt ein Docker-Image aus einem Registry (z. B. Docker Hub)
  herunter. Beispiel: docker pull ubuntu.
- **docker push**: Überträgt ein lokales Docker-Image in eine Registry.
  Beispiel: docker push username/image_name.
- **docker logs**: Zeigt die Protokolle eines Containers an. Beispiel: docker
  logs container_id.
- **docker network**: Verwaltet Docker-Netzwerke. Mit Unterbefehlen wie docker
  network ls können Sie Netzwerke auflisten.
- **docker volume**: Verwaltet Docker-Volumes, die zur Speicherung von Daten
  verwendet werden. Beispiel: docker volume ls listet alle Volumes auf.

Diese Befehle sind grundlegend für die Arbeit mit Docker und helfen Ihnen,
Container und Images effektiv zu verwalten.


