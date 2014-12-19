#!/bin/bash
export PATH=$PATH:/usr/local/bin

ACCEPTANCE_URI=104.236.102.76

echo Starting smoketests...
echo ------------------------------------------------
echo Checking if acceptance test server is available...
ping -c 2 $ACCEPTANCE_URI
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi
echo ------------------------------------------------
echo Smoketests OK
echo

echo Starting e2e tests...
echo ------------------------------------------------
grunt e2e
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi
echo ------------------------------------------------
echo e2e tests OK
echo
