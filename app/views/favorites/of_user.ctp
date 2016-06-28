<?php
/**
 * Tatoeba Project, free collaborative creation of multilingual corpuses project
 * Copyright (C) 2009  HO Ngoc Phuong Trang <tranglich@gmail.com>
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
 *
 * PHP version 5
 *
 * @category PHP
 * @package  Tatoeba
 * @author   HO Ngoc Phuong Trang <tranglich@gmail.com>
 * @license  Affero General Public License
 * @link     http://tatoeba.org
 */
$username = Sanitize::paranoid($username, array("_"));
$javascript->link('/js/favorites/of.ctrl.js', false);
if ($userExists) {
    $numberOfSentences = (int) $paginator->counter(
        array(
            "format" => "%count%"
        )
    );
    $title = format(__("{user}'s favorite sentences", true), array('user' => $username));
} else {
    $title = format(__("There's no user called {username}", true), array('username' => $username));
}
$this->set('title_for_layout', $pages->formatTitle($title));
?>

<div id="annexe_content">
    <?php
        echo $this->element(
        'users_menu',
        array('username' => $username)
    );
    ?>
</div>

<div id="main_content" >
    <div class="module" id="favorites-list" data-success="<?php echo __("Favorite successfully removed.", true); ?>" >

    <?php
    if (!$userExists) {
        $commonModules->displayNoSuchUser($username, $backLink);
    } else {
        $title = $paginator->counter(
            array(
                'format' => $title . ' ' . __("(total %count%)", true)
            )
        );
        echo $html->tag('h2', $title);
        if ($numberOfSentences > 0) {
            $paginationUrl = array($username);
            $pagination->display($paginationUrl);
            ?>
            <md-list>
                <? foreach ($favorites as $favorite) {
                    if(empty($favorite['Sentence']['text'])){
                        $sentenceId = $favorite['Favorite']['favorite_id'];
                        $linkToSentence = $html->link(
                            '#'.$sentenceId,
                            array(
                                'controller' => 'sentences',
                                'action' => 'show',
                                $sentenceId
                            )
                        ); ?>
                        <md-list-item class="sentence" >
                            <? echo $html->div('sentence deleted',
                                format(
                                    __('Sentence {id} has been deleted.', true),
                                    array('id' => $linkToSentence)
                                )
                            );?>
                        </md-list-item>
                    <?} else {
                        $id = $favorite['Favorite']['favorite_id'];
                        $lang = $favorite['Sentence']['lang'];
                        $langName = $languages->codeToNameAlone($lang);
                        $text = $favorite['Sentence']['text'];
                        $canRemove = $username == CurrentUser::get('username'); ?>
                        <favorite-item id="<?= $id ?>"
                                       lang-code="<?= $lang ?>"
                                       lang-name="<?= $langName ?>"
                                       text="<?= $text ?>"
                                       can-remove="<?= $canRemove ?>"
                                       button-text="<? __("Show sentence's details") ?>"
                                       a-label="<? __("Loading") ?>">
                        </favorite-item>
                    <?}
                 } ?>
            </md-list>
            <?php
            $pagination->display($paginationUrl);
        } else {
            __('This user does not have any favorites.');
        }
    }
    ?>
    </div>
</div>
