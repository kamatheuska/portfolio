#!/bin/bash

cd view && npm run build && cd ../ && git add --all && git commit -m 'New build'
git subtree push --prefix server heroku master