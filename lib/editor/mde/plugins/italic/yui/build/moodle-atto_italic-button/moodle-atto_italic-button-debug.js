YUI.add('moodle-mde_italic-button', function (Y, NAME) {

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

/*
 * @package    mde_italic
 * @copyright  2013 Damyon Wiese  <damyon@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module     moodle-mde_italic-button
 */

/**
 * mde text editor italic plugin.
 *
 * @namespace M.mde_italic
 * @class button
 * @extends M.editor_mde.EditorPlugin
 */

Y.namespace('M.mde_italic').Button = Y.Base.create('button', Y.M.editor_mde.EditorPlugin, [], {
    initializer: function() {
        var italic;

        this.addButton({
            callback: this._toggleItalic,
            icon: 'e/italic',
            buttonName: italic,
            inlineFormat: true,

            // Key code for the keyboard shortcut which triggers this button:
            keys: '73',

            // Watch the following tags and add/remove highlighting as appropriate:
            tags: 'em, i'
        });
    },
    /**
     * Toggle the italic setting.
     *
     * @method _toggleItalic
     * @param {EventFacade} e
     */
    _toggleItalic: function() {
        var host = this.get('host');

        // Use the "italic" command for simplicity. This will toggle <em> tags off as well.
        document.execCommand('italic', false, null);

        // Then change all <i> tags to <em> tags. This will change any existing <i> tags as well.
        host.changeToCSS('i', 'bf-editor-italic-emphasis');
        host.changeToTags('bf-editor-italic-emphasis', 'em');
    }
});


}, '@VERSION@', {"requires": ["moodle-editor_mde-plugin"]});
