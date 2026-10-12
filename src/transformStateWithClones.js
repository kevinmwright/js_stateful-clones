'use strict';

/*
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];

  let lastHistory = state;
  for (const action of actions) {
    history.push({ ...lastHistory });
    lastHistory = history[history.length - 1];
    switch (action.type) {
      case 'addProperties':
        Object.assign(lastHistory, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete lastHistory[key];
        }
        break;
      case 'clear':
        for (const key in lastHistory) {
          delete lastHistory[key];
        }
        break;
    }
  }
  return history;
}

module.exports = transformStateWithClones;
