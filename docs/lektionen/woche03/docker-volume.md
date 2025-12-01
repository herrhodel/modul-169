---
sidebar_position: 3
---

# Docker Volume und Mounts

In der modernen Softwareentwicklung und insbesondere in der Containerisierung
spielt die effiziente Verwaltung von Daten eine entscheidende Rolle. Docker, als
eines der führenden Tools zur Containerisierung, bietet verschiedene Mechanismen
zur Speicherung und Verwaltung von Daten, darunter Docker Volumes und Bind
Mounts. Diese beiden Konzepte sind unerlässlich, um sicherzustellen, dass Daten
in Containern persistent, zugänglich und flexibel sind.

## Warum sind Docker Volumes und Bind Mounts nötig?

### 1. Persistente Datenspeicherung

Container sind von Natur aus flüchtig. Das bedeutet, dass alle Daten, die
innerhalb eines Containers gespeichert werden, verloren gehen, sobald der
Container gestoppt oder gelöscht wird. Um sicherzustellen, dass wichtige Daten,
wie Datenbanken oder Anwendungszustände, auch nach dem Neustart oder der
Aktualisierung eines Containers erhalten bleiben, sind Docker Volumes und Bind
Mounts notwendig. Sie ermöglichen es, Daten ausserhalb des Containers zu
speichern, sodass sie auch nach Änderungen am Container zugänglich bleiben.

### 2. Datenfreigabe zwischen Containern

In vielen Anwendungen müssen mehrere Container miteinander kommunizieren und auf
dieselben Daten zugreifen. Docker Volumes bieten eine einfache Möglichkeit,
Daten zwischen verschiedenen Containern zu teilen, ohne dass die Daten in jedem
Container dupliziert werden müssen. Dies fördert die Effizienz und reduziert den
Speicherbedarf.

### 3. Entwicklungs- und Testumgebungen

In Entwicklungsumgebungen ist es oft erforderlich, dass Entwickler schnell
Änderungen an Dateien vornehmen und diese sofort in ihren Containern sehen
können. Bind Mounts ermöglichen es, lokale Dateien direkt in einen Container
einzubinden, sodass Änderungen in Echtzeit reflektiert werden. Dies beschleunigt
den Entwicklungsprozess und verbessert die Produktivität.

### 4. Flexibilität und Kontrolle

Sowohl Docker Volumes als auch Bind Mounts bieten Flexibilität in der Art und
Weise, wie Daten gespeichert und verwaltet werden. Während Volumes von Docker
verwaltet werden und eine hohe Portabilität bieten, ermöglichen Bind Mounts den
direkten Zugriff auf das Host-Dateisystem. Dies ist besonders nützlich, wenn
spezifische Dateien oder Verzeichnisse benötigt werden, die nicht in einem
Volume gespeichert werden sollen.

### 5. Sicherheits- und Backup-Strategien

Die Verwendung von Volumes und Bind Mounts ermöglicht es, Daten sicher zu
speichern und regelmässige Backups durchzuführen. Da die Daten ausserhalb des
Containers gespeichert sind, können sie unabhängig vom Container verwaltet
werden, was die Implementierung von Backup- und Wiederherstellungsstrategien
erleichtert.

### Fazit

Docker Volumes und Bind Mounts sind unverzichtbare Werkzeuge für die effektive
Verwaltung von Daten in Container-Umgebungen. Sie bieten die notwendige
Persistenz, Flexibilität und Kontrolle, die für moderne Anwendungen erforderlich
sind. Ob in der Entwicklung oder in der Produktion – das Verständnis und die
richtige Anwendung dieser Konzepte sind entscheidend für den Erfolg von
containerisierten Anwendungen.

## Vergleich Docker Volumes mit Bind Mounts

### Docker Volumes

Docker Volumes sind spezielle Verzeichnisse, die von Docker verwaltet werden und
ausserhalb des Containers gespeichert werden. Sie sind persistent und können von
einem oder mehreren Containern verwendet werden. Volumes werden in einem
speziellen Verzeichnis auf dem Host gespeichert, das von Docker verwaltet wird.

### Bind Mounts

Bind Mounts sind Verzeichnisse oder Dateien auf dem Host, die direkt in einen
Container eingebunden werden. Im Gegensatz zu Volumes werden Bind Mounts nicht
von Docker verwaltet, sondern verweisen direkt auf den Pfad im Dateisystem des
Hosts.

### Unterschiede zwischen Docker Volumes und Bind Mounts

| Merkmal      | Docker Volumes                                       | Bind Mounts                                               |
| ------------ | ---------------------------------------------------- | --------------------------------------------------------- |
| Verwaltung   | Von Docker verwaltet                                 | Vom Host verwaltet                                        |
| Speicherort  | Im Docker-Standardverzeichnis                        | Beliebiger Pfad im Host-Dateisystem                       |
| Portabilität | Hoch (kann einfach zwischen Hosts verschoben werden) | Gering (abhängig vom Host-Pfad)                           |
| Sicherheit   | Besser isoliert                                      | Weniger isoliert, da direkt auf den Host zugegriffen wird |
| Performance  | Optimiert für Docker                                 | Abhängig von der Host-Dateisystemleistung                 |

### Vor- und Nachteile Docker Volumes

**Vorteile**

- **Einfache Verwaltung**: Docker bietet Befehle zum Erstellen, Auflisten und
  Löschen von Volumes.
