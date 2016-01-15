# CallToMake

Reappropriation of a rotary phone with the help of an Arduino through a workshop at Gobelin, l'école de l'image.

By [Mathis Biabiany](https://github.com/mats31) and [Jérémie Boulay](www.jeremieboulay.fr).

## Our Project

<img alt="Header Call To Make" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/header.jpg?raw=true">

Nous souhaitons redonner vie à un téléphone à cadran en détournant ses anciennes fonctionnalités pour leur en donner de nouvelles plus dans l'air du temps.

Notre but est de pouvoir connecter notre téléphone à une application logiciel afin d'associer un chiffre du téléphone à l'un des services proposés par l'application.

#### Liste de fonctionnalitées possibles :

- Traduire une phrase dans plusieurs langues
- Afficher la météo
- Mettre en veille l'ordinateur
- Ajouter une tache à une toDoList
- Ouvrir une application (commande vocale)
- Faire une recherche (commande vocale)
- Envoyé un tweet (commande volace)
- Activer/Désactiver la Wifi
- Allumer/Eteindre un object connecté (lampe)
- Faire une capture d'écran
- Prendre une photo avec sa webcam
- ...

#### Fiche produit et Mode d'emploi

[Fiche produit & Mode d'emploi](https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/ficheProduit.pdf).

## Schéma du workflow

<img alt="UML" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/UML.jpg?raw=true">

## Schéma du montage

<img alt="Schéma de montage" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/schemaMontage.jpg?raw=true">

### Inspirations

[IFTTT](https://ifttt.com/recipes)

<img alt="IFTTT" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/inspi/iftt.png?raw=true" width="200">

[KickStarter search](https://www.kickstarter.com/discover/categories/design?sort=end_date)

<img alt="KickStarter search" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/inspi/kickstarter search.png?raw=true" width="200">

### Mockup

<img alt="KickStarter search" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/maquette.jpg?raw=true" width="200">




# Déroulement du workshop


## 1 _ Utilisation des composants du téléphone

### Démontage

<img alt="Disassembling 1" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/0_callToMake_disassembling_1.jpg?raw=true" width="300">
<img alt="Disassembling 1" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/0_callToMake_disassembling_2.jpg?raw=true" width="300">


### Capture du signal du cadran

<img alt="Disassembling 1" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/1_callToMake_dialsignal_1.JPG?raw=true" width="300">

Le cadran est composé de deux interrupteurs qui ouvrent et ferment la ligne afin de donner différentes informations :

- L'interrupteur lié au circuit bleu se ferme lorsque l'on commence à composer un numéro et que l'on quitte la position initiale.

- L'interrupteur lié au circuit rouge fournit des impulsions lorsque le cadran est relaché en s'ouvrant et se refermant n fois en fonction du chiffre composé.

Il est donc possible à l'aide de ces deux signaux de récuperer via l'Arduino le numéro composé.

Mais le signal permettant de définir le numéro composé n'est pas net et donne un signal légèrement différent à chaque fois. Par exemple pour le "4", nous pouvions avoir :

- `010101011`
- `0110100011`

Nous avons donc récupéré le signal analogique pour l'analyser et compter uniquement ses changements d'état grâce à un `attachInterrupt`. Ce qui nous a permis d'ommettre les aléas du signal capté et de pouvoir compter le nombre de césures dans le signal.

[Code de test ici.](https://github.com/Jeremboo/callToMake/blob/master/0_TESTS/arduino/rotaryPhone/rotaryPhone.ino)

Au final, nous avons utilisé la librairie [RotoPhone](https://github.com/tournevis/rotoPhone) écrite par [Arthur Rob](https://github.com/tournevis) afin d'avoir un projet bien segmenté.

### Détection du décrochage/raccrochage

<img alt="RotatyPhone Schema" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/99_callToMake_schema.JPG?raw=true" width="300">

En regardant le schéma de cablage du téléphone et grâce à un script arduino & cablage simple, nous avons pu détecter deux points sur lesquels il était possible de se brancher pour utiliser le mécanisme du combiné comme un simple interrupteur.

Malheureusement, le changement d'état n'était pas net et produisait un signal avec des interférences telles que :

- `0000000000001100101011100111111111111111111`

Ce qui rend impossible l'utilisation de la fonction `attachInterrupt`. Il a donc fallu utiliser la méthode [debounce](https://www.arduino.cc/en/Tutorial/Debounce) afin d'être sûr qu'un changement d'état s'oppère réellement avant de le valider.

```
...
pinState = digitalRead(3);

if( lastPinState != pinState ) {
  lastPinState = pinState;
  _startTimePinChange = millis();
  _pickChanged = true;
}

if(_pickChanged){
  if(millis() - _startTimePinChange > 100){
    isPick = lastPinState;
    _pickChanged = false;
  }
}
return isPick;
...

```

Nous avons ensuite ajouté cette fonctionnalité à la librairie [RotoPhone](https://github.com/tournevis/rotoPhone) afin de la rendre compatible avec la capture du signal.

### Utilisation du combiné

#### Le haut parleur

Afin de tester le haut parleur du téléphone, nous avons dans un premier temps juste fait passer un courant alternatif dans celui-ci.

Le signal étant satisfaisant (bip continu suffisament audible), à l'aide du shield audio d'arduino, nous avons essayé de jouer une piste audio via le haut parleur. Et une fois les deux cables du combiné lié à une prise jack, nous avons pu tester le haut parleur directement lié à l'arduino.

Et le résultat était très satisfaisant ! Grâce à la prise jack, le combiné peut être branché à n'importe quel appareil produisant du son.

<img alt="Combiné avec prise jack" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/2_callToMake_usingMicrophone.JPG?raw=true" width="300">

De ce fait, nous avons décidé de garder le haut parleur de base du combiné pour notre projet.

#### Le micro

<img alt="Microphone du combiné" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/2_callToMake_usingMicrophone2.JPG?raw=true" width="300">

Après avoir branché le microphone en série à une pin analogique de l'arduino ([voir code ici](https://github.com/Jeremboo/callToMake/blob/master/0_TEST/arduino/microphone/microphone.ino)), nous avons pu visualiser le signal envoyé. Nous pouvons en conclure que le micro peut être utilisé même si un amplificateur doit sûrement être ajouté au montage.


<<<<<<< HEAD
## 2 _ Montage
=======

## 2 _ Création de l'application

 L'application Desktop à été faite avec [Electron](http://electron.atom.io/) afin d'avoir une application Mac OSX et [React](https://facebook.github.io/react/) pour les views.

 Celle-ci se connecte en web socket au serveur node.js intégré à notre Raspberry afin d'écouter les actions réalisées sur le téléphone. (voir le montage avec la raspberry).

 Pour ce qui est de la gestion du son du téléphone, la capture du son se fait via le module node.js [say.Js](https://github.com/marak/say.js/) qui est donc intégré à la rapsberry et qui convertit en texte ce que l'on dit et inversement.

 Il a donc été possible de jouer du texte écrit en son via l'enceinte du combiné.

 Malheureusement, pour ce qui est de microphone, nous n'avons pas eu le temps de le faire reconnaitre par la raspberry. Nous l'avons donc remplacé temporairement par le micro de l'ordinateur qui s'occupe de la capture avec le module google [SpeatchRecognition](https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API).

### Fonctionnalité de traduction :

La fonctionnalité de traduction utilise l'API de [MyMemory](https://mymemory.translated.net/fran%C3%A7ais/) pour traduire ce que l'on dit via le combiné dans la langue voulue avant de retourner le résultat au combiné après quelques secondes.

**TODO - mettre photo de la fonction**

### Fonctionnalité météo :

A l'aide de [http://forecast.io/](http://forecast.io/) nous avons pu ajouté la météo dans nos fonctionnalités

**TODO - mettre photo de la fonction**

### Fonctionnalité lancement de scripts :

Mise en veille, activation/désactivation de la wifi... Ces fonctionnalités sont des commandes exécutées par Electron.



## 3 _ Montage
>>>>>>> 33582fba7e7724cdb79f766b0a9d17e4c0c8834a

### Montage avec l'arduino

#### Cablage

Lors du cablage, il nous a fallu assembler le cablage du rotor ainsi que celui du combiné. Ceci a posé des problèmes d'interférences lors de l'utilisation du rotor. Lors de la composition d'un numéro, le signal du combiné était perturbé et indiquait donc que le combiné était raccroché/décroché plusieurs fois.

Il a donc fallu mettre le cablage du combiné en [INPUT_PULLUP](https://www.arduino.cc/en/Tutorial/InputPullupSerial) afin d'avoir deux cablages séparés.

<img alt="Arduino to RotaryPhone" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/4_callToMake_arduinoMontage.JPG?raw=true" width="500">

#### Données envoyées

Voici le [code téléversé dans l'arduino](https://github.com/Jeremboo/callToMake/blob/master/arduinoScript/rotaryPhone/rotaryPhone.ino). Celui-ci utilise la méthode `Serial.println()` afin d'envoyer des données au serveur. Voici les données envoyées au serveur :  

- 0 à 9 (Numérotation)
- 10 (Pick UP / Décroché)
- 20 (Hang UP / Raccroché)

### Montage avec la Raspberry

La carte Arduino est lié au Raspberry via USB qui elle-même est alimentée via un cable microUSB.

<img alt="Arduino to Raspberry" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/3_callToMake_ArduinoToRaspberry.JPG?raw=true" width="300">

Grâce au serveur `Node.js` intégré et à la librairie `SerialPort` il est possible d'écouté l'Arduino comme dit précedemment.

<<<<<<< HEAD
C'est grâce à ce serveur que l'application Descktop peut communiquer avec les fonctionnalités du téléphone via internet (cable ethernet OU clé wifi). Il a fallut faire un script de lancement pour que la raspberry puisse lancer automatiquement le serveur node.js.
=======
C'est grâce à ce serveur que l'application Desktop peut communiquer avec les fonctionnalités du téléphone via internet (cable ethernet OU clé wifi).
>>>>>>> 33582fba7e7724cdb79f766b0a9d17e4c0c8834a

Enfin, la raspberry contrôle aussi le combiné. Elle émet via la prise jack le son et capture le signal du microphone via les pins de la carte (l'Arduino n'étant pas assez puissante pour gèrer ces données).

Quelques problèmes rencontrés :

- `SerialPort` ne fonctionne pas avec `Node.js 4.0.0`. Il a fallu rétrograder à la version `0.12.6`.
- La carte SD de la raspberry n'ayant pas beaucoup de stockage, il a fallu supprimer la version graphique de rasbian et optimiser notre projet.


### Montage final

Afin de faire tenir l'arduino et la Raspberry dans la coque du téléphone, il a fallut déssouder les composants du téléphone inutile.

Nous avons aussi enlevé le cablage inutile afin de faire sortir uniquement du téléphone le cable USB et (potentiellement) le cable Ethernet de la Raspberry.

<img alt="Arduino to RotaryPhone" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/6_callToMake_arduinoMontage2.JPG?raw=true" width="500">


## 3 _ Création de l'application

 L'application Desktop à été faite avec [Electron](http://electron.atom.io/) afin d'avoir une application native IOS et [React](https://facebook.github.io/react/) pour les view.

 Celle-ci se connecte en web socket au serveur node.js intégré à notre Raspberry afin d'écouter les actions réalisées sur le téléphone. (voir le montage avec la raspberry).

 #### Gestion du son du téléphone

La capture du son se fait via le module node.js [say.Js](https://github.com/marak/say.js/) qui est donc intégré à la rapsberry et qui convertit en texte ce que l'on dit et inversement.

 Il a donc été possible de jouer du texte écrit en son via l'enceinte du combiné.

 Malheureusement, pour ce qui est de microphone, nous n'avons pas eu le temps de le faire reconnaitre par la raspberry. Nous l'avons donc remplacé temporairement par le micro de l'ordinateur qui s'occupe de la capture avec le module google [SpeatchRecognition](https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API).

### Fonctionnalité de traduction :

La fonctionnalitée de traduction utilise l'API de [MyMemory](https://mymemory.translated.net/fran%C3%A7ais/) pour traduire ce que l'on dit via le combiné dans la langue voulue avant de retourner le résultat au combiné après quelques secondes.

<img alt="Microphone du combiné" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/7_callToMake_utilisation2.JPG?raw=true" width="300">


### Fonctionnalité météo :

A l'aide de [http://forecast.io/](http://forecast.io/) nous avons pu ajouté la météo dans nos fonctionnalités

<img alt="Microphone du combiné" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/7_callToMake_utilisation3.JPG?raw=true" width="300">

### Fonctionnalités interragissant avec l'ordinateur :

Mise en veille, activation/desactivation de la wifi, ouverture des applications de l'ordinateur, capture d'écran...

 Ces fonctionnalités sont des `commandes shells` exécutées grâce à un serveur node.js en localhost lancée par l'application. L'application peut donc interragir avec l'ordinateur de cette façon.



## 4 _ Utilisation

Il suffit de brancher le cable USB et Ethernet du téléphone à l'ordinateur et de lancer l'application Desktop.

Ensuite, composer un numéro pour lancer une action de l'application et suivre les instructions.

<img alt="Utilisateur" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/7_callToMake_utilisation.JPG?raw=true" width="500">



## 5 _ Test utilisateur

Après quelques tests utilisateurs, il apparait que le concept est très bien accueilli. Ludique, pratique, chacun aurait aimé pouvoir s'approprier les fonctionnalitées et les personnalisers. Par exemple on nous a proposer d'ajouter des raccourcis pour les sites tel que facebook, tweeter... ou même de sortir du cadre de l'ordinateur et d'étendre les fonctionnalitées aux objects connectés.

Il manque cependant d'autres fonctionnalités utilisant le son ainsi que des fonction activables/désactivables avec le même bouton (par exemple la mise en veille de l'ordi qui ce rallume avec le même bouton).

Il manque aussi une interface claire et précise proposant de manipuler les fonctionnalitées et d'afficher les actions à réaliser plus clairement afin d'améliorer l'expérence utilisateur.
