#!/bin/bash

tmux new -s project \; \
  send-keys 'cd server' C-m \; \
  send-keys 'npm run server' C-m \; \
  split-window -h \; \
  send-keys 'cd client' C-m \; \
  send-keys 'yarn start' C-m \;
