<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * mde upgrade script.
 *
 * @package    editor_mde
 * @copyright  2014 Damyon Wiese
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Make the mde the default editor for upgrades from 26.
 *
 * @return bool
 */
function xmldb_editor_mde_install() {
    global $CFG;

    // Make mde the default.
    $currenteditors = $CFG->texteditors;
    $neweditors = array();

    $list = explode(',', $currenteditors);
    array_push($neweditors, 'mde');
    foreach ($list as $editor) {
        if ($editor != 'mde') {
            array_push($neweditors, $editor);
        }
    }

    set_config('texteditors', implode(',', $neweditors));

    return true;
}
