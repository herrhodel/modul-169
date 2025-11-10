---
sidebar_position: 5
---

# Aufgaben 3 - Docker Hub Tutorial

In diesem Tutorial lernen Sie, wie Sie Docker-Images korrekt taggen und in Ihr
eigenes Repository auf Docker Hub pushen können.
[Docker Hub](https://hub.docker.com) ist ein Cloud-basierter Dienst, der es
Ihnen ermöglicht, Docker-Images zu speichern, zu teilen und zu verwalten.

:::caution Voraussetzungen

- **Ein Docker-Account**: Wenn Sie noch keinen Account haben, können Sie sich
  [hier registrieren](https://hub.docker.com/signup).
- **Docker installiert**: Stellen Sie sicher, dass Docker auf Ihrem Computer
  installiert und konfiguriert ist. Sie können die Installationsanweisungen auf
  der [Docker-Website](https://docs.docker.com/get-docker/) finden.

:::

## Schritt 1: Docker-Image erstellen

Zuerst müssen wir ein Docker-Image erstellen. Diesen Schritt haben Sie bereits
einige Mal getan.

```shell
docker build . -t my-image
```

## Schritt 2: Docker-Images taggen

Docker-Images können mit Tags versehen werden, um verschiedene Versionen oder
Umgebungen zu kennzeichnen. Ein Tag hat das Format `repository:tag`. Wenn Sie
kein Tag angeben, wird standardmäßig latest verwendet.

```shell
docker tag <lokales-image> <your-dockerhub-username>/<name-auf-dockerhub>:<tag>
```

Beispiel für das Taggen eines Images um es auf Docker-Hub veröffentlichen zu
können:

```shell
docker tag my-image your-dockerhub-username/my-image:1.0
```

- Hierbei ist `my-image` das lokal getaggte Image, `your-dockerhub-username` Ihr
  Docker Hub-Benutzername und `1.0` die Version des Images.

## Schritt 3: Anmelden bei Docker Hub

Bevor Sie Ihr Image pushen können, müssen Sie sich bei Docker Hub anmelden.
Verwenden Sie den folgenden Befehl:

```shell
docker login
```

- Folgen Sie den Anweisungen.

## Schritt 4: Docker-Images pushen

Um Ihr getaggtes Image in Ihr Docker Hub-Repository zu pushen, verwenden Sie den
folgenden Befehl:

```shell
docker push <dockerhub-name>/<imagename>:<tag>
```

Als Beispiel:

```shell
docker push your-dockerhub-username/my-image:1.0
```

## Schritt 5: Überprüfen Sie Ihr Repository

Gehen Sie zu [Docker Hub](https://hub.docker.com) und melden Sie sich an.
Navigieren Sie zu Ihrem Profil, um das gepushte Image zu sehen. Sie sollten das
Image mit dem Tag 1.0 in Ihrem Repository finden. Wichtige Hinweise

- **Versionsverwaltung**: Es ist eine gute Praxis, Ihre Images mit
  Versionsnummern zu taggen, um verschiedene Versionen Ihrer Anwendung zu
  verwalten.
  - Am besten gibt es zu jedem Docker Tag ein Git Tag 🦸‍♀️
- **Sicherheit**: Achten Sie darauf, sensible Informationen (wie Passwörter oder
  API-Schlüssel) nicht in Ihren Docker-Images zu speichern.
  - Diese werden beim Ausführen als Environmentvariablen injected, mit
    _docker-compose_ oder auch _Kubernetes_ und Co.
- **Automatisierung**: Sie können CI/CD-Tools (wie GitHub Actions oder GitLab
  CI) verwenden, um den Build- und Push-Prozess zu automatisieren.
