# Linkeats
(Antoine FOURCIN, Antoine LEGOIS, Arnaud MATUREL, Alim NOUIRA)

## Présentation
Site de mise en relation entre des restaurateurs

## Installation

### Installation des paquets npm

Exécuter le fichier init.bat (double clic) ou lancer la commande suivante dans une invite de commande (command prompt) dans le dossier racine du projet

```Shell
cmd init.bat
```

### Base de données

Demandez le dossier .data à Alim

## Démarrage des dockers

Lancer les commandes suivantes dans une invite de commande (command prompt) dans le dossier racine du projet

```Shell
docker-compose build && docker-compose down && docker-compose up -d
```

### Explications

1. docker-compose build 

Cela permet de générer les images définis dans le fichier docker-compose.yml dans le dossier renseigné (. par défaut)

2. docker-compose down

Cela permet d'arrêter et supprimer les conteneurs et le réseau des applications dockers multi-conteneurs

3. docker-compose up -d

Cela permet de créer et démarrer les conteneurs et le réseau des applications dockers multi-conteneurs
L'option -d permet de faire touner l'application en daemon soit en arrière-plan