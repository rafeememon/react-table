import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '../../css/index.css';
import {ExpandedTableDemo} from './ExpandedTableDemo';

const fixture = document.createElement('div');
document.body.appendChild(fixture);

ReactDOM.render(<ExpandedTableDemo />, fixture);
