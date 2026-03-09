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

---

## PART 2: Software configuration

We will use *Blink* as an example, but *BTCPay Server* also offers *Strike, Breez and Boltz* if you prefer another option.

### Step 1: Plugins — Installing *BitcoinSwitch* + *Blink*

1. Go to your *BTCPay Server* instance with an admin account

2. Create your first store

3. On the left-hand side of *BTCPay Server*, scroll to the bottom and go to *"Manage Plugins"*

![btcpay-plugins](/assets/13.webp)

4. We are going to install the *BitcoinSwitch* and *Blink* plugins

![btcpay-plugins](/assets/14.webp)

5. Scroll down the list of plugins and click *"Install"* for *BitcoinSwitch* and *Blink* (or the available wallet of your choice)

![btcpay-plugins](/assets/15.webp)

6. Once the installation is complete, restart *BTCPay Server* and wait 1 minute

![btcpay-plugins](/assets/16.webp)

7. Back in *"Manage Plugins"*, check that both plugins have been installed

![btcpay-plugins](/assets/17.webp)

### Step 2: Backend — *BTCPay Server + Blink* configuration

**1 - Create a *Blink* wallet**

- Visit https://www.blink.sv
- Create your account. Refer to the tutorial:

https://planb.academy/tutorials/wallet/mobile/blink-7ea5f5a4-e728-4ff9-b3f9-cf20aa6fc2bd

**2 - Generate a *Blink* API key**

