/**
 * Tatoeba Project, free collaborative creation of multilingual corpuses project
 * Copyright (C) 2009 Allan SIMON <allan.simon@supinfo.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .directive('favoriteItem', [favoriteItem]);


        function favoriteItem() {
        return {
            restrict: 'E',
            replace: true,
            link: function (scope, element, attrs, ctrl) {
                ctrl.language = attrs.langCode;
                ctrl.sentenceId = attrs.id;
                ctrl.title = attrs.buttonText;
                ctrl.canRemove = attrs.canRemove;
                ctrl.ariaLabel = attrs.aLabel;
                ctrl.sentence = attrs.text;
            },
            template: 
            '<md-list-item class="sentence mainSentence" >' +
                '<div ng-show="!ctrl.removed" class="nav column">' +
                    '<a href="/{{ctrl.language}}/sentences/show/{{ctrl.sentenceId}}" class="navigationIcon" style="margin-top: 0px;" title="{{ctrl.title}}">' +
                        '<svg>' + 
                            '<use xlink:href="/img/sentence-number.svg?1430581215#sentence-number"></use>' +
                        '</svg>' +
                    '</a>' +
                '</div>' +
                '<div ng-show="!ctrl.removed" class="lang column">' + 
                    '<img class="languageFlag" style="margin-top: 0px;" src="/img/flags/{{ctrl.language}}.png"/>' +
                '</div>' +
                '<div class="content column" flex><div class="text correctnessZero" >{{ctrl.sentence}}</div></div>' +
                '<md-button class="md-icon-button" aria-label="{{ctrl.ariaLabel}}" ng-show="ctrl.isLoading">' +
                    '<md-progress-circular  md-diameter="16"  style="display: block;" ></md-progress-circular>' +
                '</md-button>' +      
                '<md-button class="md-icon-button test" ng-show="!ctrl.isLoading && ctrl.canRemove" ng-click="ctrl.toggleFavorite()">' +
                    '<md-icon>{{ctrl.removed ? "undo" : "clear"}}</md-icon>' +
                '</md-button>' + 
            '</md-list-item>',
            
            controller: FavoriteItemController,
            controllerAs: 'ctrl',
            scope: {
                isLoading: '=',
            }
        }

        function FavoriteItemController($http) {
            // You will need a controller on the directive level
            var vm = this;

            vm.deleteString = $("#favorites-list").attr('data-success');
            vm.isLoading = false;
            vm.removed = false;
            vm.toggleFavorite = toggleFavorite;
            ///////////////////////////////////////////////////////////////////

            function toggleFavorite() {
                vm.isLoading = !vm.isLoading;
                
                var action, style, replaceText;
                if(vm.removed){
                    action = "add";
                    style = "";
                    replaceText = vm.sentence;
                } else {
                    action = "remove";
                    style = "italic";
                    replaceText = vm.deleteString;
                }
                var requestUrl = "/favorites/" + action + "_favorite/" + vm.sentenceId;
                $http.post(requestUrl).then(function(response){
                    changeFavoriteElements(replaceText, style)
                });
            }
            
            function changeFavoriteElements(newText, newStyle){
                var item =  $("#" + vm.sentenceId);
                item.find(".text").html(newText).css("font-style", newStyle);
                vm.removed = !vm.removed;
                vm.isLoading = !vm.isLoading;                
            }
        }
    }
})();
