---
name: Lightning Smoke Machine
description: Trigger a smoke machine with a Lightning payment via ESP32.
---

![cover-lightning-smoke-machine](/assets/cover.webp)
*⚡ Real test on the main stage at Plan ₿ Forum, San Salvador 2025*

## Introduction


Transforms a classic smoke machine into a device payable in Bitcoin via Lightning Network. Each payment automatically triggers a jet of smoke!



- Level: Intermediate
- Estimated time: 2-3 hours
- Use cases: Bitcoin events, artistic performances, Lightning demos, automated stage effects


## Prerequisites


### Knowledge



 - Basic electronics (wiring, relays)
 - Welding (or use of Dupont connectors)
 - Network configuration (WiFi, WebSocket)


### Accounts required



- BTCPay Server: Functional instance (self-hosted or hosted)
- Blink Wallet : Account + access API


### Access



- Admin access to BTCPay Server
- WiFi connection for ESP32

## Materials required

### Hardware - Electronic components

- 1 Microcontroller - ESP32-WROOM-32

*The ESP32-WROOM-32 is a compact, low-cost WiFi/Bluetooth microcontroller for connecting electronic devices to the Internet and controlling them remotely.*

<img src="/assets/1.webp" width="400">

- 1 Relay module - 5V with optocoupler

*A relay is like a switch that the ESP32 can operate to turn the smoke machine on or off.*

<img src="/assets/2.webp" width="400">

- ~10 Dupont cables - Male/Male and Male/Female

<img src="/assets/3.webp" width="400">

- 1 Power supply for ESP32 - 5V USB or Li-Po battery

<img src="/assets/4.webp" width="400">

- 1 Micro-USB cable - connection between ESP32 and power supply

<img src="/assets/5.webp" width="400">

- 1 220V fog machine with 12V battery remote control

<img src="/assets/6.webp" width="400">

- 1 bottle of liquid compatible with your smoke machine

### Hardware - Tools

- Soldering iron + tin (if soldering)
- Screwdriver
- Multimeter (recommended)

### Software

- BitcoinSwitch Firmware: **[https://bitcoinswitch.lnbits.com/](https://bitcoinswitch.lnbits.com/)**
- WebSerial-compatible web browser (Chrome/Edge/Brave)
- BTCPay Server configured. For more information on creating a BTCPay Server instance, visit: https://planb.academy/fr/tutorials/business/point-of-sale/btcpay-server-928eb01e-824b-4b57-a3e8-8727633beddc

## System architecture

![architecture-lightning-smoke-machine](/assets/7.webp)

---

**⚠️** **SAFETY WARNING - READ BEFORE CONTINUING** **⚠️**

This project involves a fog machine connected to a **220V mains supply**. Improper operation can result in **fatal electrocution** or **fire**.

**Non-negotiable rules:**

1. **ALWAYS disconnect the smoke machine from the mains** before opening the remote control or handling the wiring
2. **Remove the 12V battery from the remote control** before any handling (risk of short-circuit and damage to components)
3. **Check that all your connections are isolated** before reconnecting anything
4. **Never reconnect the 220V** until the remote control box has been closed and secured

If you are not comfortable with this kind of handling, ask someone with experience to help you.