- Access the API interface: **[https://www.blink.sv/en/api](https://www.blink.sv/en/api)** and log in with the same account

![blink-api](/assets/18.webp)

- Go to the *API Keys* tab

![blink-api](/assets/19.webp)

- Click *"+"* in the top right corner

![blink-api](/assets/20.webp)

- Give your API key a name and note it down — you will only see it once: `blink_mZ5KxxxxxxxxxxxxxNbmX`

![blink-api](/assets/21.webp)

- Once created, it appears in your active API keys list

![blink-api](/assets/22.webp)

**3 - Connect *Blink* to *BTCPay Server***

- Open your *BTCPay Server*
- Navigate to: *Wallet* **→** *Lightning*

![btcpay-server](/assets/23.webp)

- Click on *Use a custom node*
- Paste the following connection string:
```
type=blink;server=https://api.blink.sv/graphql;api-key=blink_mZ5KxxxxxxxxNbmX;wallet-id=0a3fc465-082xxxxxxxxxx-2545595d856f
```

**⚠️ Important:**

- Do not modify the first part: `type=blink;server=https://api.blink.sv/graphql`
- Replace only:
    - api-key= *with your Blink API key*
    - wallet-id= *with your Blink wallet ID*
- Click *Test connection*, then *Save*

![btcpay-server](/assets/24.webp)

- Check that the connection is established (green status)

![btcpay-server](/assets/25.webp)

**4 - Create a Point of Sale (PoS)**

- In BTCPay Server, go to the *Plugins* tab and click on *Point of sale*

![btcpay-server](/assets/26.webp)

- Give your PoS a name and click *Create*

![btcpay-server](/assets/27.webp)

- PoS configuration:
    - Style = *Print display*
    - Currency = *SATS*
    - Click *SAVE*

![btcpay-server](/assets/28.webp)

- Product configuration:
    - Delete all default products
    - Click *add item*

![btcpay-server](/assets/29.webp)

![btcpay-server](/assets/30.webp)

- Configure the product:
    - Title: *smoke-machine*
    - Price: *10 sats*
    - Bitcoin GPIO switch: 21
    - Bitcoin switch duration (ms): 5000
    - Click *Close* then *Save*

![btcpay-server](/assets/31.webp)


### Step 3: Firmware — Flashing the ESP32

**1 - Go to the flash site**

- Go to: [https://bitcoinswitch.lnbits.com/](https://bitcoinswitch.lnbits.com/)

![bitcoinswitch-lnbits](/assets/32.webp)

**2 - Flash the BitcoinSwitch firmware**

- Connect the ESP32 to your computer with your USB/Micro-USB cable
- Click on *Connect to Device*
- A window opens, select the USB port of your ESP32, then click *Connect*

![bitcoinswitch-lnbits](/assets/33.webp)

- Once your ESP32 is connected, flash the BitcoinSwitch firmware. In the *T-Display* section, click *Upload Firmware* for the latest version available (currently: *bitcoinSwitch T-Display v1.0.1*)

![bitcoinswitch-lnbits](/assets/34.webp)

- Wait for the upload to complete — the process is done when the logs show *"Leaving..."*

![bitcoinswitch-lnbits](/assets/35.webp)

- Unplug the ESP32

**3 - Verify the BitcoinSwitch firmware installation**

- Reload the page: [https://bitcoinswitch.lnbits.com/](https://bitcoinswitch.lnbits.com/)
- Reconnect the ESP32 to your computer
- Click *Connect to device*, select the USB port, then *Connect*
- Once connected, press the **RESET** button on the ESP32
- Check in the logs that the last lines show:
```
Welcome to BitcoinSwitch! (v1.0.1)
Config file does not exist.
Entering config mode. until we receive /config-done.
```

*(This is normal — it means there is no config yet, but the firmware has been installed)*

![bitcoinswitch-lnbits](/assets/36.webp)

**4 - Generate the WebSocket URL**

Expected final format:
```
wss://XXXXv/apps/46XXXXXXXXXXXXXXXXXXXXwFB/pos/bitcoinswitch
```

Generation steps:

- Open your BTCPay Server instance and go to the PoS created earlier
- Click *"View"* to open your PoS in the browser

![btcpay-server-https](/assets/37.webp)

- Copy the URL of the page:

![btcpay-server-https](/assets/38.webp)

Breaking down this URL:
```
https://XXXXv/apps/46XXXXXXXXXXXXXXXXXXXXwFB/pos
```

- `XXXXv` → the domain of your BTCPay Server instance
- `46XXXXXXXXXXXXXXXXXXXXwFB` → your PoS unique identifier
- `/pos` → indicates a Point of Sale

Transform it:

- Replace `https://` with `wss://`
- Add `/bitcoinswitch` at the end

Result:
```
wss://XXXXv/apps/46XXXXXXXXXXXXXXXXXXXXwFB/pos/bitcoinswitch
```

Keep this URL for the next configuration step — it allows your ESP32 to communicate in real time with BTCPay Server.

**5 - Configure WiFi and WebSocket**

- Return to: [https://bitcoinswitch.lnbits.com/](https://bitcoinswitch.lnbits.com/) with your ESP32 connected
- Go to *Configure Device* → *Wifi Settings*

Fill in:

- WiFi SSID: the name of your WiFi network
- WiFi Password: your WiFi password

![bitcoinswitch-lnbits](/assets/39.webp)

- In the *LNbits Device URL* section, paste the WebSocket URL created in the previous step
- Click *Upload config*

![bitcoinswitch-lnbits](/assets/40.webp)

- Wait for the upload to complete — the logs should display the parameters you just entered

![bitcoinswitch-lnbits](/assets/41.webp)

- Wait while the ESP32 establishes the WebSocket connection. You should see:
```
WiFi connection established!
[WebSocket] Connected to url: ...
```

![bitcoinswitch-lnbits](/assets/42.webp)

- You can now disconnect the ESP32

---

## Software Checkpoint

Before the final test, check:

- Blink connected to BTCPay
- PoS created with at least 1 product
- ESP32 flashed with BitcoinSwitch
- WiFi configured on ESP32
- WebSocket URL correct
- ESP32 logs error-free

---

## Testing and troubleshooting

### Complete final test

1. Plug in the smoke machine (220V) and switch it on
2. Power the ESP32 (battery or USB)
3. Open your BTCPay PoS in the browser
4. Select the *smoke-machine* product
5. Pay with a Lightning wallet (Blink or any other)
6. Observe:
    - Relay clicks (audible sound and relay LED lights up)
    - The smoke machine activates
    - Smoke generated!

### Problems and solutions

| **Problem** | **Probable cause** | **Solution** |
| --- | --- | --- |
| ESP32 does not connect | Missing USB driver | Install [CH340 drivers](https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers) |
| Relay does not click | Wrong GPIO wiring | Check GPIO 21 → IN |
| Smoke machine does not respond | Remote control improperly wired | Check NO/NC/COM |
| WebSocket timeout | Incorrect URL | Check wss:// and /bitcoinswitch |
| WiFi does not connect | SSID/Password incorrect | Re-flash WiFi config |
| Payment received but nothing happens | ESP32 not connected to WebSocket | Check RESET logs |

---

## Resources

### Useful links

- BitcoinSwitch Firmware: [https://bitcoinswitch.lnbits.com/](https://bitcoinswitch.lnbits.com/)
- BTCPay Server Docs: [https://docs.btcpayserver.org/](https://docs.btcpayserver.org/)
- Blink API: [https://dev.blink.sv/](https://dev.blink.sv/)
- ESP32 Pinout: [https://randomnerdtutorials.com/esp32-pinout-reference-gpios/](https://randomnerdtutorials.com/esp32-pinout-reference-gpios/)

### Community & Support

- BTCPay Server: [chat.btcpayserver.org](https://chat.btcpayserver.org/)
- BTCPay Server Telegram: [t.me/btcpayserver](https://t.me/btcpayserver)
- LNbits: [t.me/lnbits](https://t.me/lnbits)
- BitcoinSwitch (firmware bugs): [github.com/lnbits/bitcoinswitch/issues](https://github.com/lnbits/bitcoinswitch/issues)

### Source code

- BitcoinSwitch firmware: [https://github.com/lnbits/bitcoinswitch](https://github.com/lnbits/bitcoinswitch)

---

**⚡ Stack sats, make smoke, have fun, stay humble! ⚡**
