# ⚡ Lightning Smoke Machine

→ Trigger a smoke machine with a Bitcoin Lightning payment built with an ESP32, BTCPay Server + Blink, and BitcoinSwitch.

![cover](./assets/cover.webp)

- **Level:** Intermediate
- **Estimated time:** 2-3 hours
- **Use cases:** Bitcoin events, artistic performances, Lightning demos, automated stage effects

## Tutorial

| Language | Link |
|---|---|
| 🇫🇷 Français | [docs/tutorial.md](./docs/tutorial.md) |
| 🇬🇧 English | *coming soon* |

## How it works

1. A Lightning invoice is displayed on screen
2. The payment is detected by BTCPay Server + Blink
3. A WebSocket triggers the ESP32 via BitcoinSwitch
4. The ESP32 activates a relay connected to the smoke machine

## Hardware

**Electronic components**
- ESP32-WROOM-32 microcontroller
- 5V relay module with optocoupler
- 220V fog machine with 12V battery remote control
- Dupont cables: Male/Male and Male/Female
- 5V USB power supply or Li-Po battery
- Micro-USB cable
- Smoke machine liquid

**Tools**
- Soldering iron + tin (or Dupont connectors)
- Screwdriver
- Multimeter (recommended)

## Built with

- [BitcoinSwitch](https://bitcoinswitch.lnbits.com/) — ESP32 firmware flasher by [@arcbtc](https://github.com/arcbtc) & [@dni](https://github.com/dni)
- [BTCPay Server](https://btcpayserver.org/)
- [Blink](https://blink.sv/)
- Chrome / Edge / Brave (WebSerial required for flashing)

## ⚠️ Safety

This project involves a **220V mains supply** and a **12V battery remote control**.
Always disconnect the smoke machine from the mains **and** remove the battery from the remote control before opening it or handling the wiring.
Read the full safety section in the [tutorial](./docs/tutorial.md) before starting.

## License

MIT © 2026 Ezmo
