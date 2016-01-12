# CallToMake

Reappropriation of a rotary phone with the aid of an Arduino through a workshop at Gobelin, l'école de l'image.

## Our Project

Nous souhaitons redonner vie à un téléphone à cadran en détournant ses anciennes fonctionnalitées pour leur en donner de nouvelles plus dans l'air du temps.

Notre but est de pouvoir connecter notre téléphone à une application logiciel afin d'associer un numéro du téléphone à l'un des services proposés par l'application.

Par exemple, il serra possible d'associer le numéro "4" du téléphone à une action spécifique tel que "activer/desactiver le wifi".

## Schema du workflow

<img alt="UML" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/UML.jpg?raw=true">

## Schema du montage

**TODO : Faire le schéma grossié.**


# Déroulement du workshop

## Utilisation des composant du téléphone

### Démontage

<img alt="Disassembling 1" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/0_callToMake_disassembling_1.jpg?raw=true" width="300">
<img alt="Disassembling 1" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/0_callToMake_disassembling_2.jpg?raw=true" width="300">


### Capture du signal du cadran

<img alt="Disassembling 1" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/1_callToMake_dialsignal_1.JPG?raw=true" width="300">

Le cadran est composé de deux interrupteurs qui ouvrent et ferment la ligne afin de donner différentes informations :

- L'interupteur lié au circuit bleu se ferme lorsque l'on commence à composer un numéro et que l'on quitte la position initiale.

- L'interupteur lié au circuit rouge fournit des impulsions lorsque le cadran est relaché en s'ouvrant et se refermant n fois en fonction du chiffre composé.

Il est donc possible à l'aide de ces deux signaux de récuperer via l'Arduino le numéro composé.

Mais le signal permettant de définir le numéro composé n'est pas net et donne un signal légèrement différent à chaque fois. Par exemple pour le "4", nous pouvions avoir :

- `010101011`
- `0110100011`

Nous avons donc récupéré le signal analogique pour l'analyser et compter uniquement ses changements d'état grâce à un `attachInterrupt`. Ce qui nous a permis d'ommettre les aléas du signal capté et d'ainsi de pouvoir compté le nombre de scésures dans le signal.

**TODO : Mettre le code qui nous a permis de faire ça**


Au final, nous avons utilisé la librairie [RotoPhone](https://github.com/tournevis/rotoPhone) écrite par [Arthur Rob](https://github.com/tournevis) afin d'avoir un projet bien segmenté.

### Détection du décrochage/raccrochage

**TODO : Mettre le lien vers le schéma de cablage du téléphone.**

En regardant le [schéma de cablage du téléphone](), nous avons pu détecté deux points auquel il était possible de se brancher pour utiliser le mécanisme du combiné comme un simple interrupteur. Il a donc été très simple d'analyser le signal.

Malheureusement, le changement d'état n'était pas net et produisait un signal avec des intterférences tel que :

- `0000000000001100101011100111111111111111111`

Ce qui rend impossible l'utilisation de la fonction `attachInterrupt`. Il a donc fallut utiliser la méthode dite `Nom de la méthode d'Arthur` afin d'être sur qu'un changement d'état s'oppère réellement avant de le valider.

**TODO : Mettre le script pour l'interruption**

Nous avons ensuite ajouté cette fonctionnalitée à la librairie [RotoPhone](https://github.com/tournevis/rotoPhone) afin de la rendre compatible avec la capture du signal.

### Utilisation du combiné

#### Le haut parleur

Afin de tester le haut parleur du téléphone, nous avons dans un premier temps juste fait passer un courant alternatif dans celui-ci.

Le signal étant satisfaisant (bip continu suffisament audible), à l'aide du shield audio d'arduino, nous avons essayé de jouer une piste audio via le haut parleur. Et une fois les deux cables du combiné lié à une prise jack, nous avons pu tester le haut parleur directement lié à l'arduino.

Et le résultat était très satisfaisant ! Grâce à la prise jack, le combiné peut être branché à n'importe quel appareil produisant du son.

<img alt="Combiné avec prise jack" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/2_callToMake_usingMicrophone.JPG?raw=true" width="300">

De ce fait, nous avons décidé de garder le haut parleur de base du combiné pour notre projet.

#### Le micro


# Montage

**TODO : Arduino prend le cadran et le décrochage**

**TODO : Raspberry prend l'audio pour sa puissance**

**TODO : Le tout écouté par un serveur node sur l'ordi**


### Montage avec l'arduino

#### Cablage

**TODO : Parler des problèmes de compatibilitée entre les deux circuits.**

**TODO : Parler du PULL UP pour éviter les interférences dans le signal.**

**TODO : Mettre le schéma final.**

#### Données envoyées

- Numérotation : 0 à 9
- PickUp : 10
- HangUp : 20

### Montage avec la Raspberry


### Connection et dialogue de l'enssemble :

L'arduino cablée au telephone est connectée par USB à la carte Raspberry qui, grâce à un serveur node.js, capture les informations émisent pas l'arduino.

Cet enssemble représente le téléphone qui est indépendant de l'ordinateur grace à une clé Wifi branchée sur la Raspberry PI lui permettant de s'y connecter via SSH.

<img alt="Arduino to Raspberry" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/3_callToMake_ArduinoToRaspberry.JPG?raw=true" width="300">


### Création de l'application
