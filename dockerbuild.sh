#!/bin/bash
export PATH=$PATH:/usr/local/bin
cd /home/sveinn/hgop/tictactoe/tictactoe/

echo Cleaning...
rm -rf ./dist
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi

echo Building app
grunt
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi

cp ./Dockerfile ./dist/
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi

cd dist
npm install --production
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi

echo Building docker image
docker build -t sveinnel/tictactoe .
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi

echo "Done"
