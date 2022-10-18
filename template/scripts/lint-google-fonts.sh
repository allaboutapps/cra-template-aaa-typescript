#!/bin/bash
files="$(grep -rwl "$(pwd)" --exclude="$(pwd)/template/scripts/lint-google-fonts.sh" --include=\*.{js,jsx,ts,tsx,gql,css,json,html} -e "https://fonts.googleapis.com")"
if [ -z "$files" ] 
then 
   echo "OK";
   exit 0;
else
   echo "Following files are containing an url with https://fonts.googleapis.com :";
   echo "$files";
   echo
   echo "Please make sure that all fonts are stored and used locally"
   exit 1;
fi
