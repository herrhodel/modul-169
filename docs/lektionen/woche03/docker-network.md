# Docker Network

Docker ist eine Plattform, die es ermöglicht, Anwendungen in Containern zu
isolieren und zu verwalten. Container sind leichtgewichtige, portable und
selbstgenügsame Umgebungen, die alles enthalten, was eine Anwendung benötigt, um
zu laufen.

## Was ist Docker Networking?

Docker Networking bezieht sich auf die Art und Weise, wie Container miteinander
und mit der Aussenwelt kommunizieren. Es ermöglicht Containern, Daten
auszutauschen und Dienste bereitzustellen, während sie in einer isolierten
Umgebung laufen.

## Wichtige Konzepte im Docker Networking

- **Container**: Die kleinste Einheit in Docker, die eine Anwendung und ihre
  Abhängigkeiten enthält.
- **Netzwerk**: Eine Sammlung von Containern, die miteinander kommunizieren
  können.
- **IP-Adresse**: Jeder Container erhält eine eigene IP-Adresse, die es ihm
  ermöglicht, mit anderen Containern und externen Diensten zu kommunizieren.

### Arten von Docker Netzwerken

Docker bietet verschiedene Netzwerkmodi, die je nach Anwendungsfall verwendet
werden können:

- **Bridge-Netzwerk**: Dies ist das Standardnetzwerk, das Docker für Container
  erstellt. Container, die in einem Bridge-Netzwerk laufen, können miteinander
  kommunizieren, aber nicht direkt mit der Aussenwelt, es sei denn, Ports werden
  freigegeben.
- **Host-Netzwerk**: In diesem Modus teilen sich der Container und der Host den
  Netzwerkstack. Das bedeutet, dass der Container direkt auf die
  Netzwerkressourcen des Hosts zugreifen kann. Dies kann die Leistung
  verbessern, aber die Isolation verringern.
- **Overlay-Netzwerk**: Dieses Netzwerk ermöglicht die Kommunikation zwischen
  Containern, die auf verschiedenen Docker-Hosts laufen. Es wird häufig in
  Docker Swarm-Umgebungen verwendet, um Container über mehrere Maschinen hinweg
  zu verbinden.
- **Macvlan-Netzwerk**: Mit diesem Netzwerktyp können Container eine eigene
  MAC-Adresse erhalten und sich wie physische Geräte im Netzwerk verhalten. Dies
  ist nützlich, wenn Container in ein bestehendes Netzwerk integriert werden
  müssen.
- **IPvlan-Netzwerk**: IPvlan ist eine erweiterte Netzwerkoption, die es
  Containern ermöglicht, direkt im Netzwerk des Hosts zu kommunizieren, während
  sie gleichzeitig eine eigene IP-Adresse erhalten. IPVlan kann in zwei Modi
  betrieben werden:
  - **L2-Modus**: Container können sich wie physische Geräte im Netzwerk
    verhalten und direkt mit anderen Geräten im gleichen Netzwerk kommunizieren.
  - **L3-Modus**: Container kommunizieren über Routing, was bedeutet, dass sie
    über IP-Adressen angesprochen werden und nicht direkt im gleichen Layer
    2-Netzwerk sind. Dies kann nützlich sein, um Netzwerke zu segmentieren und
    die Sicherheit zu erhöhen.

## Kommunikation zwischen Containern

Container, die im selben Netzwerk sind, können sich über ihre Namen, ihrer IP
Adresse, oder die Container ID ansprechen. Zum Beispiel, wenn Sie zwei Container
mit den Namen web und db haben, kann der web-Container den db-Container einfach
über den Namen db erreichen.

## Portmapping in Docker

Portmapping ist ein zentraler Aspekt des Docker Networking, der es ermöglicht,
Container-Dienste für die Außenwelt zugänglich zu machen. Wenn ein Container in
einem Bridge-Netzwerk läuft, ist er standardmäßig nicht direkt von außen
erreichbar. Um dies zu ändern, können spezifische Ports des Containers auf Ports
des Hosts gemappt werden. Dies geschieht durch die Angabe der Option -p beim
Starten eines Containers, gefolgt von der Syntax HostPort:ContainerPort.

