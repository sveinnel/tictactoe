Project Template for TicTacToe
=========

Getting started with this project template. After this you should have the project up-and-running on a Digital Ocean droplet server.

### DIGITAL OCEAN

Droplet server setup:

* Create account on [DigitalOcean](http://digitalocean.com)
  -- Use referral...
* Create or use existing SSH key (no passphrase)
* Create droplet (512mb, Ubuntu 14.04)
* Log into droplet via ssh
``` 
ssh root@<ipaddress>
``` 

* Follow instructions
  [Ubuntu Linux Setup](http://docs.docker.com/installation/ubuntulinux/)
  or run [script](https://github.com/stefaneg/tictactoe/blob/master/provisioning/production/server-init.sh) (untested).

When installing docker, use curl -ssL option

To establish ssh link (selecting SSH key did not work for me):

``` 
cat ~/.ssh/id_rsa.pub | ssh root@<ipaddress> "cat >> ~/.ssh/authorized_keys"
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
  * change gulli to <yourname>
* make sure docker is running (boot2docker)
* run 
``` 
./dockerbuild
``` 
* run 
``` 
docker push <yourname>/tictactoe"
``` 

On Digital Ocean server (production)

``` 
docker run -p 80:8080 -d -e "NODE_ENV=production" <yourname>/tictactoe
``` 

Navigate to http://yourServerIpAddress  and you should have yeoman landing page.


### Project backlog

*	Can update latest version in production by push of a button
  
  Including changes to data structure.

* Can get feedback on failing tests and diagnostics

  Commit stage / continuous integration.

*	Can play tic-tac-toe against another user

 Implement using TDD
 Acceptance TDD
 Controller TDD
 DOM - TicTacToe directive with TDD
 Server side, API TDD

*	Can play-back any given game to see how it was played

 Use event sourcing - record every user interaction

*	Can get an email when I win a match

 Implement an acceptance test, using test double to simulate email sending

*	Can downgrade to selected version by push of a button

 Implement rollback, including down migrations

*	Can playback old games after data structure has changed

 Database migration

*	Can see how many users played Tic-Tac-Toe in a given period

 Metrics and monitoring

*	Can know how many users our application supports on given hardware

 Automated capacity testing

*	Can be sure that latest version in production supports happy path after upgrade

 Acceptance test through UI
 Acceptance test through API

*	Can update to latest version with zero downtime

  Blue/Green deployment and testing

*	Can be sure that deployment is not continued if key resources are missing

  Env smoke tests
  Auto rollback

*	Can be sure that deployment is not continued if configuration parameter is not set

  Env smoke tests
  Auto rollback

*	Can continue playing even if the whole world is playing back games

  CQRS - separate deployment for playback
  
  
=== More stories for consideration
  
* Can provision a new environment in cloud (Digital Ocean) with minimal input.
  Script server provisioning. [Droplet API](https://developers.digitalocean.com/#droplets)
