# Aufgabe 2 - Docker Desktop

Versuchen Sie nun alle Aufgaben **ohne Docker CLI** durchzuarbeiten. Gelingt
dies immer?

## Übung 1: Einfache Container-Erstellung und -Verwaltung

- 1. Ziel: Erstellen Sie einen neuen Container aus dem hello-world Image.

<details>
  <summary>Lösung:</summary>

Das geht, indem man links auf Docker Hub klickt und dort nach hello-world sucht.
Anschliessend kann man den Container mit run starten.

</details>

- 2. Ziel: Starten Sie einen neuen Container aus dem ubuntu Image und führen Sie
     einen Befehl aus, um die Version von Ubuntu anzuzeigen.

<details>
  <summary>Lösung:</summary>

In Docker Desktop kann man nicht einen Container mit einem bestimmten Befehl
laufen lassen.

</details>

## Übung 2: Container-Management

1. Ziel: Starten Sie einen Container aus dem nginx Image und lassen Sie ihn im
   Hintergrund laufen.

<details>
  <summary>Lösung:</summary>

Das geht, indem ein Image gestartet wird. Dieses läuft automatisch im
Hintergrund.

</details>

2. Ziel: Listen Sie alle laufenden Container auf.

<details>
  <summary>Lösung:</summary>

Links kann man auf Container klicken, um alle Container sehen zu können.
Diejenigen mit einem ausgefüllten Punkt sind am Laufen.

</details>

3. Ziel: Stoppen Sie den laufenden Nginx-Container.

<details>
  <summary>Lösung:</summary>

Das geht im gleichen Menu wie oben beim Starten, indem auf das Stopp-Symbol
geklickt wird.

</details>

## Übung 3: Arbeiten mit Images

1. Ziel: Laden Sie das alpine Image herunter.

<details>
  <summary>Lösung:</summary>

Das geht, indem links auf Docker Hub geklickt wird und nach _alpine_ gesucht
wird.

</details>

- Ziel: Listen Sie alle lokal gespeicherten Docker-Images auf.

<details>
  <summary>Lösung:</summary>

Das geht, indem links auf Images geklickt wird.

</details>

- Ziel: Entfernen Sie das alpine Image.

<details>
  <summary>Lösung:</summary>

Das geht, indem unter Images das Abfall-Symbol beim entsprechenden Image
angeklickt wird.

</details>

## Übung 4: Protokolle und Volumes

- Ziel: Starten Sie einen Container aus dem nginx Image und zeigen Sie die
  Protokolle an.

<details>
  <summary>Lösung:</summary>

Das geht, indem auf den Container geklickt wird und dann auf Logs.

</details>

- Ziel: Erstellen Sie ein Volume und verwenden Sie es in einem neuen Container.

<details>
  <summary>Lösung:</summary>

Das geht, indem beim Starten eines Images unter Optional settings ein Volume
(existierend oder nicht existierend) gemounted wird. Das Volume kann zuerst
unter Volumes erstellt werden, ist aber nicht zwingend.

</details>
