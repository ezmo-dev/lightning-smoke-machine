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



