---
name: Lightning Smoke Machine
description: Déclenchez une machine à fumée avec un paiement Lightning via ESP32.
---

![cover-lightning-smoke-machine](/assets/cover.webp)

## Introduction

Transforme une machine à fumée classique en dispositif payable en Bitcoin via Lightning Network. Chaque paiement déclenche automatiquement un jet de fumée !

- Niveau : Intermédiaire
- Temps estimé : 2-3 heures
- Cas d'usage : Événements Bitcoin, performances artistiques, démos Lightning, effets scéniques automatisés

## Prérequis

### Connaissances

 - Bases en électronique (câblage, relais)
 - Soudure (ou utilisation de connecteurs Dupont)
 - Notions de configuration réseau (WiFi, WebSocket)

### Comptes nécessaires

- BTCPay Server : Instance fonctionnelle (self-hosted ou hébergée)
- Blink Wallet : Compte + accès API

### Accès

- Accès admin à BTCPay Server
- Connexion WiFi pour l'ESP32

## Matériel nécessaire

### Hardware - Composants électroniques 

- 1 Microcontrôleur - ESP32-WROOM-32 
*L'ESP32-WROOM-32 est un microcontrôleur WiFi/Bluetooth compact et peu coûteux qui permet de connecter des appareils électroniques à Internet et de les contrôler à distance.*

![ESP32](/assets/1.webp)

- 1 Module relais - 5V avec optocoupleur
*Un relais, c'est comme un interrupteur que l'ESP32 peut actionner pour allumer ou éteindre la machine à fumée.*

![relay](/assets/2.webp)

- ~10 Câbles Dupont - Mâle/Mâle et Mâle/Female

![dupont-cables](/assets/3.webp)

- 1 Alimentation pour l'ESP32 - 5V USB ou batterie Li-Po

![battery](/assets/4.webp)

- 1 Cable micro-USB - connexion entre l'ESP32 et son alimentation

![micro-usb-cables](/assets/5.webp)

- 1 Machine à fumée 220V avec télécommande à pile 12V

![remote-and-smoke-machine](/assets/6.webp)

- 1 bouteille de liquide compatible avec votre machine à fumée

### Hardware - Outils 

- Fer à souder + étain (si soudure)
- Tournevis
- Multimètre (recommandé)

### Logiciels

