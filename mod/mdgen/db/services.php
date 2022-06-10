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
 * mdgen external functions and service definitions.
 *
 * @package    mod_mdgen
 * @category   external
 * @copyright  2015 Juan Leyva <juan@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @since      Moodle 3.0
 */

defined('MOODLE_INTERNAL') || die;

$functions = array(

    'mod_mdgen_view_page' => array(
        'classname'     => 'mod_mdgen_external',
        'methodname'    => 'view_mdgen',
        'description'   => 'Simulate the view.php web interface mdgen: trigger events, completion, etc...',
        'type'          => 'write',
        'capabilities'  => 'mod/mdgen:view',
        'services'      => array(MOODLE_OFFICIAL_MOBILE_SERVICE)
    ),

    'mod_mdgene_get_pages_by_courses' => array(
        'classname'     => 'mod_mdgen_external',
        'methodname'    => 'get_mdgens_by_courses',
        'description'   => 'Returns a list of mdgens in a provided list of courses, if no list is provided all mdgens that the user
                            can view will be returned.',
        'type'          => 'read',
        'capabilities'  => 'mod/mdgen:view',
        'services'      => array(MOODLE_OFFICIAL_MOBILE_SERVICE),
    ),
);
