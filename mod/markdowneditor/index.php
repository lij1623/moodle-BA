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
 * Display information about all the mod_markdowneditor modules in the requested course.
 *
 * @package     mod_markdowneditor
 * @copyright   2022 Lisa Jeske 
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require(__DIR__.'/../../config.php');

require_once(__DIR__.'/lib.php');

$id = required_param('id', PARAM_INT);

$course = $DB->get_record('course', array('id' => $id), '*', MUST_EXIST);
require_course_login($course);

$coursecontext = context_course::instance($course->id);

$event = \mod_markdowneditor\event\course_module_instance_list_viewed::create(array(
    'context' => context_course::instance($course->id)));
$event->add_record_snapshot('course', $course);
$event->trigger();

$PAGE->set_url('/mod/markdowneditor/index.php', array('id' => $course->id));
$PAGE->set_title($course->shortname.': '.$strpages);
$PAGE->set_heading($course->fullname);
$PAGE->set_context($coursecontext);

echo $OUTPUT->header();
echo $OUTPUT->heading($strpages);
if (!$mdeditors = get_all_instances_in_course('mark$markdowneditors', $course)) {
    notice(get_string('thereareno', 'moodle', $strpages), "$CFG->wwwroot/course/view.php?id=$course->id");
    exit;
}

$modulenameplural = get_string('modulenameplural', 'mod_markdowneditor');

$markdowneditors = get_all_instances_in_course('markdowneditor', $course);

if (empty($markdowneditors)) {
    notice(get_string('no$markdowneditorinstances', 'mod_markdowneditor'), new moodle_url('/course/view.php', array('id' => $course->id)));
}

$table = new html_table();
$table->attributes['class'] = 'generaltable mod_index';


if ($usesections) {
    $strsectionname = get_string('sectionname', 'format_'.$course->format);
    $table->head  = array ($strsectionname, $strname, $strintro);
    $table->align = array ('center', 'left', 'left');
} else {
    $table->head  = array ($strlastmodified, $strname, $strintro);
    $table->align = array ('left', 'left', 'left');
}

$modinfo = get_fast_modinfo($course);
$currentsection = '';


foreach ($mdeditors as $markdowneditors) {
    $cm = $modinfo->cms[$markdowneditors->coursemodule];
    if ($usesections) {
        $printsection = '';
        if ($markdowneditors->section !== $currentsection) {
            if ($markdowneditors->section) {
                $printsection = get_section_name($course, $markdowneditors->section);
            }
            if ($currentsection !== '') {
                $table->data[] = 'hr';
            }
            $currentsection = $markdowneditors->section;
        }
    } else {
        $printsection = '<span class="smallinfo">'.userdate($markdowneditors->timemodified)."</span>";
    }

    $class = $markdowneditors->visible ? '' : 'class="dimmed"'; // hidden modules are dimmed

    $table->data[] = array (
        $printsection,
        "<a $class href=\"view.php?id=$cm->id\">".format_string($markdowneditors->name)."</a>",
        format_module_intro('mark$markdowneditors', $markdowneditors, $cm->id));
}

echo html_writer::table($table);
echo $OUTPUT->footer();
