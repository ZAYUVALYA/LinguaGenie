
# **LinguaGenie Installation Guide**  

Welcome to the **LinguaGenie** installation guide! This document will walk you through the steps to install and uninstall **LinguaGenie** on both **Windows** and **Linux**.  

---

## **🔹 Installation**  

### **Windows Installation**  

1. **Download the Installer**  
   - Open **PowerShell** and run the following command:  
     ```powershell
     Invoke-WebRequest -Uri "https://raw.githubusercontent.com/ZAYUVALYA/LinguaGenie/main/INSTALL/install.ps1" -OutFile "$HOME\install.ps1"
     ```
  
2. **Run the Installer**  
   - Open **PowerShell as Administrator** and execute:  
     ```powershell
     Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
     ```
     ```powershell
     .\install.ps1
     ```
   - This script will:
     - Install **Python** (if not installed).  
     - Install **Git** (if not installed).  
     - Clone or update the **LinguaGenie** repository.  
     - Install required dependencies.  
     - Create a **desktop shortcut** to launch the app easily.  

3. **Launch LinguaGenie**  
   - Once the installation is complete, open **LinguaGenie** using the **desktop shortcut** or manually run:  
     ```powershell
     python main.py
     ```
   - Enjoy using **LinguaGenie**! 🎉  

---

### **Linux Installation**  

1. **Download the Installer**  
   Open **Terminal** and run:  
   ```bash
   wget -O "$HOME/install.sh" "https://raw.githubusercontent.com/ZAYUVALYA/LinguaGenie/main/INSTALL/install.sh"
   ```

2. **Run the Installer**  
   ```bash
   chmod +x "$HOME/install.sh"
   bash "$HOME/install.sh"
   ```
   - This script will:  
     - Install **Python** (if not installed).  
     - Install **Git** (if not installed).  
     - Clone or update the **LinguaGenie** repository.  
     - Install required dependencies.  
     - Create a **desktop shortcut** to launch the app easily.  

3. **Launch LinguaGenie**  
   - Open **LinguaGenie** from your **desktop shortcut** or manually run:  
     ```bash
     python3 main.py
     ```
   - Enjoy using **LinguaGenie**! 🎉  

---

## **🔹 Uninstallation**  

### **Windows Uninstallation**  
1. Open **PowerShell** and execute:  
   ```powershell
   Remove-Item -Recurse -Force "$HOME\LinguaGenie"
   Remove-Item -Force "$HOME\Desktop\LinguaGenie.lnk"
   ```
2. If **Python** and **Git** were installed separately, they will remain on your system.  
3. **LinguaGenie** is now completely removed.  

---

### **Linux Uninstallation**  
1. Open **Terminal** and run:  
   ```bash
   rm -rf "$HOME/LinguaGenie"
   rm -f "$HOME/Desktop/LinguaGenie.desktop"
   ```
2. If **Python** and **Git** were installed separately, they will remain on your system.  
3. **LinguaGenie** is now completely removed.  

---

## **💡 Notes**  
- If you encounter permission issues, try running the commands with **Administrator privileges (Windows)** or **sudo (Linux)**.  
- For further support, visit the [LinguaGenie GitHub Repository](https://github.com/ZAYUVALYA/LinguaGenie/issues).  

Enjoy using **LinguaGenie**! 🚀