Beispielsweise könnte der Befehl docker run -p 8080:80 einen Webserver im
Container, der auf Port 80 lauscht, auf Port 8080 des Hosts verfügbar machen.
Dadurch können externe Clients über `http://<Host-IP>:8080` auf den Dienst
zugreifen.

Das Portmapping ist besonders wichtig, um sicherzustellen, dass Container, die
in isolierten Umgebungen laufen, dennoch mit der Außenwelt kommunizieren können,
ohne die Sicherheit und Isolation der Container zu gefährden. Es ist ein
einfaches, aber effektives Mittel, um die Funktionalität von Docker-Containern
zu erweitern und ihre Dienste für Benutzer und andere Systeme zugänglich zu
machen.

## Sicherheit im Docker Networking

Es ist wichtig, Sicherheitsaspekte zu berücksichtigen, wenn Sie Docker-Netzwerke
einrichten. Verwenden Sie Firewalls und andere Sicherheitsmassnahmen, um den
Zugriff auf Ihre Container zu steuern. Docker bietet auch Funktionen wie
Netzwerkisolierung und Zugriffskontrolle.

## Fazit

Docker Networking ist ein wesentlicher Bestandteil der Containerisierung. Es
ermöglicht die Kommunikation zwischen Containern und der Aussenwelt und bietet
verschiedene Netzwerkmodi, um unterschiedlichen Anforderungen gerecht zu werden.
Ein gutes Verständnis von Docker Networking, einschließlich IPVlan, ist
entscheidend für die effektive Nutzung von Docker in der Softwareentwicklung-
und Bereitstellung.

## Befehlsübersicht Docker Network

### Netzwerke anzeigen

```shell
# Liste aller Netzwerke anzeigen:
docker network ls

# Details zu einem bestimmten Netzwerk anzeigen:
docker network inspect <netzwerkname>
```

### Netzwerke erstellen

```shell
# Ein neues Bridge-Netzwerk erstellen:
docker network create <netzwerkname>

# Ein Overlay-Netzwerk erstellen:
docker network create --driver overlay <netzwerkname>

# Ein Macvlan-Netzwerk erstellen:
docker network create -d macvlan --subnet=<subnet> --gateway=<gateway> -o parent=<interface> <netzwerkname>

# Ein IPvlan-Netzwerk erstellen:
docker network create -d ipvlan --subnet=<subnet> --gateway=<gateway> <netzwerkname>
```

### Netzwerke entfernen

```shell
# Ein Netzwerk entfernen:
docker network rm <netzwerkname>
```

### Container mit Netzwerken verbinden

```shell
# Einen Container in ein Netzwerk starten:
docker run -d --name <containername> --network <netzwerkname> <image>

# Einen laufenden Container einem bestehenden Netzwerk hinzufügen:
docker network connect <netzwerkname> <containername>

# Einen Container von einem Netzwerk trennen:
docker network disconnect <netzwerkname> <containername>
```

### Ports und Exposition (Portmapping)

```shell
# Einen Container mit Portweiterleitung starten:
docker run -d -p <host-port>:<container-port> --name <containername> <image>
```

## Beispielbefehle

Hier sind einige Beispielbefehle, die die Verwendung der oben genannten Befehle
veranschaulichen:

```shell
# Erstellen eines Bridge-Netzwerks:
docker network create mein_netzwerk

# Einen Container im neuen Netzwerk starten:
docker run -d --name mein_container --network mein_netzwerk nginx

# Einen laufenden Container einem anderen Netzwerk hinzufügen:
docker network create mein_anderes_netzwerk
```

docker network connect mein_anderes_netzwerk mein_container

```shell
# Details zu einem Netzwerk anzeigen:
docker network inspect mein_bridge_netzwerk

# Ein Netzwerk entfernen:
docker network rm mein_bridge_netzwerk
```
