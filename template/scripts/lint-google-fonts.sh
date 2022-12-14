#!/bin/bash
files="$(grep -rwl "$(pwd)" --exclude="scripts/lint-google-fonts.sh" --exclude-dir="node_modules" --include=\*.{js,jsx,ts,tsx,gql,css,json,html,htm} -e "fonts.googleapis.com")"
if [ -z "$files" ]
then
   echo "OK";
   exit 0;
else
   echo "Following files are containing an URL with 'fonts.googleapis.com':";
   echo "$files";
   echo
   echo "Please make sure that all fonts are stored and used locally"
   exit 1;
fi
