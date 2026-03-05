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

---

## PART 1: Hardware assembly

### Step 1: Preparing the remote control

Objective: Connect the relay to the ON/OFF button on the remote control

1. Open the remote control
    - Identify the ON/OFF button
    - Unscrew the case to open the remote control

2. Locate the connections
    - Locate the + and - terminals of the button
    - Test continuity with a multimeter (optional)

<img src="/assets/8.webp" width="600">

3. Button wiring (solder or connectors)
    - Solder a black cable to the - terminal of the button
    - Solder a red cable to the common + terminal

<img src="/assets/9.webp" width="400">

### Step 2: Connecting to the relay module

**Relay terminology**

| **Terminal**         | **Description**            | **Function**                        |
| -------------------- | -------------------------- | ----------------------------------- |
| NO (Normally Open)   | Circuit open by default    | Closes when the relay is activated  |
| NC (Normally Closed) | Circuit closed by default  | Opens when the relay is activated   |
| COM (Common)         | Central terminal           | Switches between NO and NC          |

**Wiring from remote control to relay module:**

- Black wire from ON/OFF button **→** NO (Normally Open)
- Red wire (common) **→** COM (Common)

**Logic:**

When the ESP32 activates the relay, it connects COM and NO, which is exactly the same as pressing the remote control button.

When the ESP32 cuts the relay, COM and NO separate, which is equivalent to releasing the button.

![remote-relay](/assets/10.webp)

### Step 3: Connecting the ESP32 to the relay module

**Wiring diagram:**

| **ESP32** | **→** | **Relay Module** |
| --------- | ----- | ---------------- |
| V5 (5V)   | **→** | VCC              |
| GND       | **→** | GND              |
| GPIO 21   | **→** | IN (Input)       |

**Verification:**

- VCC and GND well connected (polarity respected)
- GPIO 21 used for control signal
- No visible short circuit

![relay-esp32](/assets/11.webp)

**Hardware Checkpoint**

Before moving on to the software, check:

- Remote control correctly wired
- Relay module connected to ESP32
- No bare wires touching other components
- 220V always disconnected

![relay-esp32](/assets/12.webp)
