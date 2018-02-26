/* eslint-disable */
import $ from 'jquery';

/// <reference path='../node_modules/@types/knockout/index.d.ts' />
/// <reference path='../node_modules/@types/jquery/index.d.ts' />
let BlizzData;

(function (BlizzData) {
    var Operation;
    (function (Operation) {
        Operation[Operation['FetchToken'] = 0] = 'FetchToken';
        Operation[Operation['GetLeaderboardsList'] = 1] = 'GetLeaderboardsList';
        Operation[Operation['GetLeaderboardDataByName'] = 2] = 'GetLeaderboardDataByName';
    })(Operation || (Operation = {}));
    var App = /** @class */ (function () {
        function App() {
            var _this = this;
            this.origin = 'us';
            this.locale = 'en_US'; //not used
            this.token = '';
            this.laderBoardsList = [];
            this.LeaderBoardsTmp = [];//ko.observableArray([]); //use of knockout is for example only. Feel free to use any framework(s)
            this.loadedSeason = 0;
            this.requests = {};
            this.GetSeasonData = function (seasonDesc) {
                var loadedSeason = seasonDesc.seasonId || _this.loadedSeason;
                var className = 'rift-' + (seasonDesc.heroClass || seasonDesc.hero_class_string);
                var url = _this.buildUrl(_this.origin, _this.locale, Operation.GetLeaderboardDataByName).replace('{season}', loadedSeason.toString()).replace('{name}', className);

                /*  Exceed localStorage quota
                if (typeof(Storage) !== 'undefined') {
                  var reqCached = localStorage.getItem(`get-season-${loadedSeason}${className}`);
                  if (reqCached) {
                    var res = JSON.parse(reqCached);
                    var deferred = $.Deferred().resolve(res);
                    return deferred.promise();
                  }
                }
                */

                return $.get(url, {}, function (data) {
                  /*  Exceed localStorage quota
                  try {
                    var response = JSON.stringify(Object.assign({}, data));
                    localStorage.setItem(`get-season-${loadedSeason}${className}`, response);
                  } catch(e) { console.log('Problem with localStorage', e); }
                  */
                });
            };
        }
        App.prototype.GetSeasonsLeaderboardsList = function (season) {
            var _this = this;
            if (season === void 0) { season = 12; }
            var url = this.buildUrl(this.origin, this.locale, Operation.GetLeaderboardsList).replace('{season}', season.toString());
            if (typeof(Storage) !== 'undefined') {
              var reqCached = localStorage.getItem(`get-season-${season}`);
              if (reqCached) {
                var res = JSON.parse(reqCached);
                var deferred = $.Deferred().resolve(res);
                return deferred.promise();
              }
            }
            return $.get(url, {}, function (data) {
              try {
                var response = JSON.stringify(Object.assign({}, data));
                localStorage.setItem(`get-season-${season}`, response);
              } catch(e) { console.log('Problem with localStorage', e); }
            });
        };
        App.prototype.fetchToken = function (callBack) {
            var _this = this;
            if (callBack === void 0) { callBack = null; }
            var url = this.buildUrl();
            $.get(url, {}, function (data) {
                _this.token = data.access_token;
                if (callBack != null) {
                    callBack(data);
                }
            });
        };
        App.prototype.buildUrl = function (origin, locale, op) {
            if (origin === void 0) { origin = 'us'; }
            if (locale === void 0) { locale = 'en'; }
            if (op === void 0) { op = Operation.FetchToken; }
            var base = 'https://' + origin + '.api.battle.net/';
            switch (op) {
                case Operation.FetchToken:
                    //token helper for Auth
                    base = 'https://frontendhelperbeeye.azurewebsites.net/Tokens.asmx/GetToken';
                    break;
                case Operation.GetLeaderboardsList:
                    base = base + 'data/d3/season/{season}?access_token=' + this.token;
                    break;
                case Operation.GetLeaderboardDataByName:
                    base = base + 'data/d3/season/{season}/leaderboard/{name}?access_token=' + this.token;
                    break;
                default:
            }
            return base;
        };
        return App;
    }());
    BlizzData.App = App;
})(BlizzData || (BlizzData = {}));

export default new BlizzData.App();
