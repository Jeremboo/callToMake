# CallToMake

Reappropriation of a rotary phone with the aid of an Arduino through a workshop at Gobelin, l'école de l'image.

By [Mathis Biabiany](https://github.com/mats31) and [Jérémie Boulay](www.jeremieboulay.fr).

## Our Project

Nous souhaitons redonner vie à un téléphone à cadran en détournant ses anciennes fonctionnalitées pour leur en donner de nouvelles plus dans l'air du temps.

Notre but est de pouvoir connecter notre téléphone à une application logiciel afin d'associer un numéro du téléphone à l'un des services proposés par l'application.

Par exemple, il serra possible d'associer le numéro "4" du téléphone à une action spécifique tel que "activer/desactiver le wifi".

[Fiche produit](https://github.com/mats31) et [Mode d'emploi](https://github.com/mats31).

[](https://github.com/mats31)

## Schema du workflow

<img alt="UML" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/UML.jpg?raw=true">

## Schema du montage

<img alt="Schema de montage" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/schemaMontage.jpg?raw=true">


# Déroulement du workshop

## 1 _ Utilisation des composants du téléphone

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

[Code de test ici.](https://github.com/Jeremboo/callToMake/blob/master/arduinoScript/tests/rotaryPhone/rotaryPhone.ino)

Au final, nous avons utilisé la librairie [RotoPhone](https://github.com/tournevis/rotoPhone) écrite par [Arthur Rob](https://github.com/tournevis) afin d'avoir un projet bien segmenté.

### Détection du décrochage/raccrochage

<img alt="RotatyPhone Schema" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/99_callToMake_schema.JPG?raw=true" width="300">

En regardant le schéma de cablage du téléphone et grâce à un script arduino & cablage simple, nous avons pu détecter deux points auquels il était possible de se brancher pour utiliser le mécanisme du combiné comme un simple interrupteur.

Malheureusement, le changement d'état n'était pas net et produisait un signal avec des intterférences tel que :

- `0000000000001100101011100111111111111111111`

Ce qui rend impossible l'utilisation de la fonction `attachInterrupt`. Il a donc fallut utiliser la méthode [debounce](https://www.arduino.cc/en/Tutorial/Debounce) afin d'être sur qu'un changement d'état s'oppère réellement avant de le valider.

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

Nous avons ensuite ajouté cette fonctionnalitée à la librairie [RotoPhone](https://github.com/tournevis/rotoPhone) afin de la rendre compatible avec la capture du signal.

### Utilisation du combiné

#### Le haut parleur

Afin de tester le haut parleur du téléphone, nous avons dans un premier temps juste fait passer un courant alternatif dans celui-ci.

Le signal étant satisfaisant (bip continu suffisament audible), à l'aide du shield audio d'arduino, nous avons essayé de jouer une piste audio via le haut parleur. Et une fois les deux cables du combiné lié à une prise jack, nous avons pu tester le haut parleur directement lié à l'arduino.

Et le résultat était très satisfaisant ! Grâce à la prise jack, le combiné peut être branché à n'importe quel appareil produisant du son.

<img alt="Combiné avec prise jack" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/2_callToMake_usingMicrophone.JPG?raw=true" width="300">

De ce fait, nous avons décidé de garder le haut parleur de base du combiné pour notre projet.

#### Le micro

<img alt="Microphone du combiné" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/2_callToMake_usingMicrophone2.JPG?raw=true" width="300">

Après avoir branché le microphone en série à une pin analogique de l'arduino ([voir code ici](https://github.com/Jeremboo/callToMake/blob/master/arduinoScript/tests/microphoneTest/microphoneTest.ino)), nous avons pu visualiser le signal envoyé. Nous pouvons en conclure que le micro peu être utilisé même si un amplificateur doit surement être ajouté au montage.


## 2 _ Montage

### Montage avec l'arduino

#### Cablage

Lors du cablage, il nous a fallu assembler le cablage du rotor ainsi que celui du combiné. Ceci a posé des problèmes d'interférences lors de l'utilisation du rotor. Lors de la composition d'un numéro, le signal du combiné était perturbé et indiquait donc que le combiné était raccroché/décroché plusieurs fois.

Il a donc fallu mettre le cablage du combiné en [INPUT_PULLUP](https://www.arduino.cc/en/Tutorial/InputPullupSerial) afin d'avoir deux cablages séparés.

<img alt="Arduino to RotaryPhone" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/3_callToMake_arduinoMontage.JPG?raw=true" width="500">

#### Données envoyées

Voici le [code téléversé dans l'arduino](https://github.com/Jeremboo/callToMake/blob/master/arduinoScript/rotaryPhone/rotaryPhone.ino). Celui-ci utilise la méthode `Serial.write()` afin d'envoyer des données au serveur. Voici les données envoyées au serveur :  

**TODO : expliquer les données envoyé au serveur.**

- Numérotation : 0 à 9
- PickUp : 10
- HangUp : 20

### Montage avec la Raspberry

La carte Arduino est lié au Raspberry via USB qui elle-même est alimentée via un cable microUSB.

<img alt="Arduino to Raspberry" src="https://github.com/Jeremboo/callToMake/blob/master/0_ASSETS/photos/3_callToMake_ArduinoToRaspberry.JPG?raw=true" width="300">

Grâce au serveur `Node.js` intégré et à la librairie `SerialPort` il est possible d'écouté l'Arduino comme dit précedemment.

Cet enssemble représente le téléphone qui est indépendant de l'ordinateur grace à une clé Wifi branchée sur la Raspberry PI lui permettant de s'y connecter via SSH.

**TODO : expliquer la suite.**


## 3 _ Création de l'application

## 4 _ Connection et dialogue de l'enssemble :

## 5 _ Test utilisateur
