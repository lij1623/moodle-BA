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
 * mde admin settings
 *
 * @package    editor_mde
 * @copyright  2013 Damyon Wiese
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$ADMIN->add('editorsettings', new admin_category('editormde', $editor->displayname, $editor->is_enabled() === false));

$settings = new admin_settingpage('editorsettingsmde', new lang_string('settings', 'editor_mde'));
if ($ADMIN->fulltree) {
    require_once(__DIR__ . '/adminlib.php');
    $settings->add(new editor_mde_subplugins_setting());
    $name = new lang_string('toolbarconfig', 'editor_mde');
    $desc = new lang_string('toolbarconfig_desc', 'editor_mde');
    $default = 'collapse = collapse
style1 = title, bold, italic
list = unorderedlist, orderedlist, indent
links = link
files = emojipicker, image, media, recordrtc, managefiles, h5p
accessibility = accessibilitychecker, accessibilityhelper
style2 = underline, strike, subscript, superscript
align = align
insert = equation, charmap, table, clear
undo = undo
other = html';
    $setting = new editor_mde_toolbar_setting('editor_mde/toolbar', $name, $desc, $default);

    $settings->add($setting);
}

$name = new lang_string('autosavefrequency', 'editor_mde');
$desc = new lang_string('autosavefrequency_desc', 'editor_mde');
$default = 60;
$setting = new admin_setting_configduration('editor_mde/autosavefrequency', $name, $desc, $default);
$settings->add($setting);

$ADMIN->add('editormde', $settings);

foreach (core_plugin_manager::instance()->get_plugins_of_type('mde') as $plugin) {
    /** @var \editor_mde\plugininfo\mde $plugin */
    $plugin->load_settings($ADMIN, 'editormde', $hassiteconfig);
}

// Required or the editor plugininfo will add this section twice.
unset($settings);
$settings = null;

