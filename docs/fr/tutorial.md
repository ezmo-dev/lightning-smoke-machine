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
