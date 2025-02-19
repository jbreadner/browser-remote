#!/bin/bash

cd "$(dirname "$0")"
node . -p 9224 app "$@"