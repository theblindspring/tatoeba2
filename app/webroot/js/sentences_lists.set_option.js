/**
 * Tatoeba Project, free collaborative creation of multilingual corpuses project
 * Copyright (C) 2009-2010  HO Ngoc Phuong Trang <tranglich@gmail.com>
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

angular.module('app', ['ngMaterial'])
     .controller('ListOptionsCtrl', function($scope, $element){
         
         $scope.editOption = selectedEditOption;
         $scope.editOptionChanged = function (){
            $(".is-editable.loader-container").html(
                "<div class='loader loader-small'></div>"
            );
            var rootUrl = get_tatoeba_root_url();
            $.post(
                rootUrl + "/sentences_lists/set_option/",
                { "listId": $element.attr("data-list-id"), "option": 'editable_by', "value":  $scope.editOption},
                function(data){
                    $(".is-editable.loader-container").html("");
                }
            );
        };
        
         $scope.visibilityOption = selectedVisibilityOption;
         $scope.visibilityOptionChanged = function (){
            $(".is-public.loader-container").html(
                "<div class='loader loader-small'></div>"
            );
            var rootUrl = get_tatoeba_root_url();
            $.post(
                rootUrl + "/sentences_lists/set_option/",
                { "listId": $element.attr("data-list-id"), "option": 'visibility', "value":  $scope.visibilityOption},
                function(data){
                    $(".is-public.loader-container").html("");
                }
            );
        };
        
     });


