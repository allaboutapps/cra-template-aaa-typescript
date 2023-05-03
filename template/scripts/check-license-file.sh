#!/bin/bash
if test -e ./build/third-party-licenses.txt; then
  echo "License file ok";
  exit 0;
else
  echo "License file missing";
  exit 1;
fi
