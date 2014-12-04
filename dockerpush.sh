#!/bin/bash
export PATH=$PATH:/usr/local/bin

docker push sveinnel/tictactoe
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi

ssh root@104.131.184.91	'docker pull sveinnel/tictactoe && docker kill tictactoe && docker rm tictactoe && docker run -p 80:8080 -d -e "NODE_ENV=production" --name="tictactoe" sveinnel/tictactoe'
EXITCODE=$?
if [ $EXITCODE -ne 0 ] ; then exit $EXITCODE ; fi
