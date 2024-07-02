// third-party
import { merge } from 'lodash';

// project import
import Button from './Button';
import InputLabel from './InputLabel';

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function ComponentsOverrides(theme) {
    return merge(Button(theme), InputLabel(theme));
}
