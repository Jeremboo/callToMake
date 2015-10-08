# CallToMake

Reappropriation of a rotary phone with the aid of an Arduino through a workshop at Gobelin, l'école de l'image.

## Our Project 

Nous souhaitons redonner vie à un téléphone à cadran en détournant ses anciennes fonctionnalitées pour leur en donner de nouvelles plus dans l'air du temps. 

Notre but est de pouvoir connecter notre téléphone à une application logiciel afin d'associer un numéro du téléphone à l'un des services proposés par l'application.

Par exemple, il serra possible associer le numéro "4" du téléphone à une action spécifique tel que "activer/desactiver le wifi".

## Réalisation

  Déroulement du workshop

### Démontage

<img alt="Disassembling 1" src="https://github.com/Jeremboo/callToMake/blob/master/photos/0_callToMake_disassembling_1.jpg?raw=true" width="300">
<img alt="Disassembling 1" src="https://github.com/Jeremboo/callToMake/blob/master/photos/0_callToMake_disassembling_2.jpg?raw=true" width="300">

### Capture du signal du cadran

<img alt="Disassembling 1" src="https://github.com/Jeremboo/callToMake/blob/master/photos/1_callToMake_dialsignal_1.JPG?raw=true" width="300">

Le cadran est composé de deux interrupteurs qui ouvrent et ferment la ligne afin de donner différentes informations : 

- L'interupteur lié au circuit bleu se ferme lorsque l'on commence à composer un numéro et que l'on quitte la position initiale.

- L'interupteur lié au circuit rouge fournit des impulsions lorsque le cadran est relaché en s'ouvrant et se refermant n fois en fonction du chiffre composé.

Il est donc possible à l'aide de ces deux signaux de récuperer via l'Arduino le numéro composé. 

Mais le signal permettant de définir le numéro composé n'est pas net et donne un signal légèrement différent à chaque fois. Par exemple pour le "4", nous pouvions avoir :

- `010101011`
- `0110100011`

Nous avons donc, à l'aide de la méthode `TODO`, récupéré le signal analogique pour l'analyser et compter uniquement ses changements d'état. Ce qui nous a permis d'ommettre les aléas du signal capté. 

### Remplacement sur micro d'origine

### Connection de l'arduino avec un serveur node.js

### Création de l'application


