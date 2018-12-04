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
Object.defineProperty(exports, "__esModule", { value: true });
var findIndex_1 = require("lodash-es/findIndex");
var sortBy_1 = require("lodash-es/sortBy");
var React = require("react");
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            sort: null,
            sortedRows: _this.props.rows,
            anchorKey: null,
        };
        _this.handleClickHeader = function (event) {
            var index = +event.currentTarget.getAttribute('data-column');
            var sort = _this.state.sort;
            var direction = sort && sort.index === index
                ? (sort.direction === 'ASC' ? 'DESC' : 'ASC')
                : 'ASC';
            _this.setState({ sort: { index: index, direction: direction } });
        };
        _this.handleClickRow = function (event) {
            var index = +event.currentTarget.getAttribute('data-row');
            var keyValue = _this.state.sortedRows[index][_this.props.keyField];
            if (event.getModifierState('Shift')) {
                _this.handleShiftClickRow(index, keyValue);
            }
            else if (event.getModifierState('Control')) {
                _this.handleControlClickRow(index, keyValue);
            }
            else {
                _this.handleNormalClickRow(index, keyValue);
            }
        };
        return _this;
    }
    Table.ofType = function () {
        return Table;
    };
    Table.prototype.componentDidUpdate = function (_a, _b) {
        var rows = _a.rows, selected = _a.selected;
        var sort = _b.sort, sortedRows = _b.sortedRows;
        if (rows !== this.props.rows || sort !== this.state.sort) {
            this.sortRows();
        }
    };
    Table.prototype.render = function () {
        return React.createElement("table", { className: this.props.className },
            React.createElement("thead", null,
                React.createElement("tr", null, this.renderHeaders())),
            React.createElement("tbody", null, this.renderRows()));
    };
    Table.prototype.renderHeaders = function () {
        var _this = this;
        return this.props.columns.map(function (column, columnIndex) {
            return React.createElement("th", { key: columnIndex, "data-key": column.key, "data-column": columnIndex, onClick: _this.handleClickHeader },
                column.label,
                _this.renderHeaderSortIndicator(columnIndex));
        });
    };
    Table.prototype.renderHeaderSortIndicator = function (columnIndex) {
        var sort = this.state.sort;
        var style = sort && sort.index === columnIndex ? {} : { visibility: 'hidden' };
        var icon = sort && sort.direction === 'ASC' ? ' ▲' : ' ▼';
        return React.createElement("span", { style: style }, icon);
    };
    Table.prototype.renderRows = function () {
        var _this = this;
        var _a = this.props, keyField = _a.keyField, selectedRowClassName = _a.selectedRowClassName, rowClassName = _a.rowClassName;
        return this.state.sortedRows.map(function (row, rowIndex) {
            var keyValue = row[keyField];
            var selected = _this.isSelected(keyValue);
            var selectedClassName = selected && selectedRowClassName || '';
            var customClassName = rowClassName ? rowClassName(keyValue) : '';
            return React.createElement("tr", { key: rowIndex, "data-row": rowIndex, "data-selected": selected, className: selectedClassName + " " + customClassName, onClick: _this.handleClickRow }, _this.renderColumns(row));
        });
    };
    Table.prototype.renderColumns = function (row) {
        var _this = this;
        return this.props.columns.map(function (column, columnIndex) {
            return React.createElement("td", { key: columnIndex, "data-key": column.key }, _this.renderCell(row, columnIndex));
        });
    };
    Table.prototype.renderCell = function (row, columnIndex) {
        var column = this.props.columns[columnIndex];
        if (column.renderData) {
            return column.renderData(row);
        }
        else {
            return this.getCellData(row, columnIndex);
        }
    };
    Table.prototype.sortRows = function () {
        this.setState({ sortedRows: this.getSortedRows() });
    };
    Table.prototype.getSortedRows = function () {
        var _this = this;
        var rows = this.props.rows;
        var sort = this.state.sort;
        if (sort) {
            var index_1 = sort.index, direction = sort.direction;
            var ascending = sortBy_1.default(rows, function (row) { return _this.getSortData(row, index_1); });
            return direction === 'DESC' ? ascending.reverse() : ascending;
        }
        else {
            return rows;
        }
    };
    Table.prototype.getSortData = function (row, columnIndex) {
        var column = this.props.columns[columnIndex];
        if (column.getSortValue) {
            return column.getSortValue(row);
        }
        else if (column.getData) {
            return column.getData(row);
        }
        else {
            return row[column.key];
        }
    };
    Table.prototype.getCellData = function (row, columnIndex) {
        var column = this.props.columns[columnIndex];
        if (column.getData) {
            return column.getData(row);
        }
        else {
            var data = row[column.key];
            return data != null ? String(data) : '';
        }
    };
    Table.prototype.handleShiftClickRow = function (index, keyValue) {
        var anchorKey = this.state.anchorKey;
        if (anchorKey != null) {
            var keyField_1 = this.props.keyField;
            var otherIndex = findIndex_1.default(this.state.sortedRows, function (r) { return r[keyField_1] === anchorKey; });
            if (otherIndex !== -1) {
                var newSelected = this.state.sortedRows
                    .slice(Math.min(index, otherIndex), Math.max(index, otherIndex) + 1)
                    .map(function (row) { return row[keyField_1]; });
                this.select(newSelected);
            }
            else {
                this.handleNormalClickRow(index, keyValue);
            }
        }
        else {
            this.handleNormalClickRow(index, keyValue);
        }
    };
    Table.prototype.handleControlClickRow = function (index, keyValue) {
        var selected = this.props.selected || [];
        this.setState({ anchorKey: keyValue });
        if (this.isSelected(keyValue)) {
            this.select(selected.filter(function (s) { return s !== keyValue; }));
        }
        else {
            this.select(selected.concat([keyValue]));
        }
    };
    Table.prototype.handleNormalClickRow = function (index, keyValue) {
        this.setState({ anchorKey: keyValue });
        this.select([keyValue]);
    };
    Table.prototype.isSelected = function (keyValue) {
        return this.props.selected && this.props.selected.some(function (s) { return s === keyValue; });
    };
    Table.prototype.select = function (keys) {
        if (this.props.onSelect) {
            this.props.onSelect(keys);
        }
    };
    return Table;
}(React.Component));
exports.Table = Table;