- Firmware BitcoinSwitch : **[https://bitcoinswitch.lnbits.com/](https://bitcoinswitch.lnbits.com/)**
- Navigateur web compatible WebSerial (Chrome/Edge/Brave)
- BTCPay Server configuré. Pour plus d'informations sur la création d'une instance BTCPay Server, rendez-vous sur ce tutoriel : https://planb.academy/fr/tutorials/business/point-of-sale/btcpay-server-928eb01e-824b-4b57-a3e8-8727633beddc

## Architecture du système

![architecture-lightning-smoke-machine](/assets/7.webp)

---


**⚠️** **AVERTISSEMENT SÉCURITÉ - LIRE AVANT DE CONTINUER** **⚠️** 

Ce projet implique une machine à fumée branchée sur **secteur 220V**. Une erreur de manipulation peut provoquer une **électrocution mortelle** ou un **incendie**.

**Règles non négociables :**

1. **Débranchez TOUJOURS la machine à fumée du secteur** avant d'ouvrir la télécommande ou de toucher au câblage
2. **Retirez la pile de la télécommande** avant toute manipulation (risque de court-circuit et de dommage aux composants)
3. **Vérifiez l'isolation de toutes vos connexions** avant de rebrancher quoi que ce soit
4. **Ne rebranchez jamais le 220V** tant que le boîtier de la télécommande n'est pas refermé et sécurisé

Si vous n'êtes pas à l'aise avec ces manipulations, faites-vous accompagner par quelqu'un qui a l'expérience.

---

## PARTIE 1 : Montage Hardware

### Étape 1 : Préparation de la télécommande

Objectif : Connecter le relais au bouton ON/OFF de la télécommande
1. Ouvrir la télécommande 
    - Identifier le bouton ON/OFF
    - Dévisser le boîtier pour ouvrir la télécommande 
2. Repérer les connexions
	- Localisez les bornes + et - du bouton 
	- Testez la continuité au multimètre (optionnel)

![smoke-machine-remote](/assets/8.webp)

3. Câblage du bouton (soudure ou connecteurs)
    - Souder un câble noir sur la borne - du bouton
    - Souder un câble rouge sur la borne + commune

![smoke-machine-remote](/assets/9.webp)

### Étape 2 : Connexion au module relais

**Rappel : Terminologie du relais**

| **Terminal**         | **Description**           | **Fonction**                        |
| -------------------- | ------------------------- | ----------------------------------- |
| NO (Normally Open)   | Circuit ouvert par défaut | Se ferme quand le relais est activé |
| NC (Normally Closed) | Circuit fermé par défaut  | S'ouvre quand le relais est activé  |
| COM (Common)         | Terminal central          | Bascule entre NO et NC              |

**Câblage de la télécommande vers le module relais :**
- Fil noir du bouton ON/OFF **→** NO (Normally Open)
- Fil rouge (commun) **→** COM (Common)

**Logique :** 
Quand l'ESP32 active le relais, il relie COM et NO, ça revient exactement à appuyer sur le bouton de la télécommande. 
Quand l'ESP32 coupe le relais, COM et NO se séparent, ça revient à relâcher le bouton. 

![remote-relay](/assets/10.webp)

### Étape 3 : Connexion de l'ESP32 au module relais

**Schéma de câblage :**

| **ESP32** | **→** | **Module relais** |
| --------- | ----- | ----------------- |
| V5 (5V)   | **→** | VCC               |
| GND       | **→** | GND               |
| GPIO 21   | **→** | IN (Input)        |

**Vérification :**
- VCC et GND bien connectés (polarité)
- GPIO 21 utilisé pour le signal de commande 
- Pas de court-circuit visible 

![relay-esp32](/assets/11.webp)

**Checkpoint Hardware**

Avant de passer au logiciel, vérifiez : 
- Télécommande câblée correctement 
- Module relais connecté à l'ESP32
- Pas de fils dénudés touchant d'autres composants
- 220V toujours débranchés

![relay-esp32](/assets/12.webp)


---


## PARTIE 2 : Configuration Logicielle

Nous prendrons *Blink* comme exemple, mais *BTCPay Server* propose également *Strike, Breez et Boltz* si vous préférez une autre option. 

### Étape 1 : Plugins, Installation *BitcoinSwitch* + *Blink

1 - Rendez-vous sur votre instance *BTCPay Server* avec un compte admin

2 - Créer votre premier store

3 - Dans la partie gauche de *BTCPay Server*, faire défiler jusqu'en bas et aller dans *"Manage Plugins"*

![btcpay-plugins](/assets/13.webp)

4 - Nous allons installer le plugins *BitcoinSwitch* ainsi que *Blink* 

![btcpay-plugins](/assets/14.webp)

5 - Faire dérouler la liste des plugins et cliquer sur *"Install"* : *BitcoinSwitch et Blink* (ou le wallet disponible de votre choix)

![btcpay-plugins](/assets/15.webp)

6 - Une fois l'installation faite, redémarrer *BTCPay Server* et attendre 1 minute que l'instance redémarre

![btcpay-plugins](/assets/16.webp)

7 - Lorsque vous retournez dans *"Manage plugins"*, vérifiez que les deux plugins ont bien été installés

![btcpay-plugins](/assets/17.webp)

### Étape 2 : Backend : Configuration *BTCPay Server + Blink*

**1 - Créer un wallet *Blink***
- Rendez-vous sur https://www.blink.sv
- Créez votre compte. Pour ça, vous pouvez vous référer au tutoriel : 

[https://planb.academy/tutorials/wallet/mobile/blink-7ea5f5a4-e728-4ff9-b3f9-cf20aa6fc2bd)

**2 - Générer un clé API *Blink***
- Accédez à l'interface API : **[https://www.blink.sv/en/api](https://www.blink.sv/en/api)** et connectez vous avec le même compte que lors de la création de votre wallet *Blink*

![blink-api](/assets/18.webp)
   
   - Une fois connecté, aller dans l'onglet *API Keys* 

![blink-api](/assets/19.webp)
   
   - Cliquez sur *" + "* en haut à droite pour accéder à la configuration de votre API Key

![blink-api](/assets/20.webp)
   
   - Donnez un nom à votre API Key et laissez les paramètres par défaut. Puis, à la troisième étape notez précieusement votre API Key, vous ne la verrez qu'une seule fois : `blink_mZ5KxxxxxxxxxxxxxxxNbmX` 

  ![blink-api](/assets/21.webp)

   - Une fois créée, vous devez la voir apparaître dans votre liste d'API Key active. 

![blink-api](/assets/22.webp)

**3 - Connecter *Blink* à *BTCPay Server***
- Ouvrez votre *BTCPay Server*
- Naviguez vers : *Wallet* **→** *Lightning*

![btcpay-server](/assets/23.webp)

- Cliquez sur *Use a custom node*
- Collez la chaîne de connexion suivante : 


```
type=blink;server=https://api.blink.sv/graphql;api-key=blink_mZ5KxxxxxxxxNbmX;wallet-id=0a3fc465-082xxxxxxxxxx-2545595d856f
```


**⚠️** **Important** : 
- Ne modifiez pas la première partie : `type=blink;server=https://api.blink.sv/graphql`;
- Remplacez uniquement : 
    - api-key= *par votre clé API Blink*
    - wallet-id= *par votre ID de wallet Blink*
- Cliquez ensuite sur *Test connexion*, puis sur *Save*

![btcpay-server](/assets/24.webp)
 
 - Vérifiez que la connexion est établie (statut vert)

![btcpay-server](/assets/25.webp)

**4 - Créer un Point of Sale (PoS)**
- Dans BTCPay Server, allez dans l'onglet *Plugins* et cliquez sur *Point of sale*

![btcpay-server](/assets/26.webp)

- Donner un nom à votre PoS et cliquer sur *Create*

![btcpay-server](/assets/27.webp)

- Configuration du PoS :
    - Choose a point of sale style = *Print display*
    - Currency = *SATS*
    - Cliquez sur *SAVE*
  
![btcpay-server](/assets/28.webp)

- Configuration du produit :
    - Supprimer tous les produit présents par défaut
    - Cliquez ensuite sur *add item*

![btcpay-server](/assets/29.webp)

![btcpay-server](/assets/30.webp)

- Configurez le produit : 
    - Title : *smoke-machine*
    - Price : *10 sats*
    - Bitcoin switch GPIO : 21
    - Bitcoin switch duration (en millisecondes) : 5000
    - Cliquez sur *Close* puis sur *Save* pour enregistrer le nouveau produit

![btcpay-server](/assets/31.webp)


