# Aufgaben 1 - einfache Dockerfiles

:::info

- Befehle: `LABEL`, `CMD`, `ENTRYPOINT`, `TAG`

:::

## Übung 1

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

:::info

- Zusätzlicher Befehl: `WORKDIR`

:::

## Übung 3

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

:::info

- Zusätzlicher Befehl: `WORKDIR`

:::
