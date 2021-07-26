response_code=`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/healthcheck`
if [ $response_code -ne "200" ]; then
	echo "Service validation healtcheck failed with response_code: ${response_code}"
	exit 1
fi
