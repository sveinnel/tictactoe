#!/bin/bash
export PATH=$PATH:/usr/local/bin

ACCEPTANCE_URI=104.236.102.76
MONGOLAB_URI='mongodb://tictactoe:tictactoe@ds063870.mongolab.com:63870/tictactoe-test'
MONGOLAB_PING_URI='ds063870.mongolab.com'

echo Starting smoketests...
echo ------------------------------------------------
echo Checking if mongolab is available...
ping -c 2 $MONGOLAB_PING_URI
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi
echo ------------------------------------------------
echo  Smoketests OK
echo 

echo Pushing to docker...
docker push sveinnel/tictactoe
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi

echo Starting smoketests from production server...
echo ------------------------------------------------
echo Checking if mongolab is available...
ssh root@$ACCEPTANCE_URI 'ping -c 2 '$MONGOLAB_PING_URI
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi
echo ------------------------------------------------
echo  Smoketests OK
echo

echo Pulling new dockerimage...
ssh root@$ACCEPTANCE_URI 'docker pull sveinnel/tictactoe' 
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi
echo ------------------------------------------------
echo  Done pulling new dockerimage
echo

echo Killing old dockerimage...
ssh root@$ACCEPTANCE_URI 'docker kill tictactoe' 
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi
echo ------------------------------------------------
echo  Done killing old dockerimage
echo

echo Removing old dockerimage...
ssh root@$ACCEPTANCE_URI 'docker rm tictactoe' 
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi
echo ------------------------------------------------
echo  Done removing old dockerimage
echo


echo Starting new dockerimage...
ssh root@$ACCEPTANCE_URI 'docker run -p 80:8080 -d -e NODE_ENV=production -e MONGOLAB_URI='$MONGOLAB_URI' --name="tictactoe" sveinnel/tictactoe'
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi
echo ------------------------------------------------
echo  New dockerimage up and running
echo
echo SUCCESS