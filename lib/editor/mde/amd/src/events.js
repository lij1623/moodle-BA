// This file is part of Moodle - http://moodle.org/ //
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
 * Javascript events for the `editor_mde` plugin.
 *
 * @module     editor_mde/events
 * @copyright  2021 Jun Pataleta <jun@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @since      3.10.5
 */

import {dispatchEvent} from 'core/event_dispatcher';

/**
 * Events for the `editor_mde` plugin.
 *
 * @constant
 * @property {String} mdeButtonHighlightToggled See {@link event:mdeButtonHighlightToggled}
 */
export const eventTypes = {
    /**
     * An event triggered when a toolbar button's highlight gets toggled.
     *
     * @event mdeButtonHighlightToggled
     * @type {CustomEvent}
     * @property {HTMLElement} target The button which had its highlight toggled.
     * @property {object} detail
     * @property {String} detail.buttonName The name of the mde button that has had its highlight toggled.
     * @property {Boolean} detail.highlight True when the button was highlighted. False, otherwise.
     */
    mdeButtonHighlightToggled: 'editor_mde/mdeButtonHighlightToggled',
};

/**
 * Trigger an event to indicate that a button's highlight was toggled.
 *
 * @method  notifyButtonHighlightToggled
 * @returns {CustomEvent}
 * @fires   mdeButtonHighlightToggled
 * @param {HTMLElement} mdeButton The button object.
 * @param {String} buttonName The button name.
 * @param {Boolean} highlight True when the button was highlighted. False, otherwise.
 */
export const notifyButtonHighlightToggled = (mdeButton, buttonName, highlight) => {
    return dispatchEvent(
        eventTypes.mdeButtonHighlightToggled,
        {
            buttonName,
            highlight,
        },
        mdeButton
    );
};
