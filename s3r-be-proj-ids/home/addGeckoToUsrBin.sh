#!/bin/bash

# check for sudo, if not use sudo
if sudo -n true
then
  echo 'already in sudo...'
else
  echo s3rbeproj | sudo -S su
fi

# filepath of geckodriver in S3R-BE-PROJ-IDS/home directory
SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
FILENAME='/geckodriver'
FILEPATH=$SCRIPTPATH$FILENAME
echo .

# check if geckodriver exists in /usr/bin, else add it
if [ -e "/usr/bin/geckodriver" ]; then
    echo "geckodriver already exists, please delete that before adding new geckodriver if you want to add new geckodriver."
else
    echo "adding geckodriver to /usr/bin/ ..."
    sudo cp $FILEPATH /usr/bin/
fi