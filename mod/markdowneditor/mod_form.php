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
 * The main mod_markdowneditor configuration form.
 *
 * @package     mod_markdowneditor
 * @copyright   2022 Lisa Jeske 
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot.'/course/moodleform_mod.php');

/**
 * Module instance settings form.
 *
 * @package     mod_markdowneditor
 * @copyright   2022 Lisa Jeske 
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class mod_markdowneditor_mod_form extends moodleform_mod {

    public function definition() {
        global $CFG, $DB;
        $mform = $this->_form;
        $config = get_config('markdowneditor');
        
        // GENERAL
        $mform->addElement('header', 'general', get_string('general', 'form'));
        $mform->addElement('text', 'name', 'Name' , array('size' => '64'));
        if (!empty($CFG->formatstringstriptags)) {
            $mform->setType('name', PARAM_TEXT);
        } else {
            $mform->setType('name', PARAM_CLEANHTML);
        }
        $mform->addRule('name', null, 'required', null, 'client');
        $mform->addRule('name', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');
        $this->standard_intro_elements();

        // CONTENT 
        $mform->addElement('header', 'contentsection', 'Inhalt im Markdownformat');
        //$mform->addElement('editor', 'markdowneditor', get_string('content', 'markdowneditor'), null, markdowneditor_get_editor_options($this->context));
        $mform->addElement('editor', 'markdowneditor', 'Seiteninhalt');
        $mform->addRule('markdowneditor', get_string('required'), 'required', null, 'client');

        $mform->addElement('header', 'appearancehdr', get_string('appearance'));

        //new
        
        //new
        // buttons
        $buttonarrayheadingsheadings = array();
        $buttonarrayheadings[] = &$mform->createElement('button', 'heading1', 'H1');
        $buttonarrayheadings[] = &$mform->createElement('button', 'heading2', 'H2');
        $buttonarrayheadings[] = &$mform->createElement('button', 'heading3', 'H3');
        $buttonarrayheadings[] = &$mform->createElement('button', 'heading4', 'H4');
        $buttonarrayheadings[] = &$mform->createElement('button', 'heading5', 'H5');
        $buttonarrayheadings[] = &$mform->createElement('button', 'heading6', 'H6');
        $mform->addGroup($buttonarrayheadings);
        $buttonarrayfont = array();
        $buttonarrayfont[] = &$mform->createElement('button', 'bold', 'Bold');
        $buttonarrayfont[] = &$mform->createElement('button', 'italic', 'Italic');
        $buttonarrayfont[] = &$mform->createElement('button', 'underlined', 'Underlined');
        $mform->addGroup($buttonarrayfont);
        $buttonarraylist = array();
        $buttonarraylist[] = &$mform->createElement('button', 'ol', 'Ordered List');
        $buttonarraylist[] = &$mform->createElement('button', 'ul', 'Unordered List');
        $mform->addGroup($buttonarraylist);

        
        

        //get_string('name', 'mod_markdowneditor'
        // if (!empty($CFG->formatstringstriptags)) {
        //     $mform->setType('name', PARAM_TEXT);
        // } else {
        //     $mform->setType('name', PARAM_CLEANHTML);
        // }
        // $mform->addRule('name', null, 'required', null, 'client');
        // $mform->addRule('name', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');
       
        $this->standard_coursemodule_elements();

        $this->add_action_buttons();
        $mdbuttonarray = array();
        $mdbuttonarray[] = &$mform->createElement('submit', 'submitmarkdown', 'Im Markdown-Format abspeichern und zum Kurs');
        $mform->addGroup($mdbuttonarray);
        }
}

