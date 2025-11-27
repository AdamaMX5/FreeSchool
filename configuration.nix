{ config, pkgs, ... }:

{
  imports = [
    ./hardware-configuration.nix
  ];

  # Bootloader
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  # Networking
  networking.hostName = "freeschool";
  networking.networkmanager.enable = true;
  
  # Timezone & Locale
  time.timeZone = "Europe/Berlin";
  i18n.defaultLocale = "de_DE.UTF-8";

  # Benutzer konfigurieren
  users.users.freeschool = {
    isNormalUser = true;
    extraGroups = [ "wheel" "docker" ];
    openssh.authorizedKeys.keys = [
      # Füge hier deinen SSH-Key hinzu
      "ssh-rsa AAAAB3..."
    ];
  };

  # Sudo ohne Passwort (optional)
  security.sudo.wheelNeedsPassword = false;

  # Essential Packages
  environment.systemPackages = with pkgs; [
    vim
    wget
    curl
    git
    htop
    docker-compose
    # Für dein Projekt möglicherweise nützlich
    nodejs
    python3
    postgresql
  ];

  # Docker
  virtualisation.docker = {
    enable = true;
    autoPrune.enable = true;
  };

  # SSH Server
  services.openssh = {
    enable = true;
    passwordAuthentication = false;
    permitRootLogin = "no";
  };

  # Firewall
  networking.firewall = {
    enable = true;
    allowedTCPPorts = [ 80 443 22 ]; # HTTP, HTTPS, SSH
  };

  # Nix Einstellungen
  nix = {
    package = pkgs.nixFlakes;
    extraOptions = "experimental-features = nix-command flakes";
    gc = {
      automatic = true;
      dates = "weekly";
      options = "--delete-older-than 7d";
    };
  };

  system.stateVersion = "23.11"; # Nicht ändern!
}