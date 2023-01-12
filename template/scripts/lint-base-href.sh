#!/bin/bash
errorFiles="$(grep -rw "." --exclude-dir="node_modules" --include=\*.{html,htm} -e "<base.*\/>")"
baseCount="$(grep -rw --exclude-dir="node_modules" --include=\*.{html,htm} -e "<base href=\"\/\">" | wc -l)"
if [ -z "$errorFiles" ] && [ "$baseCount" -eq 1 ]
then
   echo "OK";
   exit 0;
else
   if [ "$baseCount" -ne 1 ]
   then
      if [ "$baseCount" -eq 0 ]
      then
         echo "Make sure there is a <base href=\"/\"> in the index.html";
      else
         echo "Make sure there is only ONE <base href=\"/\">";
      fi
   fi
   if [ -n "$errorFiles" ]
   then
      echo "Following files contain a self closing <base> tag:";
      echo "$errorFiles";
      echo
      echo "Please make sure that base tags do NOT self close"
   fi
   exit 1;
fi