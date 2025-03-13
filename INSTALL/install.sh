#!/bin/bash

# LinguaGenie Installer for Linux
# This script will:
# - Install Python (if not installed)
# - Install Git (if not installed)
# - Clone or update the LinguaGenie repository
# - Install dependencies from requirements.txt
# - Create a desktop shortcut to main.py

# Function to check and install Python
install_python() {
    if command -v python3 &>/dev/null; then
        echo "Python is already installed."
    else
        echo "Python is not installed. Installing Python..."
        sudo apt update && sudo apt install -y python3 python3-pip
        echo "Python installation completed."
    fi
}

# Function to check and install Git
install_git() {
    if command -v git &>/dev/null; then
        echo "Git is already installed."
    else
        echo "Git is not installed. Installing Git..."
        sudo apt update && sudo apt install -y git
        echo "Git installation completed."
    fi
}

# Function to clone or update the repository
setup_repository() {
    REPO_PATH="$HOME/LinguaGenie"
    if [ -d "$REPO_PATH" ]; then
        echo "Repository found. Updating..."
        cd "$REPO_PATH" && git pull origin main
    else
        echo "Cloning the LinguaGenie repository..."
        git clone https://github.com/ZAYUVALYA/LinguaGenie.git "$REPO_PATH"
    fi
}

# Function to install dependencies
install_dependencies() {
    REPO_PATH="$HOME/LinguaGenie"
    cd "$REPO_PATH"
    echo "Installing dependencies..."
    python3 -m pip install --upgrade pip
    python3 -m pip install -r requirements.txt
    echo "Dependencies installation completed."
}

# Function to create a desktop shortcut
create_shortcut() {
    REPO_PATH="$HOME/LinguaGenie"
    SHORTCUT_PATH="$HOME/Desktop/LinguaGenie.desktop"
    ICON_PATH="$REPO_PATH/favicon.png"

    # Download and save icon
    wget -O "$ICON_PATH" "https://raw.githubusercontent.com/ZAYUVALYA/LinguaGenie/refs/heads/main/img/Favicon.png"

    # Create .desktop file
    echo "[Desktop Entry]" > "$SHORTCUT_PATH"
    echo "Version=1.0" >> "$SHORTCUT_PATH"
    echo "Type=Application" >> "$SHORTCUT_PATH"
    echo "Name=LinguaGenie" >> "$SHORTCUT_PATH"
    echo "Exec=python3 $REPO_PATH/main.py" >> "$SHORTCUT_PATH"
    echo "Icon=$ICON_PATH" >> "$SHORTCUT_PATH"
    echo "Terminal=false" >> "$SHORTCUT_PATH"

    # Make shortcut executable
    chmod +x "$SHORTCUT_PATH"

    echo "Shortcut created at $SHORTCUT_PATH"
}

# Run installation steps
install_python
install_git
setup_repository
install_dependencies
create_shortcut

echo "LinguaGenie installation completed. You can launch it from your desktop shortcut."
