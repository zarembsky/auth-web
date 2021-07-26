. $(dirname $0)/common_variables.sh

forever start --append --uid $APP_NAME $DESTINATION_PATH/index.js -c /etc/opt/ghostery/$APP_NAME/conf.json
sleep 5 # wait for server to start