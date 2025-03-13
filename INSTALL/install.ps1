# LinguaGenie Installer
# This script will:
# - Install Python (if not installed)
# - Install Git (if not installed)
# - Clone or update the LinguaGenie repository
# - Install dependencies from requirements.txt
# - Create a desktop shortcut to main.py

# Function to check and install Python
function Install-Python {
    $pythonPath = (Get-Command python -ErrorAction SilentlyContinue).Source
    if ($pythonPath) {
        Write-Host "Python is already installed at $pythonPath"
    } else {
        Write-Host "Python is not installed. Installing Python..."
        Invoke-WebRequest -Uri "https://www.python.org/ftp/python/3.12.2/python-3.12.2-amd64.exe" -OutFile "$env:TEMP\python-installer.exe"
        Start-Process -FilePath "$env:TEMP\python-installer.exe" -ArgumentList "/quiet InstallAllUsers=1 PrependPath=1" -Wait
        Remove-Item "$env:TEMP\python-installer.exe" -Force
        Write-Host "Python installation completed."
    }
}

# Function to check and install Git
function Install-Git {
    $gitPath = (Get-Command git -ErrorAction SilentlyContinue).Source
    if ($gitPath) {
        Write-Host "Git is already installed at $gitPath"
    } else {
        Write-Host "Git is not installed. Installing Git..."
        Invoke-WebRequest -Uri "https://github.com/git-for-windows/git/releases/latest/download/Git-2.42.0-64-bit.exe" -OutFile "$env:TEMP\git-installer.exe"
        Start-Process -FilePath "$env:TEMP\git-installer.exe" -ArgumentList "/SILENT" -Wait
        Remove-Item "$env:TEMP\git-installer.exe" -Force
        Write-Host "Git installation completed."
    }
}

# Function to clone or update repository
function Setup-Repository {
    $repoPath = "$env:USERPROFILE\LinguaGenie"
    if (Test-Path $repoPath) {
        Write-Host "Repository found. Updating..."
        Set-Location $repoPath
        git pull origin main
    } else {
        Write-Host "Cloning the LinguaGenie repository..."
        git clone https://github.com/ZAYUVALYA/LinguaGenie.git $repoPath
    }
}

# Function to install dependencies
function Install-Dependencies {
    $repoPath = "$env:USERPROFILE\LinguaGenie"
    Set-Location $repoPath
    Write-Host "Installing dependencies..."
    python -m pip install --upgrade pip
    python -m pip install -r requirements.txt
    Write-Host "Dependencies installation completed."
}

# Function to create a desktop shortcut
function Create-Shortcut {
    $repoPath = "$env:USERPROFILE\LinguaGenie"
    $shortcutPath = "$env:USERPROFILE\Desktop\LinguaGenie.lnk"
    $iconPath = "$repoPath\favicon.ico"

    # Download and save icon
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/ZAYUVALYA/LinguaGenie/refs/heads/main/img/Favicon.png" -OutFile $iconPath

    $shell = New-Object -ComObject WScript.Shell
    $shortcut = $shell.CreateShortcut($shortcutPath)
    $shortcut.TargetPath = "python.exe"
    $shortcut.Arguments = "`"$repoPath\main.py`""
    $shortcut.WorkingDirectory = $repoPath
    $shortcut.IconLocation = $iconPath
    $shortcut.Save()

    Write-Host "Shortcut created at $shortcutPath"
}

# Run installation steps
Install-Python
Install-Git
Setup-Repository
Install-Dependencies
Create-Shortcut

Write-Host "LinguaGenie installation completed. You can launch it from your desktop shortcut."
