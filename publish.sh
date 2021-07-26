PROJECT_NAME=${PWD##*/}
URL_SURGE="${PROJECT_NAME}.surge.sh"
BUILD_PATH="./dist/${PROJECT_NAME}"

ng build --prod
surge -p ${BUILD_PATH} -d ${URL_SURGE}

echo "publish ${PROJECT_NAME} completed: http://${URL_SURGE}"
