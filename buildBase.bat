del baseBuild\package.json
echo F | xcopy package.json  baseBuild\package.json

docker build -t management-demo-base:20190701 baseBuild/

docker build -t management-demo:20190701 .
