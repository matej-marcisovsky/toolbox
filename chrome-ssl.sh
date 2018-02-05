#!/bin/bash

COMMAND=$1
NICKNAME=$2
FILENAME=$3

case $COMMAND in
add)
	if [ $# -ne 3 ]; then
		echo "Usage: $(basename $0) add NICKNAME FILENAME"
		exit 1
	fi
	certutil -d sql:$HOME/.pki/nssdb -A -t P -n $NICKNAME -i $FILENAME
	;;
delete)
	if [ $# -ne 2 ]; then
		echo "Usage: $(basename $0) delete NICKNAME"
		exit 1
	fi
	certutil -d sql:$HOME/.pki/nssdb -D -n $NICKNAME
	;;
list)
	if [ $# -ne 1 ]; then
		echo "Usage: $(basename $0) list"
		exit 1
	fi
	certutil -d sql:$HOME/.pki/nssdb -L
	;;
*) echo "Unknown command." ;;
esac
