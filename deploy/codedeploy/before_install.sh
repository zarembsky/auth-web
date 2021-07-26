#!/bin/bash

# Install Ansible
# Source: http://docs.ansible.com/ansible/intro_installation.html#latest-releases-via-apt-ubuntu
sudo apt-get install -y software-properties-common
sudo apt-add-repository -y ppa:ansible/ansible
sudo apt-get update
sudo apt-get install -y ansible
sudo sed -i "/#retry_files_enabled = /c\retry_files_enabled = False" /etc/ansible/ansible.cfg
sudo sed -i "/#log_path = /c\log_path = /var/log/ansible.log" /etc/ansible/ansible.cfg
