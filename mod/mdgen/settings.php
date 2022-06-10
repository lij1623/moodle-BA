<?php
// This file is part of Moodle - https://moodle.org/
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
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Plugin administration mdgens are defined here.
 *
 * @package     mod_mdgen
 * @category    admin
 * @copyright   2022 Lisa Jeske
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

if ($ADMIN->fulltree) {
    require_once("$CFG->libdir/resourcelib.php");

    $displayoptions = resourcelib_get_displayoptions(array(RESOURCELIB_DISPLAY_OPEN, RESOURCELIB_DISPLAY_POPUP));
    $defaultdisplayoptions = array(RESOURCELIB_DISPLAY_OPEN);

    //--- general settings -----------------------------------------------------------------------------------
    $settings->add(new admin_setting_configmultiselect('mdgen/displayoptions',
        get_string('displayoptions', 'mdgen'), get_string('configdisplayoptions', 'mdgen'),
        $defaultdisplayoptions, $displayoptions));

    //--- modedit defaults -----------------------------------------------------------------------------------
    $settings->add(new admin_setting_heading('mdgenmodeditdefaults', get_string('modeditdefaults', 'admin'), get_string('condifmodeditdefaults', 'admin')));

    $settings->add(new admin_setting_configcheckbox('mdgen/printintro',
        get_string('printintro', 'mdgen'), get_string('printintroexplain', 'mdgen'), 0));
    $settings->add(new admin_setting_configcheckbox('mdgen/printlastmodified',
        get_string('printlastmodified', 'mdgen'), get_string('printlastmodifiedexplain', 'mdgen'), 1));
    $settings->add(new admin_setting_configselect('mdgen/display',
        get_string('displayselect', 'mdgen'), get_string('displayselectexplain', 'mdgen'), RESOURCELIB_DISPLAY_OPEN, $displayoptions));
    $settings->add(new admin_setting_configtext('mdgen/popupwidth',
        get_string('popupwidth', 'mdgen'), get_string('popupwidthexplain', 'mdgen'), 620, PARAM_INT, 7));
    $settings->add(new admin_setting_configtext('mdgen/popupheight',
        get_string('popupheight', 'mdgen'), get_string('popupheightexplain', 'mdgen'), 450, PARAM_INT, 7));
}
