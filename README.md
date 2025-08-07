# Keystore SHA Fingerprint Generator

A web app to generate SHA-1 and SHA-256 fingerprints from `.jks` keystore files using any of Java 8, 11, or 17—no Java required for end users!
Live: https://keystore-sha-fingerprint.onrender.com
## Features
- Upload a `.jks` keystore file (max 5MB)
- Enter keystore password, key alias, and optional key password
- Select Java version (8, 11, or 17) for fingerprint generation
- Get SHA-1 and SHA-256 fingerprints instantly
- All processing is done server-side; no keystore data is stored
- Clean, Bootstrap-based UI

## Tech Stack
- **Backend:** Node.js, Express, Multer, child_process, EJS
- **Frontend:** HTML, Bootstrap
- **Container:** Docker (with SDKMAN for multi-Java support)

## Usage
1. Go to the deployed app URL.
2. Upload your `.jks` file.
3. Enter the required details.
4. (Optional) Select Java version.
5. Click **Generate Fingerprints**.
6. View your SHA-1 and SHA-256 fingerprints instantly.

## Local Development
```sh
# Clone the repo
https://github.com/md-sohrab-alam/keystore-sha-fingerprint.git
cd keystore-sha-fingerprint

# Install dependencies
npm install

# Start the app
npm start
```
App runs at http://localhost:3000

## Docker Deployment
```sh
docker build -t keystore-sha-fingerprint .
docker run -p 3000:3000 keystore-sha-fingerprint
```

## Render.com Deployment
- Connect your repo on Render.com
- Make sure **Runtime: Docker** is selected
- Deploy! (Java 8, 11, and 17 are installed automatically)

## Security
- Uploaded files are deleted after processing
- No keystore data is stored

## License
MIT 
