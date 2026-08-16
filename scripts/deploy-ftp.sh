#!/usr/bin/env bash
set -euo pipefail

# Required variables:
# FTP_HOST      -> FTP server host, e.g. ftp.example.com
# FTP_USER      -> FTP username
# FTP_PASS      -> FTP password
# FTP_REMOTE_DIR-> Remote directory, e.g. /public_html or /public_html/questions

if ! command -v lftp >/dev/null 2>&1; then
  echo "Error: lftp is not installed."
  echo "Install it first, for example: sudo apt install lftp"
  exit 1
fi

: "${FTP_HOST:?Missing FTP_HOST}"
: "${FTP_USER:?Missing FTP_USER}"
: "${FTP_PASS:?Missing FTP_PASS}"
: "${FTP_REMOTE_DIR:?Missing FTP_REMOTE_DIR}"

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="$PROJECT_ROOT/dist/questions/browser"

if [[ ! -d "$BUILD_DIR" ]]; then
  echo "Build output not found at: $BUILD_DIR"
  echo "Running production build..."
  (cd "$PROJECT_ROOT" && npm run build)
fi

echo "Deploying $BUILD_DIR to $FTP_HOST:$FTP_REMOTE_DIR"

lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" <<EOF
set ftp:passive-mode true
set ssl:verify-certificate no
set xfer:clobber on
mkdir -p "$FTP_REMOTE_DIR"
mirror -R --delete --verbose "$BUILD_DIR" "$FTP_REMOTE_DIR"
bye
EOF

echo "Deployment finished."
