#!/bin/bash

# Deploy hooks are run via absolute path, so taking dirname of this script will give us the path to
# our deploy_hooks directory.
. $(dirname $0)/common_variables.sh

ansible-playbook \
	--limit=$DEPLOYMENT_GROUP_NAME \
	--inventory-file=$DESTINATION_PATH/deploy/ansible/inventories/$DEPLOYMENT_GROUP_NAME \
	--connection=local \
	--vault-password-file=/etc/opt/ghostery/$APP_NAME/.VAULT_PASS \
	$DESTINATION_PATH/deploy/ansible/main.yaml