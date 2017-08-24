/**
 * @file index.js
 * @author lihuanji
 *
 *  封装原生交互api
 */

import deviceready from './deviceready';
import redirect from './redirect';
import goBack from './goBack';
import goBackHandle from './goBackHandle';
import popPage from './popPage';
import popAllPage from './popAllPage';
import pay from './pay';
import networkStatus from './networkStatus';
import fetchCommonParams from './fetchCommonParams';
import handleError from './handleError';
import notification from './notification';

const Native = {
    deviceready,
    redirect,
    goBack,
    goBackHandle,
    popPage,
    popAllPage,
    pay,
    networkStatus,
    fetchCommonParams,
    handleError,
    notification,
};

export default Native;
