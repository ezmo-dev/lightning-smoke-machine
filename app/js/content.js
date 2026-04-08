/* content.js — step content data for all 16 tutorial steps */
/* Steps 01 and 02 (language + pseudonym) are auto-completed by the app flow */
/* Screen 4 content starts at step 03 */

const STEPS_CONTENT = [
  null, // index 0 unused — steps are 1-indexed
  null, // step 01 — auto-completed on language select
  null, // step 02 — auto-completed on pseudonym entry

  /* ── Step 03 ── Introduction */
  {
    title: 'Introduction',
    html: `
      <h1>How does it work?</h1>
      <p>This project transforms a classic smoke machine into a device payable in Bitcoin via Lightning Network. Each payment automatically triggers a jet of smoke!</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/cover.webp" alt="Lightning Smoke Machine demo" />
      </div>
      <p><em>Real test on the main stage at Plan B Forum, San Salvador 2025</em></p>
      <h2>System architecture</h2>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/7.webp" alt="System architecture diagram" />
      </div>
      <p>The system chain:</p>
      <ol>
        <li>A customer pays a Lightning invoice via BTCPay Server</li>
        <li>BTCPay Server sends a WebSocket event to the ESP32</li>
        <li>The ESP32 activates the relay for a set duration</li>
        <li>The relay triggers the remote control button of the fog machine</li>
        <li>Smoke!</li>
      </ol>
    `
  },

  /* ── Step 04 ── Materials */
  {
    title: 'Materials required',
    html: `
      <h1>What you'll need</h1>
      <h2>Electronic components</h2>
      <p><strong>1 x Microcontroller — ESP32-WROOM-32</strong></p>
      <p>A compact, low-cost WiFi/Bluetooth microcontroller for connecting electronic devices to the Internet and controlling them remotely.</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/1.webp" alt="ESP32-WROOM-32" />
      </div>
      <p><strong>1 x Relay module — 5V with optocoupler</strong></p>
      <p>A relay is like a switch that the ESP32 can operate to turn the smoke machine on or off.</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/2.webp" alt="Relay module" />
      </div>
      <p><strong>~10 x Dupont cables — Male/Male and Male/Female</strong></p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/3.webp" alt="Dupont cables" />
      </div>
      <p><strong>1 x Power supply for ESP32 — 5V USB or Li-Po battery</strong></p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/4.webp" alt="Power supply" />
      </div>
      <p><strong>1 x Micro-USB cable</strong> — connection between ESP32 and power supply</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/5.webp" alt="Micro-USB cable" />
      </div>
      <p><strong>1 x 220V fog machine with 12V battery remote control</strong></p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/6.webp" alt="Fog machine" />
      </div>
      <p><strong>1 x Bottle of liquid</strong> compatible with your smoke machine</p>

      <h2>Shopping list</h2>
      <table>
        <thead>
          <tr><th>Components</th><th>Shopping link</th><th>Price</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>ESP32-WROOM-32</td>
            <td><a href="https://www.amazon.fr/dp/B071P98VTG?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1" target="_blank" rel="noopener noreferrer">Amazon FR</a></td>
            <td>11,99€</td>
          </tr>
          <tr>
            <td>Relay module</td>
            <td><a href="https://www.amazon.fr/DollaTek-Module-Blindage-optocoupleur-déclencheurs/dp/B07DJ4NRC1/ref=sr_1_6?__mk_fr_FR=ÅMÅŽÕÑ&crid=30DYQFAX3DDX&dib=eyJ2IjoiMSJ9.IR9JINjvav3UgOQ4RjMXMBqqj6Xtut-1V72dzeyXD9ErX6IHjq_hZjQo-XwIaYODkrYjatKYz_Lupr9w_zpVjuCpV7NigHtneD6Io0v4Tq3DfaaqgHSGv7nUkI5c9XC1KN1gtOWuflQJY50JzodGnwckowrCK2Oq9mrFOE1zkIHpMMYNZD6PkgixtXR3SJDgLR37-4HTn2V70mZN4-2CrTH9HFLzu8jIk2A4921zSjUrCMPfjqZHYZnF2aFRhv_CFFNsDCRO3rqz1m3UYliN70aOfx5mb4zAy6IGUfh6RGU.ZnagbLih0Lq9tnIDfRMdTEK1EhfweD6i29EkxnZ0Ee0&dib_tag=se&keywords=Module+Relais+1+Canal%2C+5V+1+Channel+Relay+Module+avec+Optocoupleur&qid=1774344293&s=industrial&sprefix=%2Cindustrial%2C599&sr=1-6" target="_blank" rel="noopener noreferrer">Amazon FR</a></td>
            <td>4,99€</td>
          </tr>
          <tr>
            <td>Dupont cables</td>
            <td><a href="https://www.amazon.fr/FACAIIO-câbles-démarrage-platine-dexpérimentation/dp/B0G4VMCD3J/ref=sr_1_7?__mk_fr_FR=ÅMÅŽÕÑ&crid=3VO2GTQLTMWT1&dib=eyJ2IjoiMSJ9.3jFUDx4E3EmYF6UGOpgDbNGJj8LCDG3WCdg3slBQNGyR8PcdXiSwp6sKUQd0ktOH88_xpzhwFioktOyruD2cy2Ii529QmWP92d4L2WcRxh31Db3J_-KgjaFVCbXh-zRhbj1aaak8mLPalakcFS7H0_9VkGa7csynin2vLOUp8DeOxyhPHt8pN8YbEO4fPx80SNM9leau_T3vm-HJnRprqW3otNqbdSHaHWatrCrz7JmoU0SOWZS-q6J-kiI5uq95KJPUGdFIyGeeqAQXx3SZs-O5t5SheAYaK1KITKDAKFY.9WeZLrTH9jRgDZkefsqAf1oTnHUct5akwGFvr0Z2pfA&dib_tag=se&keywords=dupont+cable+male%2Fmale+male%2Ffemelle&qid=1774344513&s=industrial&sprefix=dupont+cable+male%2Fmale+male%2Ffeme%2Cindustrial%2C501&sr=1-7" target="_blank" rel="noopener noreferrer">Amazon FR</a></td>
            <td>6,64€</td>
          </tr>
          <tr>
            <td>Power supply**</td>
            <td><a href="https://www.amazon.fr/Intenso-Powerbank-Batterie-Compatible-Smartphone/dp/B07Z6N28RD/ref=sr_1_6?__mk_fr_FR=ÅMÅŽÕÑ&crid=WOUNF41WBYVT&dib=eyJ2IjoiMSJ9.zRApVQiF0NNa0KCj5fBewUFrmNt3B33I5i51pnj_XJ73sh0NAXdQXW3bBGcIA-cXSu2LQC-UHqcEGVYZdMAX3OqvBg3FiXtCretU8UZ8ZCv91kkEZuf4UONSe1pG98WfSxvxz8fmgmyQbrGsVXgcPa58bMFACez6QbQYbRIs48-i_2E9QpHgXEJOAxFCoIbXR4Ydqfm5d9hxuy0xm3eFv3ZYp7vTZOWaP-de5QNZdNmqPrjRZt6wVIaB_Zxt6b1u7rbNmf-XZVqYkMI9j6gImH68QaRzwzeWtfGbX2SmZUY.pQg6DUsaQyZlTnD4fP7RdjUxETA1MAhqY1UjvBuv0ag&dib_tag=se&keywords=5V%2F2A%2Bpower%2Bbank%2Bwith%2B5000mAh&qid=1774344955&s=electronics&sprefix=power%2Bbank%2B5v%2Celectronics%2C710&sr=1-6&th=1" target="_blank" rel="noopener noreferrer">Amazon FR</a></td>
            <td>16,05€</td>
          </tr>
          <tr>
            <td>Micro-USB DATA Cable</td>
            <td><a href="https://www.amazon.fr/Amazon-Kindle-Micro-Cable-Transfer/dp/B002VGRKKY/ref=sr_1_10?__mk_fr_FR=ÅMÅŽÕÑ&crid=3ODUFRJQNWK4Q&dib=eyJ2IjoiMSJ9.Wnz4Ir_Ecv8_YMyf7A1Bg7TuYrCYff3Dj1ag5DHwQYW46SvLZMXySbeHMmZPK3HxCCR_au8qzGeTZET1G9nCMIHYj8-yNJGtPLCwkewV6ikVgkYH6TGOdsSI1nmCWhO3u-7P3mbdYrQ2pkifUTAn4Y3ctVVWFaAu3byET_YiNTmVp8eh3f3W3PPCSvLpqmFL3dzK6moNJeRV6vuUPgdsAbWojoHzUUCQkQlKqnJ5KaxV2CEQCTKYNCF3Vprjfs384HZCz99ONyt5o11BFqpXadYb0Zxu4HminPvOHGm2H7U.jAF5-H4IwylLr0i6SLofBSDRY6v1wGL0nZQCFUiyBAY&dib_tag=se&keywords=micro+usb+data&qid=1774345156&sprefix=micro+usb+da%2Caps%2C535&sr=8-10" target="_blank" rel="noopener noreferrer">Amazon FR</a></td>
            <td>4,69€</td>
          </tr>
          <tr>
            <td>Smoke machine + Liquid</td>
            <td><a href="https://www.amazon.fr/dp/B0CK8M7KBD?ref_=ppx_hzsearch_conn_dt_b_fed_asin_title_6&th=1" target="_blank" rel="noopener noreferrer">Amazon FR</a></td>
            <td>37,90€</td>
          </tr>
          <tr>
            <td><strong>TOTAL</strong></td>
            <td></td>
            <td><strong>82,26€</strong></td>
          </tr>
        </tbody>
      </table>
      <p><em>*Prices and availability may change. If something looks wrong or a link is broken, let us know and we will fix it!</em></p>
      <p><em>**Power supply: any 5V USB power bank with 5000mAh or more will work. For short demos (a few hours), any brand is fine. If your ESP32 loses power after a few seconds, your power bank's auto-shutoff may be too aggressive — try a different one or keep a phone connected to the second USB port to keep the current high enough.</em></p>

      <h2>Tools</h2>
      <ul>
        <li>Soldering iron + tin (if soldering)</li>
        <li>Screwdriver</li>
        <li>Multimeter (recommended)</li>
      </ul>
      <h2>Software</h2>
      <ul>
        <li>BitcoinSwitch Firmware: <strong><a href="https://bitcoinswitch.lnbits.com" target="_blank" rel="noopener noreferrer">bitcoinswitch.lnbits.com</a></strong></li>
        <li>WebSerial-compatible web browser (Chrome / Edge / Brave)</li>
        <li>BTCPay Server configured</li>
      </ul>
    `
  },

  /* ── Step 05 ── Hardware: Preparing the remote control */
  {
    title: 'Hardware — Preparing the remote control',
    html: `
      <h1>Step 1: Preparing the remote control</h1>
      <p><strong>Objective:</strong> Connect the relay to the ON/OFF button on the remote control.</p>
      <h2>1 — Open the remote control</h2>
      <ul>
        <li>Identify the ON/OFF button</li>
        <li>Unscrew the case to open the remote control</li>
      </ul>
      <h2>2 — Locate the connections</h2>
      <ul>
        <li>Locate the + and - terminals of the button</li>
        <li>Test continuity with a multimeter (optional)</li>
      </ul>
      <div class="step-img-card">
        <img loading="lazy" src="../assets/8.webp" alt="Remote control internals" />
      </div>
      <h2>3 — Button wiring</h2>
      <p>Solder or use Dupont connectors:</p>
      <ul>
        <li>Solder a <strong>black cable</strong> to the - terminal of the button</li>
        <li>Solder a <strong>red cable</strong> to the common + terminal</li>
      </ul>
      <div class="step-img-card">
        <img loading="lazy" src="../assets/9.webp" alt="Button wiring" />
      </div>
    `
  },

  /* ── Step 06 ── Hardware: Connecting to relay module */
  {
    title: 'Hardware — Connecting to the relay module',
    html: `
      <h1>Step 2: Connecting to the relay module</h1>
      <h2>Relay terminology</h2>
      <table>
        <thead>
          <tr><th>Terminal</th><th>Description</th><th>Function</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>NO</strong> (Normally Open)</td><td>Circuit open by default</td><td>Closes when relay is activated</td></tr>
          <tr><td><strong>NC</strong> (Normally Closed)</td><td>Circuit closed by default</td><td>Opens when relay is activated</td></tr>
          <tr><td><strong>COM</strong> (Common)</td><td>Central terminal</td><td>Switches between NO and NC</td></tr>
        </tbody>
      </table>
      <h2>Wiring: remote control to relay module</h2>
      <ul>
        <li>Black wire from ON/OFF button -> <strong>NO</strong> (Normally Open)</li>
        <li>Red wire (common) -> <strong>COM</strong> (Common)</li>
      </ul>
      <h2>Logic</h2>
      <p>When the ESP32 <strong>activates</strong> the relay, it connects COM and NO — identical to pressing the remote control button.</p>
      <p>When the ESP32 <strong>cuts</strong> the relay, COM and NO separate — identical to releasing the button.</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/10.webp" alt="Remote control to relay wiring" />
      </div>
    `
  },

  /* ── Step 07 ── Hardware: ESP32 to relay + Hardware Checkpoint */
  {
    title: 'Hardware — ESP32 to relay + checkpoint',
    html: `
      <h1>Step 3: Connecting the ESP32 to the relay module</h1>
      <h2>Wiring diagram</h2>
      <table>
        <thead>
          <tr><th>ESP32</th><th></th><th>Relay Module</th></tr>
        </thead>
        <tbody>
          <tr><td>V5 (5V)</td><td>-></td><td>VCC</td></tr>
          <tr><td>GND</td><td>-></td><td>GND</td></tr>
          <tr><td>GPIO 21</td><td>-></td><td>IN (Input)</td></tr>
        </tbody>
      </table>
      <h2>Verification</h2>
      <ul>
        <li>VCC and GND well connected (polarity respected)</li>
        <li>GPIO 21 used for control signal</li>
        <li>No visible short circuit</li>
      </ul>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/11.webp" alt="ESP32 to relay wiring" />
      </div>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/12.webp" alt="Hardware overview" />
      </div>
      <h2>Hardware Checkpoint</h2>
      <p>Before moving on to software, verify:</p>
      <ul>
        <li>Remote control correctly wired</li>
        <li>Relay module connected to ESP32</li>
        <li>No bare wires touching other components</li>
        <li>220V always disconnected</li>
      </ul>
    `
  },

  /* ── Step 08 ── Software: Installing plugins */
  {
    title: 'Software — Installing BTCPay plugins',
    html: `
      <h1>Step 1: Installing BitcoinSwitch + Blink plugins</h1>
      <p>We will use <em>Blink</em> as an example. BTCPay Server also supports Strike, Breez and Boltz.</p>
      <ol>
        <li>Go to your BTCPay Server instance with an admin account</li>
        <li>Create your first store</li>
        <li>On the left-hand side, scroll to the bottom and go to <strong>"Manage Plugins"</strong></li>
      </ol>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/13.webp" alt="BTCPay manage plugins" />
      </div>
      <p>4. Install the <strong>BitcoinSwitch</strong> and <strong>Blink</strong> plugins.</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/14.webp" alt="Plugin list" />
      </div>
      <p>5. Scroll down and click <strong>"Install"</strong> for each plugin.</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/15.webp" alt="Install button" />
      </div>
      <p>6. Once complete, <strong>restart BTCPay Server</strong> and wait 1 minute.</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/16.webp" alt="Restart BTCPay Server" />
      </div>
      <p>7. Back in "Manage Plugins", confirm both plugins are installed.</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/17.webp" alt="Plugins installed" />
      </div>
    `
  },

  /* ── Step 09 ── Software: Blink setup */
  {
    title: 'Software — BTCPay + Blink configuration',
    html: `
      <h1>Step 2: BTCPay Server + Blink configuration</h1>
      <h2>1 — Create a Blink wallet</h2>
      <p>Visit <strong><a href="https://www.blink.sv" target="_blank" rel="noopener noreferrer">blink.sv</a></strong> and create your account.</p>
      <h2>2 — Generate a Blink API key</h2>
      <ul>
        <li>Access the API interface at <strong><a href="https://www.blink.sv/en/api" target="_blank" rel="noopener noreferrer">blink.sv/en/api</a></strong> and log in</li>
      </ul>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/18.webp" alt="Blink API interface" />
      </div>
      <ul>
        <li>Go to the <strong>API Keys</strong> tab</li>
      </ul>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/19.webp" alt="API Keys tab" />
      </div>
      <ul>
        <li>Click <strong>"+"</strong> in the top right corner</li>
      </ul>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/20.webp" alt="Add API key" />
      </div>
      <ul>
        <li>Give your API key a name and note it down — <strong>you will only see it once</strong></li>
      </ul>
      <pre><code>blink_mZ5KxxxxxxxxxxxxxNbmX</code></pre>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/21.webp" alt="API key name" />
      </div>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/22.webp" alt="API key created" />
      </div>
    `
  },

  /* ── Step 10 ── Software: BTCPay connection + PoS creation */
  {
    title: 'Software — Connect Blink to BTCPay + create PoS',
    html: `
      <h1>Step 2 (continued): Connect Blink to BTCPay Server</h1>
      <h2>3 — Connect Blink to BTCPay Server</h2>
      <p>In BTCPay Server, navigate to: <strong>Wallet -> Lightning</strong></p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/23.webp" alt="Wallet Lightning menu" />
      </div>
      <p>Click <strong>"Use a custom node"</strong> and paste the connection string:</p>
      <pre><code>type=blink;server=https://api.blink.sv/graphql;api-key=YOUR_KEY;wallet-id=YOUR_WALLET_ID</code></pre>
      <p><strong>Important:</strong> do not modify <code>type=blink;server=https://api.blink.sv/graphql</code> — only replace <code>api-key</code> and <code>wallet-id</code> with your values.</p>
      <p>Click <strong>"Test connection"</strong> then <strong>"Save"</strong>.</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/24.webp" alt="Custom node config" />
      </div>
      <p>Check that the connection is established (green status).</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/25.webp" alt="Green connection status" />
      </div>
      <h2>4 — Create a Point of Sale (PoS)</h2>
      <p>In BTCPay Server, go to <strong>Plugins -> Point of sale</strong></p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/26.webp" alt="Point of sale menu" />
      </div>
      <p>Give your PoS a name and click <strong>Create</strong>.</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/27.webp" alt="Create PoS" />
      </div>
      <p>PoS configuration:</p>
      <ul>
        <li>Style = <strong>Print display</strong></li>
        <li>Currency = <strong>SATS</strong></li>
        <li>Click <strong>SAVE</strong></li>
      </ul>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/28.webp" alt="PoS settings" />
      </div>
      <p>Product configuration — delete all default products, then click <strong>"add item"</strong>.</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/29.webp" alt="Delete default products" />
      </div>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/30.webp" alt="Add item" />
      </div>
      <p>Configure the product:</p>
      <ul>
        <li>Title: <strong>smoke-machine</strong></li>
        <li>Price: <strong>10 sats</strong></li>
        <li>Bitcoin GPIO switch: <strong>21</strong></li>
        <li>Bitcoin switch duration (ms): <strong>5000</strong></li>
        <li>Click <strong>Close</strong> then <strong>Save</strong></li>
      </ul>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/31.webp" alt="Product configuration" />
      </div>
    `
  },

  /* ── Step 11 ── Software: Flashing the ESP32 */
  {
    title: 'Software — Flashing the ESP32',
    html: `
      <h1>Step 3: Firmware — Flashing the ESP32</h1>
      <h2>1 — Go to the flash site</h2>
      <p>Navigate to: <strong><a href="https://bitcoinswitch.lnbits.com" target="_blank" rel="noopener noreferrer">bitcoinswitch.lnbits.com</a></strong></p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/32.webp" alt="BitcoinSwitch flash site" />
      </div>
      <h2>2 — Flash the BitcoinSwitch firmware</h2>
      <ul>
        <li>Connect the ESP32 to your computer via USB/Micro-USB cable</li>
        <li>Click <strong>"Connect to Device"</strong></li>
        <li>Select the USB port of your ESP32, then click <strong>Connect</strong></li>
      </ul>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/33.webp" alt="Select USB port" />
      </div>
      <p>In the <em>T-Display</em> section, click <strong>"Upload Firmware"</strong> for the latest version (currently: <em>bitcoinSwitch T-Display v1.0.1</em>).</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/34.webp" alt="Upload firmware" />
      </div>
      <p>Wait for the upload to complete — done when the logs show <strong>"Leaving..."</strong></p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/35.webp" alt="Upload complete" />
      </div>
      <p>Unplug the ESP32.</p>
      <h2>3 — Verify the firmware installation</h2>
      <ul>
        <li>Reload <strong><a href="https://bitcoinswitch.lnbits.com" target="_blank" rel="noopener noreferrer">bitcoinswitch.lnbits.com</a></strong></li>
        <li>Reconnect the ESP32 and click <strong>"Connect to device"</strong></li>
        <li>Press the <strong>RESET</strong> button on the ESP32</li>
        <li>Check that the logs show:</li>
      </ul>
      <pre><code>Welcome to BitcoinSwitch! (v1.0.1)
Config file does not exist.
Entering config mode. until we receive /config-done.</code></pre>
      <p><em>(Normal — no config yet, but firmware is installed.)</em></p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/36.webp" alt="Firmware logs" />
      </div>
    `
  },

  /* ── Step 12 ── Software: WebSocket URL + WiFi + Software Checkpoint */
  {
    title: 'Software — WebSocket, WiFi + checkpoint',
    html: `
      <h1>Step 3 (continued): WiFi and WebSocket configuration</h1>
      <h2>4 — Generate the WebSocket URL</h2>
      <p>Expected final format:</p>
      <pre><code>wss://XXXXv/apps/46XXXXXXXXXXXXXXXXXXXXwFB/pos/bitcoinswitch</code></pre>
      <ol>
        <li>Open your BTCPay Server and go to the PoS you created</li>
        <li>Click <strong>"View"</strong> to open your PoS in the browser</li>
      </ol>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/37.webp" alt="View PoS" />
      </div>
      <p>Copy the URL from the browser address bar:</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/38.webp" alt="Copy URL" />
      </div>
      <p>Transform it:</p>
      <ul>
        <li>Replace <code>https://</code> with <code>wss://</code></li>
        <li>Add <code>/bitcoinswitch</code> at the end</li>
      </ul>
      <h2>5 — Configure WiFi and WebSocket</h2>
      <p>Return to <strong><a href="https://bitcoinswitch.lnbits.com" target="_blank" rel="noopener noreferrer">bitcoinswitch.lnbits.com</a></strong> with your ESP32 connected.</p>
      <p>Go to <strong>Configure Device -> Wifi Settings</strong> and fill in your WiFi SSID and password.</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/39.webp" alt="WiFi settings" />
      </div>
      <p>In the <em>LNbits Device URL</em> section, paste the WebSocket URL, then click <strong>"Upload config"</strong>.</p>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/40.webp" alt="Upload config" />
      </div>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/41.webp" alt="Config uploaded" />
      </div>
      <p>Wait for the WebSocket connection. You should see:</p>
      <pre><code>WiFi connection established!
[WebSocket] Connected to url: ...</code></pre>
      <div class="step-img-plain">
        <img loading="lazy" src="../assets/42.webp" alt="WebSocket connected" />
      </div>
      <p>You can now disconnect the ESP32.</p>
      <h2>Software Checkpoint</h2>
      <p>Before the final test, verify:</p>
      <ul>
        <li>Blink connected to BTCPay</li>
        <li>PoS created with at least 1 product</li>
        <li>ESP32 flashed with BitcoinSwitch</li>
        <li>WiFi configured on ESP32</li>
        <li>WebSocket URL correct</li>
        <li>ESP32 logs error-free</li>
      </ul>
    `
  },

  /* ── Step 13 ── Final test */
  {
    title: 'Launch — Final test',
    html: `
      <h1>Complete final test</h1>
      <p>Everything is connected — time to test the full system!</p>
      <ol>
        <li>Plug in the smoke machine (220V) and switch it on</li>
        <li>Power the ESP32 (battery or USB)</li>
        <li>Open your BTCPay PoS in the browser</li>
        <li>Select the <strong>smoke-machine</strong> product</li>
        <li>Pay with a Lightning wallet (Blink or any other)</li>
      </ol>
      <h2>Expected result</h2>
      <ul>
        <li>Relay clicks (audible sound and relay LED lights up)</li>
        <li>The smoke machine activates</li>
        <li>Smoke generated!</li>
      </ul>
    `
  },

  /* ── Step 14 ── Troubleshooting */
  {
    title: 'Launch — Troubleshooting',
    html: `
      <h1>Common problems and solutions</h1>
      <table>
        <thead>
          <tr><th>Problem</th><th>Probable cause</th><th>Solution</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>ESP32 does not connect</td>
            <td>Missing USB driver</td>
            <td>Install <a href="https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers" target="_blank" rel="noopener noreferrer">CH340 drivers</a></td>
          </tr>
          <tr>
            <td>Relay does not click</td>
            <td>Wrong GPIO wiring</td>
            <td>Check GPIO 21 -> IN</td>
          </tr>
          <tr>
            <td>Smoke machine does not respond</td>
            <td>Remote control improperly wired</td>
            <td>Check NO/NC/COM</td>
          </tr>
          <tr>
            <td>WebSocket timeout</td>
            <td>Incorrect URL</td>
            <td>Check wss:// and /bitcoinswitch</td>
          </tr>
          <tr>
            <td>WiFi does not connect</td>
            <td>SSID/Password incorrect</td>
            <td>Re-flash WiFi config</td>
          </tr>
          <tr>
            <td>Payment received but nothing happens</td>
            <td>ESP32 not connected to WebSocket</td>
            <td>Check RESET logs</td>
          </tr>
        </tbody>
      </table>
    `
  },

  /* ── Step 15 ── Resources */
  {
    title: 'Launch — Resources',
    html: `
      <h1>Useful resources</h1>
      <h2>Official documentation</h2>
      <ul>
        <li><strong>BitcoinSwitch Firmware:</strong> <a href="https://bitcoinswitch.lnbits.com" target="_blank" rel="noopener noreferrer">bitcoinswitch.lnbits.com</a></li>
        <li><strong>BTCPay Server Docs:</strong> <a href="https://docs.btcpayserver.org" target="_blank" rel="noopener noreferrer">docs.btcpayserver.org</a></li>
        <li><strong>Blink API:</strong> <a href="https://dev.blink.sv" target="_blank" rel="noopener noreferrer">dev.blink.sv</a></li>
        <li><strong>ESP32 Pinout:</strong> <a href="https://randomnerdtutorials.com/esp32-pinout-reference-gpios" target="_blank" rel="noopener noreferrer">randomnerdtutorials.com/esp32-pinout-reference-gpios</a></li>
      </ul>
      <h2>Community and Support</h2>
      <ul>
        <li><strong>BTCPay Server:</strong> <a href="https://chat.btcpayserver.org" target="_blank" rel="noopener noreferrer">chat.btcpayserver.org</a></li>
        <li><strong>BTCPay Server Telegram:</strong> <a href="https://t.me/btcpayserver" target="_blank" rel="noopener noreferrer">t.me/btcpayserver</a></li>
        <li><strong>LNbits:</strong> <a href="https://t.me/lnbits" target="_blank" rel="noopener noreferrer">t.me/lnbits</a></li>
        <li><strong>BitcoinSwitch (firmware bugs):</strong> <a href="https://github.com/lnbits/bitcoinswitch/issues" target="_blank" rel="noopener noreferrer">github.com/lnbits/bitcoinswitch/issues</a></li>
      </ul>
      <h2>Source code</h2>
      <ul>
        <li><strong>BitcoinSwitch firmware:</strong> <a href="https://github.com/lnbits/bitcoinswitch" target="_blank" rel="noopener noreferrer">github.com/lnbits/bitcoinswitch</a></li>
      </ul>
    `
  },

  /* ── Step 16 ── Complete */
  {
    title: 'Launch — You did it!',
    html: `
      <h1>You built it!</h1>
      <p>Congratulations! You've successfully built a Lightning-powered smoke machine.</p>
      <p>You've completed the full tutorial:</p>
      <ul>
        <li>Hardware: remote control, relay module, ESP32 wiring</li>
        <li>Software: BTCPay Server, Blink wallet, BitcoinSwitch firmware</li>
        <li>Launch: WebSocket connection, full payment test</li>
      </ul>
      <p>Your ESP32 now listens for Lightning payments and triggers a jet of smoke — every single time.</p>
      <p><strong>Stack sats, make smoke, have fun, stay humble!</strong></p>
    `
  },
];
