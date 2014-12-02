#!/bin/bash
export PATH=$PATH:/usr/local/bin
cd /home/sveinn/hgop/tictactoe/tictactoe/

echo Cleaning...
rm -rf ./dist
if [ $? -ne 0 ] ; then exit $? ; fi

echo Building app
grunt
if [ $? -ne 0 ] ; then exit $? ; fi

cp ./Dockerfile ./dist/
if [ $? -ne 0 ] ; then exit $? ; fi

cd dist
npm install --production
if [ $? -ne 0 ] ; then exit $? ; fi

echo Building docker image
docker build -t sveinnel/tictactoe .
if [ $? -ne 0 ] ; then exit $? ; fi

echo "Done"
