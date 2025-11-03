---
sidebar_position: 1
---

# Grundlagen der Virtualisierung

## Warum Container?

In der heutigen Softwareentwicklung gibt es viele verschiedene Möglichkeiten,
wie wir Anwendungen erstellen und bereitstellen können. Eine beliebte Methode
ist die Containerisierung. Aber was bedeutet das genau, und warum ist es
sinnvoll? Lass uns das einfach erklären.

### Was ist Containerisierung?

Containerisierung ist eine Technik, bei der eine Anwendung und all ihre
benötigten Teile – wie Bibliotheken und Abhängigkeiten – in einem sogenannten
"Container" verpackt werden. Man kann sich einen Container wie eine kleine,
abgeschottete Box vorstellen, die alles enthält, was die Anwendung braucht, um
zu funktionieren.

### Vorteile der Containerisierung

- **Portabilität**: Container können auf verschiedenen Computern und in
  verschiedenen Umgebungen ausgeführt werden, ohne dass man sich um Unterschiede
  in der Software oder Hardware kümmern muss. Das bedeutet, dass eine Anwendung,
  die auf einem Entwickler-PC funktioniert, auch problemlos auf einem Server
  oder in der Cloud laufen kann.
- **Konsistenz**: Da alle benötigten Teile in einem Container enthalten sind,
  gibt es weniger Probleme mit "funktioniert auf meinem Computer"-Situationen.
  Jeder, der die Anwendung ausführt, hat die gleiche Umgebung, was die
  Zusammenarbeit im Team erleichtert.
- **Ressourcenschonend**: Container sind leichtgewichtig und benötigen weniger
  Ressourcen als traditionelle virtuelle Maschinen. Das bedeutet, dass man mehr
  Container auf einem einzigen Server ausführen kann, was die Effizienz erhöht.
- **Einfache Skalierung**: Wenn eine Anwendung mehr Nutzer hat und mehr Leistung
  benötigt, kann man einfach zusätzliche Container starten. Das geht schnell und
  einfach, ohne dass man die gesamte Anwendung neu installieren muss.
- **Schnelle Bereitstellung**: Container können in wenigen Sekunden gestartet
  oder gestoppt werden. Das beschleunigt den Entwicklungsprozess und ermöglicht
  es, neue Funktionen schneller bereitzustellen.
- **Isolation**: Container laufen isoliert voneinander. Das bedeutet, dass
  Probleme in einem Container nicht die anderen Container oder die gesamte
  Anwendung beeinträchtigen. Wenn ein Container abstürzt, bleibt der Rest der
  Anwendung weiterhin funktionsfähig.
- **Einfachere Entwicklung**: Durch die Verwendung von Containern können
  Entwickler ihre Anwendungen in einer einheitlichen Umgebung erstellen und
  testen. Das bedeutet, dass sie sich weniger um die spezifischen Einstellungen
  und Konfigurationen der verschiedenen Systeme kümmern müssen. Sie können sich
  auf das Schreiben von Code konzentrieren, ohne sich ständig Gedanken darüber
  machen zu müssen, ob die Anwendung auf einem anderen Computer oder in einer
  anderen Umgebung genauso funktioniert.

### Fazit

Die Containerisierung von Applikationen bietet viele Vorteile, die die
Entwicklung, Bereitstellung und Verwaltung von Software einfacher und
effizienter machen. Sie sorgt dafür, dass Anwendungen überall gleich
funktionieren, spart Ressourcen und ermöglicht eine schnelle Anpassung an neue
Anforderungen. Für Anfänger in der Softwareentwicklung ist es eine wertvolle
Technik, die das Arbeiten mit Anwendungen erheblich erleichtert.

## Geschichte der Virtualisierung

### Bare Metal

Bevor Virtualisierung erfunden wurde, liefen alle Programme direkt auf dem
Host-System. Die Terminologie, die viele Leute dafür verwenden, ist "Bare
Metal". Du bist wahrscheinlich mit dem Betrieb auf Bare Metal vertraut, denn das
ist es, was du tust, wenn du ein Programm auf deinen Laptop/Desktop-Computer
installierst.

Bei einem Bare-Metal-System werden das Betriebssystem, Binärdateien/Bibliotheken
und Anwendungen direkt auf die physische Hardware installiert und ausgeführt.

![bare-metal](img/bare-metal.png)

Das ist einfach zu verstehen und der direkte Zugriff auf die Hardware kann für
spezifische Konfigurationen nützlich sein, kann aber zu folgenden Problemen
führen:

- Viele Abhängigkeitskonflikte.
- Niedrige Nutzungseffizienz.
- Grosser Wirkungsradius von Änderungen.
- Langsames Starten und Herunterfahren (Minuten).
- Sehr langsames Bereitstellen neuer Systeme (Stunden bis Tage).

### Virtuelle Maschinen

Virtuelle Maschinen verwenden ein System namens "Hypervisor", das die Ressourcen
des Hosts in mehrere isolierte virtuelle Hardwarekonfigurationen aufteilen kann,
die dann wie eigene Systeme behandelt werden können (jeweils mit einem
Betriebssystem, Binärdateien/Bibliotheken und Anwendungen).

![Virtuelle Maschinen](img/virtuelle-maschinen.png)

Dies hilft, einige der Herausforderungen zu verbessern, die Bare Metal mit sich
bringt:

- Keine Abhängigkeitskonflikte.
- Bessere Nutzungseffizienz.
- Kleiner Wirkungsradius von Änderungen.
- Schnelleres Starten und Herunterfahren (Minuten).
- Schnelleres Bereitstellen neuer Systeme (Minuten).

### Container

Container ähneln virtuellen Maschinen insofern, als sie eine isolierte Umgebung
für die Installation und Konfiguration von Binärdateien/Bibliotheken bieten,
aber anstatt auf Hardwareebene zu virtualisieren, nutzen Container native
Linux-Funktionen (cgroups + namespaces), um diese Isolation zu bieten und
dennoch denselben Kernel zu teilen.

![Container](img/container.png)

Dieser Ansatz führt dazu, dass Container "leichtgewichtiger" sind als virtuelle
Maschinen, aber nicht dasselbe Niveau an Isolation bieten:

- Keine Abhängigkeitskonflikte.
- Noch bessere Nutzungseffizienz.
- Kleiner Wirkungsradius von Änderungen.
- Noch schnelleres Starten und Herunterfahren (Sekunden).
- Noch schnelleres Bereitstellen, Starten und Stoppen (Sekunden).
- Leicht genug, um in der Entwicklung verwendet zu werden!