- **Portabilität**: Volumes können einfach zwischen verschiedenen Docker-Hosts
  verschoben werden.
- **Bessere Performance**: Volumes sind für die Verwendung mit Docker optimiert.

**Nachteile**

- **Weniger Kontrolle über den Speicherort**: Der Speicherort der Daten ist
  nicht direkt sichtbar, da Docker ihn verwaltet.
- **Zusätzliche Komplexität**: Für einfache Anwendungsfälle kann die Verwendung
  *von Volumes übertrieben se*in.

### Bind Mounts

**Vorteile**

- **Direkter Zugriff auf Host-Dateisystem**: Änderungen an den Dateien im Bind
  Mount sind sofort auf dem Host sichtbar.
- **Flexibilität**: Jeder beliebige Pfad auf dem Host kann verwendet werden.
- **Einfachheit**: Für Entwicklungsumgebungen kann es einfacher sein, Bind
  Mounts zu verwenden, um schnell Änderungen vorzunehmen.

**Nachteile**

- **Weniger Portabilität**: Bind Mounts sind an den spezifischen Host gebunden,
  was die Migration erschwert.
- **Sicherheitsrisiken**: Da sie direkten Zugriff auf das Host-Dateisystem
  bieten, können sie potenzielle Sicherheitsrisiken darstellen.
- **Abhängigkeit von Host-Umgebung**: Änderungen am Host-Dateisystem können die
  Container beeinflussen.

### Wann welche Variante eingesetzt werden sollte:

**Docker Volumes**

- Wenn Daten persistent gespeichert werden müssen, unabhängig von der
  Lebensdauer des Containers.
- Wenn mehrere Container auf dieselben Daten zugreifen müssen.
- In Produktionsumgebungen, wo Portabilität und Sicherheit wichtig sind.

**Bind Mounts**

- In Entwicklungsumgebungen, wo häufige Änderungen an Dateien erforderlich sind
  und sofortige Rückmeldungen benötigt werden.
- Wenn spezifische Dateien oder Verzeichnisse auf dem Host benötigt werden, die
  nicht in einem Volume gespeichert werden sollen.
- Wenn der Zugriff auf das Host-Dateisystem erforderlich ist, z. B. für
  Konfigurationsdateien oder Logs.

### Fazit

Docker Volumes und Bind Mounts sind nützliche Mechanismen zur Verwaltung von
Daten in Docker-Containern. Die Wahl zwischen ihnen hängt von den spezifischen
Anforderungen der Anwendung, der Umgebung (Entwicklung vs. Produktion) und den
gewünschten Sicherheits- und Portabilitätsaspekten ab.

## Befehlsübersicht Docker Volume

```shell title="Volumen und Bind Mounts"
# Liste aller Volumes anzeigen:
docker volume ls

# Details zu einem bestimmten Volume anzeigen:
docker volume inspect <volumename>

# Ein neues Volume erstellen:
docker volume create <volumename>

# Ein Volume entfernen:
docker volume rm <volumename>

#Alle ungenutzten Volumes entfernen:
docker volume prune

# Einen Container mit einem Volume starten:
docker run -d --name <containername> -v <volumename>:<containerpath> <image>

# Einen Container mit einem Bind Mount starten:
docker run -d --name <containername> -v <hostpath>:<containerpath> <image>
```

## Befehlsübersicht Bind Mounds

```shell
# Einen Container mit einem Bind Mount starten:
docker run -d --name <containername> -v <hostpath>:<containerpath> <image>
```

- Der `<hostpath>` muss relativ zum Befehl auf dem Host vorhanden sein!

### Beispielbefehle

Hier sind einige Beispielbefehle, die die Verwendung der oben genannten Befehle
veranschaulichen:

```shell
# Erstellen eines neuen Volumes namens "mein_volume":
docker volume create mein_volume

# Einen Container "busybox" mit "mein_volume" starten:
docker run -it --rm busybox  -v mein_volume:/data

# Details von "mein_volume" anzeigen:
docker volume inspect mein_volume

# "mein_volume" entfernen:
docker volume rm mein_volume

# Alle ungenutzten Volumes entfernen:
docker volume prune

# Einen Container "busybox" mit einem Bind Mount starten:
docker run -it --rm busybox -v /pfad/auf/dem/host:/data
```

- 💡[BusyBox](https://hub.docker.com/_/busybox/#what-is-busybox-the-swiss-army-knife-of-embedded-linux)
  ist ein minimales images mit nichts drin. Es haltet sich einfach am Leben
  durch eine Endlosschleife.

:::info

- Volumes sind die **bevorzugte Methode** zur Persistierung von Daten in Docker,
  da sie von Docker verwaltet werden und eine bessere Portabilität und Isolation
  bieten.
- Bind Mounts ermöglichen es Ihnen, einen spezifischen Pfad auf dem Host mit
  einem Pfad im Container zu verknüpfen. Dies ist nützlich, wenn Sie Daten
  zwischen dem Host und dem Container direkt austauschen möchten, kann jedoch zu
  Problemen führen, wenn der Host-Pfad nicht existiert oder nicht korrekt
  konfiguriert ist.

Diese Befehle bieten Ihnen eine umfassende Grundlage für die Arbeit mit Docker
Volumes und Bind Mounts, um Daten in Ihren Containern zu persistieren und zu
verwalten.
