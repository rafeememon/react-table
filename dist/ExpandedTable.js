"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var React = require("react");
var ReactDOM = require("react-dom");
var Table_1 = require("./Table");
var HEADER_REPOSITION_DELAY_MS = 50;
var ExpandedTable = /** @class */ (function (_super) {
    __extends(ExpandedTable, _super);
    function ExpandedTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            scrollTop: 0,
        };
        _this.renderNoRows = function () {
            return _this.props.rows.length === 0 ? _this.props.noRowsElement : null;
        };
        _this.handleScroll = function (event) {
            _this.handleScrollDebounced(event.currentTarget.scrollTop);
        };
        // tslint:disable-next-line:member-ordering
        _this.handleScrollDebounced = lodash_1.debounce(function (scrollTop) {
            _this.setState({ scrollTop: scrollTop });
        }, HEADER_REPOSITION_DELAY_MS);
        return _this;
    }
    ExpandedTable.ofType = function () {
        return ExpandedTable;
    };
    ExpandedTable.prototype.componentDidUpdate = function (_a, _b) {
        var scrollTop = _b.scrollTop;
        if (scrollTop !== this.state.scrollTop) {
            this.updateScroll();
        }
    };
    ExpandedTable.prototype.render = function () {
        return React.createElement("div", { className: 'expanded-table-container', onScroll: this.handleScroll },
            React.createElement(Table_1.Table, __assign({}, this.props)),
            this.renderNoRows());
    };
    ExpandedTable.prototype.updateScroll = function () {
        var thead = ReactDOM.findDOMNode(this).querySelector('thead');
        if (thead) {
            thead.style.transform = "translateY(" + this.state.scrollTop + "px)";
        }
    };
    return ExpandedTable;
}(React.Component));
exports.ExpandedTable = ExpandedTable;
