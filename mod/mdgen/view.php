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
 * Page module version information
 *
 * @package mod_mdgen
 * @copyright  2009 Petr Skoda (http://skodak.org)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require('../../config.php');
require_once($CFG->dirroot.'/mod/mdgen/lib.php');
require_once($CFG->dirroot.'/mod/mdgen/locallib.php');
require_once($CFG->libdir.'/completionlib.php');

$id      = optional_param('id', 0, PARAM_INT); // Course Module ID
$p       = optional_param('p', 0, PARAM_INT);  // Page instance ID
$inpopup = optional_param('inpopup', 0, PARAM_BOOL);

if ($p) {
    if (!$page = $DB->get_record('mdgen', array('id'=>$p))) {
        print_error('invalidaccessparameter');
    }
    $cm = get_coursemodule_from_instance('mdgen', $page->id, $page->course, false, MUST_EXIST);

} else {
    if (!$cm = get_coursemodule_from_id('mdgen', $id)) {
        print_error('invalidcoursemodule');
    }
    $page = $DB->get_record('mdgen', array('id'=>$cm->instance), '*', MUST_EXIST);
}

$course = $DB->get_record('course', array('id'=>$cm->course), '*', MUST_EXIST);

require_course_login($course, true, $cm);
$context = context_module::instance($cm->id);
//require_capability('mod/mdgen:view', $context);

// Completion and trigger events.
mdgen_view($page, $course, $cm, $context);

$PAGE->set_url('/mod/mdgen/view.php', array('id' => $cm->id));

$options = empty($page->displayoptions) ? [] : (array) unserialize_array($page->displayoptions);

$activityheader = ['hidecompletion' => false];
if (empty($options['printintro']) || !trim(strip_tags($page->intro))) {
    $activityheader['description'] = '';
}

if ($inpopup and $page->display == RESOURCELIB_DISPLAY_POPUP) {
    $PAGE->set_pagelayout('popup');
    $PAGE->set_title($course->shortname.': '.$page->name);
    $PAGE->set_heading($course->fullname);
} else {
    $PAGE->add_body_class('limitedwidth');
    $PAGE->set_title($course->shortname.': '.$page->name);
    $PAGE->set_heading($course->fullname);
    $PAGE->set_activity_record($page);
    if (!$PAGE->activityheader->is_title_allowed()) {
        $activityheader['title'] = "";
    }
}
$PAGE->activityheader->set_attrs($activityheader);
echo $OUTPUT->header();


$content = file_rewrite_pluginfile_urls($page->content, 'pluginfile.php', $context->id, 'mod_mdgen', 'content', $page->revision);

$filename       =  mod_mdgen_create_dynamic_filename_for_mdfile($page->name); 
$md_filename    =   $filename.'.md';    
$myfile = fopen("../../../generator/slides/".$md_filename, "a") or die("Unable to open file!");
$text = strip_tags($content);
fwrite($myfile, $text);
fclose($myfile);

// nodejs shell commands to be executed here (generator application) to create .html under __slides from the .md file under slides folder 

$if_filename  =   $filename.'IF.html'; 
$if_content       = "<iframe src='/generator/_slides/$if_filename' width='700px' height='500px'></iframe>";
$myfile = fopen("../../../generator/iframes/".$if_filename, "a") or die("Unable to open file!");
$text = $if_content;
fwrite($myfile, $text);
fclose($myfile);
//$content = $text;
$formatoptions = new stdClass;
$formatoptions->noclean = true;
$formatoptions->overflowdiv = true;
$formatoptions->context = $context;
$content = format_text($content, $page->contentformat, $formatoptions);
echo $OUTPUT->box($content, "generalbox center clearfix");





if (!isset($options['printlastmodified']) || !empty($options['printlastmodified'])) {
    $strlastmodified = get_string("lastmodified");
    echo html_writer::div("$strlastmodified: " . userdate($page->timemodified), 'modified');
}

echo $OUTPUT->footer();

