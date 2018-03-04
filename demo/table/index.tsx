import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '../../css/index.css';
import {TableDemo} from './TableDemo';

const fixture = document.createElement('div');
document.body.appendChild(fixture);

ReactDOM.render(<TableDemo />, fixture);
