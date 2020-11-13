import Application from 'tic-tac-toe/app';
import config from 'tic-tac-toe/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
