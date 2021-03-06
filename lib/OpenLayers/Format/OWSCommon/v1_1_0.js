/* Copyright (c) 2006-2009 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/OWSCommon/v1.js
 */

/**
 * Class: OpenLayers.Format.OWSCommon.v1_1_0
 * Parser for OWS Common version 1.1.0 which can be used by other parsers.
 * It is not intended to be used on its own.
 */
OpenLayers.Format.OWSCommon.v1_1_0 = OpenLayers.Class(OpenLayers.Format.OWSCommon.v1, {

    /**
     * Property: namespaces
     * {Object} Mapping of namespace aliases to namespace URIs.
     */
    namespaces: {
        ows: "http://www.opengis.net/ows/1.1",
        xlink: "http://www.w3.org/1999/xlink"
    },    
    
    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: {
        "ows": OpenLayers.Util.applyDefaults({
            "AllowedValues": function(node, parameter) {
                parameter.allowedValues = {};
                this.readChildNodes(node, parameter.allowedValues);
            },
            "AnyValue": function(node, parameter) {
                parameter.anyValue = true;
            },
            "Range": function(node, allowedValues) {
                allowedValues.range = {};
                this.readChildNodes(node, allowedValues.range);
            },
            "MinimumValue": function(node, range) {
                range.minValue = this.getChildValue(node);
            },
            "MaximumValue": function(node, range) {
                range.maxValue = this.getChildValue(node);
            },
            "Identifier": function(node, obj) {
            	obj.identifier = this.getChildValue(node);
            }
        }, OpenLayers.Format.OWSCommon.v1.prototype.readers["ows"])
    },
    
    CLASS_NAME: "OpenLayers.Format.OWSCommon.v1_1_0"

});
