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
 * The Atto plugin mdh1 is defined here.
 *
 * @package     atto_mdh1
 * @copyright   2022 Your Name <you@example.com>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Atto mdh1 plugin.
 *
 * @namespace M.atto_mdh1.
 * @class button.
 * @extends M.editor_atto.EditorPlugin.
 */

 Y.namespace('M.atto_mdh1').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    initializer: function() {
        this.addButton({
            buttonName: 'mdh1',
            callback: this._togglemdh1,
            icon: 'icon',
            iconComponent: 'atto_code',
            inlineFormat: true,
            tags: 'mdh1'
            // Add properties here as necessary.
        });
        this._codeApplier = window.rangy.createClassApplier("editor-mdh1");
    },
    _toggleCode: function() {
        this.get('host').changeToCSS('mdh1', 'editor-mdh1');

        // Toggle code.
        this._codeApplier.toggleSelection();

        // Replace CSS classes with tags.
        this.get('host').changeToTags('editor-mdh1', 'mdh1');
    }
});
