"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var debounce_1 = require("lodash-es/debounce");
var React = require("react");
var ReactDOM = require("react-dom");
var Table_1 = require("./Table");
var HEADER_REPOSITION_DELAY_MS = 50;
var ExpandedTable = /** @class */ (function (_super) {
    __extends(ExpandedTable, _super);
    function ExpandedTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.theadElement = null;
        _this.handleScroll = function (event) {
            _this.hideTableHeader();
            _this.repositionTableHeader(event.currentTarget.scrollTop);
        };
        // tslint:disable-next-line:member-ordering
        _this.repositionTableHeader = debounce_1.default(function (scrollTop) {
            if (_this.theadElement) {
                _this.theadElement.style.transform = "translateY(" + scrollTop + "px)";
                _this.theadElement.style.visibility = 'visible';
            }
        }, HEADER_REPOSITION_DELAY_MS);
        return _this;
    }
    ExpandedTable.ofType = function () {
        return ExpandedTable;
    };
    ExpandedTable.prototype.componentDidMount = function () {
        this.theadElement = ReactDOM.findDOMNode(this).querySelector('thead');
        this.scrollSelectedIntoView();
    };
    ExpandedTable.prototype.render = function () {
        return React.createElement("div", { className: 'expanded-table-container', onScroll: this.handleScroll },
            React.createElement(Table_1.Table, __assign({}, this.props)),
            this.renderNoRows());
    };
    ExpandedTable.prototype.renderNoRows = function () {
        return this.props.rows.length === 0 ? this.props.noRowsElement : null;
    };
    ExpandedTable.prototype.hideTableHeader = function () {
        if (this.theadElement) {
            this.theadElement.style.visibility = 'hidden';
        }
    };
    ExpandedTable.prototype.scrollSelectedIntoView = function () {
        var rowElement = ReactDOM.findDOMNode(this).querySelector('tr[data-selected=true]');
        if (rowElement) {
            rowElement.scrollIntoView({
                block: 'center',
                inline: 'start',
            });
        }
    };
    return ExpandedTable;
}(React.Component));
exports.ExpandedTable = ExpandedTable;
