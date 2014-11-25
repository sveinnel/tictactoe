Project Template for TicTacToe
=========

### DIGITAL OCEAN

Droplet server setup:

* Create account
* Create or use existing SSH key (no passphrase)
* Create droplet (512mb, Ubuntu 14.04)
* Log into droplet via ssh
* Follow instructions
  [Ubuntu Linux Setup](http://docs.docker.com/installation/ubuntulinux/)

When installing docker, use curl -ssL option

To establish ssh link (selecting SSH key did not work for me):

``` 
cat ~/.ssh/id_rsa.pub | ssh root@104.131.34.218 "cat >> ~/.ssh/authorized_keys"
``` 


### DOCKER

Docker setup and installation

* MacOsX/Windows - install boot2docker. Follow online instructions.
* Remember - docker only works in boot2docker console unless you add DOCKER… environment variables.
* Create account on docker.com, <yourname> refers to docker username


### GITHUB

* fork this project - clone fork to src/ruprojects/tictactoe directory, or where ever you keep your project sources.
* ensure you have latest node/npm
* edit dockerbuild.sh
  * line “docker build -t gulli/tictactoe ./dist/“
  * change gulli to your docker hub username
* make sure docker is running (boot2docker)
* run "./dockerbuild" in bash
* run 
``` 
docker push <yourname>/tictactoe"
``` 

On Digital Ocean server (production)
docker run -p 80:8080 -d -e "NODE_ENV=production" <yourname>/tictactoe

Navigate to http://<yourServerIpAddress>  and you should have yeoman landing page.

