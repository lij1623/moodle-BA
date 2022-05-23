YUI.add('moodle-atto_mdh1-button', function (Y, NAME) {

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
     * @package    atto_mdh1
     * @copyright  2022 Astor Bizard, 2014 Rosiana Wijaya
     * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
     */
    
    /**
     * @module moodle-atto_mdh1-button
     */
    
    /**
     * Atto text editor mdh1 plugin.
     *
     * @namespace M.atto_mdh1
     * @class button
     * @extends M.editor_atto.EditorPlugin
     */
    
    Y.namespace('M.atto_mdh1').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    
        /**
         * A rangy object to alter CSS classes.
         *
         * @property _mdh1Applier
         * @type Object
         * @private
         */
        _mdh1Applier: null,
    
        initializer: function() {
            this.addButton({
                buttonName: 'mdh1',
                callback: this._togglemdh1,
                icon: 'icon',
                iconComponent: 'atto_mdh1',
                inlineFormat: true,
    
                // Watch the following tags and add/remove highlighting as appropriate:
                tags: 'h1'
            });
            this._mdh1Applier = window.rangy.createClassApplier("editor-mdh1");
        },
        /**
         * Toggle mdh1 in selection
         *
         * @method _togglemdh1
         */
        _togglemdh1: function() {
            // Replace all the code tags.
        this.get('host').changeToCSS('mdh1', 'editor-mdh1');

        // Toggle code.
        this._codeApplier.toggleSelection();

        // Replace CSS classes with tags.
        this.get('host').changeToTags('editor-mdh1', 'mdh1');
        }
        
        
    });

    function printhashtag(){
        document.getElementById('mdh1').innerHTML = "#";

    }

     
 
    }, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
    