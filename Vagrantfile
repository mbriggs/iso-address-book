Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "address-book"
  config.ssh.private_key_path = "~/.ssh/id_rsa"
  config.ssh.forward_agent = true

  config.vm.network "forwarded_port", guest: 3000, host: 8000
  config.vm.network "private_network", ip: "192.168.33.7"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = 4 * 1024
    vb.cpus = 4
  end

  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y git-core build-essential curl zsh vim
    chsh -s $(which zsh) vagrant
  SHELL

  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    cd /home/vagrant

    if [ ! -d ".nvm" ]; then
      echo "Installing NVM"
      wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh

      export NVM_DIR="/home/vagrant/.nvm"
      [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

      nvm install 0.10.33
      nvm alias default 0.10.33
      nvm use 0.10.33

      npm install -g nodemon

      cd /vagrant
      npm install
      cd
    else
      echo "NVM installed, skipping"
    fi

    if [ ! -d ".zsh" ]; then
      echo "Installing zsh configs"
      git clone http://github.com/mbriggs/.zsh
      ln -s .zsh/zshrc .zshrc
      cd .zsh
      make install
      cd
    else
      echo "ZSH set up"
    fi

    if [ ! -d "dotfiles" ]; then
      git clone http://github.com/mbriggs/dotfiles
    fi

    if [ ! -d "scripts" ]; then
      git clone http://github.com/mbriggs/scripts
      ./scripts/link-dotfiles
    fi
  SHELL
end
